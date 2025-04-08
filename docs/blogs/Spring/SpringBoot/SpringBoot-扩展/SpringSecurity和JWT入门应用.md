---
date: 2025-04-07 10:07:46
pageClass: blue-archive
tags:
  - SpringSecurity
categories:
  - SpringBoot
---

# SpringSecurity和JWT入门应用

## 1 初始化SpringBoot应用
基于 start.spring.io 创建，选择2.7的 Spring Boot 版本。
项目结构
```sh
|   pom.xml
|   
\---src
    +---main
    |   +---java
    |   |   \---cc
    |   |       \---yiueil
    |   |           |   JwtApplication.java
    |   |           |
    |   |           +---config
    |   |           |       JacksonConfig.java
    |   |           |       SecurityConfig.java
    |   |           |
    |   |           +---controller
    |   |           |       HelloController.java
    |   |           |
    |   |           +---entity
    |   |           |       UserEntity.java
    |   |           |       
    |   |           +---filter
    |   |           |       JwtFilter.java
    |   |           |
    |   |           +---handler
    |   |           |       ApplicationAccessDeniedHandler.java
    |   |           |       ApplicationLoginFailHandler.java
    |   |           |       ApplicationLoginSuccessHandler.java
    |   |           |       ApplicationLogoutSuccessHandler.java
    |   |           |
    |   |           +---json
    |   |           |       GrantedAuthorityDeserializer.java
    |   |           |
    |   |           +---service
    |   |           |   |   UserService.java
    |   |           |   |
    |   |           |   \---impl
    |   |           |           UserServiceImpl.java
    |   |           |
    |   |           +---utils
    |   |           |       JwtUtils.java
    |   |           |
    |   |           \---vo
    |   |                   ResultVo.java
    |   |
    |   \---resources
    |           application.yml
    |
    \---test
        \---java
            \---cc
                \---yiueil
                        JwtApplicationTest.java
```

JwtApplication
```java
@SpringBootApplication  
public class JwtApplication {  
    public static void main(String[] args) {  
        SpringApplication.run(JwtApplication.class, args);  
    }  
}
```

application.yml
```yml
server:
  port: 8080
```

pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.18</version>
    </parent>

    <groupId>yiueil.cc</groupId>
    <artifactId>08-jwt</artifactId>
    <version>1.0-SNAPSHOT</version>
    <description>spring security 前后端分离使用 jwt, 以及授权, 集大成之作。</description>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.auth0</groupId>
            <artifactId>java-jwt</artifactId>
            <version>4.4.0</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>
</project>
```

UserEntity
```java
@Data
public class UserEntity implements UserDetails, Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String username;

    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    @Override
    @JsonDeserialize(contentUsing = GrantedAuthorityDeserializer.class)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}

```

JacksonConfig
```java
@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        // 忽略不能序列化的属性
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        return objectMapper;
    }
}
```

HelloController
```java
@RestController
public class HelloController {
    private static final int WIDTH = 120;
    private static final int HEIGHT = 40;
    private static final String CHAR_SET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    private static final Random RANDOM = new Random();

    @GetMapping("/")
    public ResponseEntity<String> setHello() {
        return ResponseEntity.ok("hello world");
    }

    @GetMapping("/userInfo")
    public ResponseEntity<Authentication> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok().body(authentication);
    }

    @GetMapping("/captcha")
    public ResponseEntity<byte[]> getCaptcha(HttpSession httpSession) throws IOException {
        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            String code = generateRandomCode();
            // 这里保存验证码到session
            httpSession.setAttribute("code", code);
            BufferedImage image = createImage(code);
            ImageIO.write(image, "png", bos);
            byte[] imageBytes = bos.toByteArray();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageBytes);
        }
    }

    @PreAuthorize(value = "hasAuthority('select')")
    @GetMapping("/select")
    public ResponseEntity<String> select() {
        return ResponseEntity.ok("select");
    }

    @PreAuthorize(value = "hasAuthority('insert')")
    @GetMapping("/insert")
    public ResponseEntity<String> insert() {
        return ResponseEntity.ok("insert");
    }

    @PreAuthorize(value = "hasAuthority('delete')")
    @GetMapping("/delete")
    public ResponseEntity<String> delete() {
        return ResponseEntity.ok("delete");
    }

    @PreAuthorize(value = "hasAuthority('update')")
    @GetMapping("/update")
    public ResponseEntity<String> update() {
        return ResponseEntity.ok("update");
    }

    private String generateRandomCode() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            sb.append(CHAR_SET.charAt(RANDOM.nextInt(CHAR_SET.length())));
        }
        return sb.toString();
    }

    private BufferedImage createImage(String code) {
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();

        // 设置背景颜色
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, WIDTH, HEIGHT);

        // 设置字体
        g.setFont(new Font("Arial", Font.BOLD, 24));

        // 随机颜色绘制每个字符
        for (int i = 0; i < code.length(); i++) {
            g.setColor(new Color(RANDOM.nextInt(150), RANDOM.nextInt(150), RANDOM.nextInt(150)));
            int x = 20 * i + 10 + RANDOM.nextInt(8);
            int y = 20 + RANDOM.nextInt(10);
            g.drawString(String.valueOf(code.charAt(i)), x, y);
        }

        // 添加干扰线
        for (int i = 0; i < 5; i++) {
            g.setColor(new Color(RANDOM.nextInt(200), RANDOM.nextInt(200), RANDOM.nextInt(200)));
            g.drawLine(RANDOM.nextInt(WIDTH), RANDOM.nextInt(HEIGHT), RANDOM.nextInt(WIDTH), RANDOM.nextInt(HEIGHT));
        }

        g.dispose();
        return image;
    }
}
```

## 2 安全配置类

### 1 添加密码加密器PasswordEncoder

```java
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
```

### 2 配置 SecurityFilterChain Bean
1. 关闭跨站请求防御
2. 设置允许的跨站访问域名、方法、请求头、请求地址
3. 使用无状态的Session，减少资源开销
4. 设置登录地址和登出地址，以及对应的Handler
5. 添加异常处理器Handler
6. 添加JwtFilter，进行请求的认证校验
7. 注解@EnableMethodSecurity开启方法级别的安全控制
```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    ApplicationLoginSuccessHandler applicationLoginSuccessHandler;

    @Autowired
    ApplicationLoginFailHandler applicationLoginFailHandler;

    @Autowired
    ApplicationLogoutSuccessHandler applicationLogoutSuccessHandler;

    @Autowired
    ApplicationAccessDeniedHandler applicationAccessDeniedHandler;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("*"));
        corsConfiguration.setAllowedOrigins(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                // 跨站请求伪造防御关闭
                .csrf(AbstractHttpConfigurer::disable)
                // cors配置允许跨域
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // 使用无状态的Session
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 配置登录地址, 成功以及失败的Handler
                .formLogin(formLogin -> formLogin
                        .loginProcessingUrl("/login")
                        .successHandler(applicationLoginSuccessHandler)
                        .failureHandler(applicationLoginFailHandler))
                // 配置登出地址, 以及登出成功的Handler
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler(applicationLogoutSuccessHandler))
                // 配置授权异常处理Handler
                .exceptionHandling(exceptionHandlingConfigurer -> exceptionHandlingConfigurer
                        .accessDeniedHandler(applicationAccessDeniedHandler))
                .build();
    }
}

```

## 3 自定义Handler和Filter
需要使用到的Handler：
- ApplicationLoginSuccessHandler：登录成功的处理器
```java
@Component
public class ApplicationLoginSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        // 签发JWT
        HashMap<String, Object> claims = new HashMap<>();
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(authentication.getName());
        userEntity.setAuthorities(authentication.getAuthorities());
        claims.put("user", objectMapper.writeValueAsString(userEntity));
        String jwt = JwtUtils.generateToken(Collections.emptyMap(), claims);
        response.getWriter().write(objectMapper.writeValueAsString(ResultVo.success(jwt)));
    }
}

```
- ApplicationLoginFailHandler：登录失败的处理器
```java
@Component
public class ApplicationLoginFailHandler implements AuthenticationFailureHandler {
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(ResultVo.error(403, exception.getMessage())));
    }
}
```
- ApplicationLogoutSuccessHandler：登出成功的处理器
```java
@Component
public class ApplicationLogoutSuccessHandler implements LogoutSuccessHandler {
    @Autowired
    ObjectMapper objectMapper;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(ResultVo.success(authentication)));
    }
}
```
- ApplicationAccessDeniedHandler：权限不足的处理器
```java
@Component
public class ApplicationAccessDeniedHandler implements AccessDeniedHandler {
    @Autowired
    ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().write(objectMapper.writeValueAsString(ResultVo.error(403, accessDeniedException.getMessage())));
    }
}
```
需要使用到的Filter：
- JwtFilter：对请求进行Jwt的校验，拦截未授权请求。对于已经登录的请求，注入Authority信息。
```java
@Component  
public class JwtFilter extends OncePerRequestFilter {  
    @Autowired  
    ObjectMapper objectMapper;  
  
    @Override  
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {  
        response.setCharacterEncoding("UTF-8");  
        String requestURI = request.getRequestURI();  
        // 非登录接口, 验证是否携带JWT  
        if (requestURI.contains("/login")) {  
            filterChain.doFilter(request, response);  
            return;  
        }  
        String jwtToken = request.getHeader("jwt-token");  
        if (!StringUtils.hasText(jwtToken)) {  
            response.getWriter().write(objectMapper.writeValueAsString(ResultVo.error(403, "未登录！")));  
            return;  
        }  
        if (JwtUtils.validateToken(jwtToken)) {  
            DecodedJWT decodedJWT = JwtUtils.decodedJWT(jwtToken);  
            String userEntityString = decodedJWT.getClaim("user").asString();  
            UserEntity userEntity = objectMapper.readValue(userEntityString, UserEntity.class);  
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(userEntity, null, userEntity.getAuthorities()));  
            doFilter(request, response, filterChain);  
            return;  
        }  
        response.getWriter().write(objectMapper.writeValueAsString(ResultVo.error(403, "未授权或授权到期！")));  
    }  
}
```
## 4 应用测试
使用Postman导入几个接口进行测试
```json
{
	"info": {
		"_postman_id": "51b77b17-bcb6-4799-9949-9b07193b0126",
		"name": "springsecurity",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "25903911"
	},
	"item": [
		{
			"name": "login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "username",
							"value": "admin",
							"type": "text"
						},
						{
							"key": "password",
							"value": "admin",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "localhost:8080/login",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "userInfo",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "jwt-token",
						"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcImluc2VydFwifSx7XCJhdXRob3JpdHlcIjpcInNlbGVjdFwifSx7XCJhdXRob3JpdHlcIjpcInVwZGF0ZVwifV0iLCJ1c2VybmFtZSI6ImFkbWluIn0.TPjmvwnpSJJdMG0ZHiVKq_CXWKpXzUuloXdXEO3QLnQ",
						"type": "text"
					}
				],
				"url": {
					"raw": "localhost:8080/userInfo",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"userInfo"
					]
				}
			},
			"response": []
		},
		{
			"name": "selet",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "jwt-token",
						"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcImluc2VydFwifSx7XCJhdXRob3JpdHlcIjpcInNlbGVjdFwifSx7XCJhdXRob3JpdHlcIjpcInVwZGF0ZVwifV0iLCJ1c2VybmFtZSI6ImFkbWluIn0.TPjmvwnpSJJdMG0ZHiVKq_CXWKpXzUuloXdXEO3QLnQ",
						"type": "text"
					}
				],
				"url": {
					"raw": "localhost:8080/select",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"select"
					]
				}
			},
			"response": []
		},
		{
			"name": "delete",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "jwt-token",
						"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcImluc2VydFwifSx7XCJhdXRob3JpdHlcIjpcInNlbGVjdFwifSx7XCJhdXRob3JpdHlcIjpcInVwZGF0ZVwifV0iLCJ1c2VybmFtZSI6ImFkbWluIn0.TPjmvwnpSJJdMG0ZHiVKq_CXWKpXzUuloXdXEO3QLnQ",
						"type": "text"
					}
				],
				"url": {
					"raw": "localhost:8080/delete",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"delete"
					]
				}
			},
			"response": []
		}
	]
}
```