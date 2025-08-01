---
date: 2025-04-26 22:51:08
pageClass: blue-archive
tags:
  - 学习记录
  - SpringSecurity
categories:
  - SpringBoot
---

# SpringSecurity学习记录

## 1 入门程序

## 2 SpringSecurityFilterChain过滤链
>Security的过滤器链，是一组Filter组成，在不同版本中有15或16个过滤器，开发者可以自定义过滤器和禁用过滤器。
>1、过滤器随着容器启动创建。
>2、过滤器的执行有先后顺序。
### 2.1 查看所有的过滤链
通过配置`security`日志等级`logging.level.org.springframework.security: trace `即可在项目启动的日志中找到启用的Filter。代码位置位于`SecurityFilterChain`类的默认实现中。
```sh
DisableEncodeUrlFilter,
WebAsyncManagerIntegrationFilter,
SecurityContextHolderFilter,
HeaderWriterFilter,
CsrfFilter,
LogoutFilter,
UsernamePasswordAuthenticationFilter,
DefaultResourcesFilter,
DefaultLoginPageGeneratingFilter,
DefaultLogoutPageGeneratingFilter,
BasicAuthenticationFilter,
RequestCacheAwareFilter,
SecurityContextHolderAwareRequestFilter,
AnonymousAuthenticationFilter,
ExceptionTranslationFilter,
AuthorizationFilter
```
![image.png](https://s2.loli.net/2025/04/28/uOEZnlxkHwm2Q8v.png)

#### 过滤器解读
>以下过滤器将按照顺序执行，带有\*的过滤器为重要内容，进行源码解读。
##### DisableEncodeUrlFilter
禁用URL编码来防止URL编码的一些问题。
##### WebAsyncManagerIntegrationFilter
该过滤器的主要目的是在异步请求中集成 Spring Security 的安全上下文和 Web 异步管理器。
##### SecurityContextHolderFilter*
该过滤器的主要作用是读取安全上下文，供后续过滤器从SecurityContextHolder中获取。
```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		// 判断是否已经执行过该过滤器，执行过则直接放行
		if (request.getAttribute(FILTER_APPLIED) != null) {
			chain.doFilter(request, response);
			return;
		}
		request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
		// 获取上下文，如果读取到已存在的安全上下文，则设置到上下文信息中。后续过滤器可以访问。
		Supplier<SecurityContext> deferredContext = this.securityContextRepository.loadDeferredContext(request);
		try {
			this.securityContextHolderStrategy.setDeferredContext(deferredContext);
			chain.doFilter(request, response);
		}
		finally {
			// 无论是否抛出异常，最后都会清除整个的安全上下文，并且重置过滤器状态
			this.securityContextHolderStrategy.clearContext();
			request.removeAttribute(FILTER_APPLIED);
		}
	}
```
##### HeaderWriterFilter
该过滤器的主要目的是向HTTP响应添加特定的安全性头信息，帮助浏览器增强对网络攻击的防御能力。
##### CsrfFilter
该过滤器的作用是方式csrf攻击。
>前后端的分离时，禁用此过滤器以便于测试。
##### LogoutFilter*
该过滤器判断当前地址是否是登出地址，是登出地址则获取到授权上下文，调用一系列的LogoutHandler来进行授权的清除，最后重定向到登出后的重定向地址。
```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// 判断是否是需要登出的地址
		if (requiresLogout(request, response)) {
			Authentication auth = this.securityContextHolderStrategy.getContext().getAuthentication();
			if (this.logger.isDebugEnabled()) {
				this.logger.debug(LogMessage.format("Logging out [%s]", auth));
			}
			// 这里的Handler是一个聚合的Handler，实际上调用了一系列的handler来进行登出的操作
			this.handler.logout(request, response, auth);
			// 重定向到登出地址
			this.logoutSuccessHandler.onLogoutSuccess(request, response, auth);
			return;
		}
		chain.doFilter(request, response);
	}
```
##### UsernamePasswordAuthenticationFilter*
该过滤器判断当前接口是否是认证地址，是则使用`request`参数中的账号和密码调用`AuthenticationManager`进行校验。

AbstractAuthenticationProcessingFilter
```java
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// 这里校验当前请求是否是认证请求, 默认是/login
		if (!requiresAuthentication(request, response)) {
			chain.doFilter(request, response);
			return;
		}
		try {
			// attemptAuthentication由UsernamePasswordAuthenticationFilter实现
			Authentication authenticationResult = attemptAuthentication(request, response);
			if (authenticationResult == null) {
				// return immediately as subclass has indicated that it hasn't completed
				return;
			}
			this.sessionStrategy.onAuthentication(authenticationResult, request, response);
			// Authentication success
			if (this.continueChainBeforeSuccessfulAuthentication) {
				chain.doFilter(request, response);
			}
			successfulAuthentication(request, response, chain, authenticationResult);
		}
		catch (InternalAuthenticationServiceException failed) {
			this.logger.error("An internal error occurred while trying to authenticate the user.", failed);
			unsuccessfulAuthentication(request, response, failed);
		}
		catch (AuthenticationException ex) {
			// Authentication failed
			unsuccessfulAuthentication(request, response, ex);
		}
	}
```

UsernamePasswordAuthenticationFilter
```java
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		if (this.postOnly && !request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
		}
		String username = obtainUsername(request);
		username = (username != null) ? username.trim() : "";
		String password = obtainPassword(request);
		password = (password != null) ? password : "";
		UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username,
				password);
		setDetails(request, authRequest);
		return this.getAuthenticationManager().authenticate(authRequest);
	}
```
##### DefaultResourcesFilter
这个过滤器实现springsecurity放行自己的一个默认样式，感觉不是很重要的一个过滤器。
![image.png](https://s2.loli.net/2025/04/28/5enmcMLKoaz3XlY.png)

##### DefaultLoginPageGeneratingFilter
该过滤器生成默认的登录页，并且会处理登录成功后的重定向逻辑。
##### DefaultLogoutPageGeneratingFilter
该过滤器生成默认的登出页，并且会处理登出后的重定向逻辑。
##### BasicAuthenticationFilter*
该过滤器获取请求的用户授权信息。如从请求头，从请求体，从OIDC，OneTimeToken内获取等多种方式，似乎默认是BasicAuthenticationFilter实现，一个示例的请求头是：`Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`
```java
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		try {
			// 获取请求的用户授权信息
			Authentication authRequest = this.authenticationConverter.convert(request);
			if (authRequest == null) {
				this.logger.trace("Did not process authentication request since failed to find "
						+ "username and password in Basic Authorization header");
				chain.doFilter(request, response);
				return;
			}
			String username = authRequest.getName();
			this.logger.trace(LogMessage.format("Found username '%s' in Basic Authorization header", username));
			if (authenticationIsRequired(username)) {
				Authentication authResult = this.authenticationManager.authenticate(authRequest);
				SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
				context.setAuthentication(authResult);
				// 将认证信息放入到了Holder中
				this.securityContextHolderStrategy.setContext(context);
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
				}
				this.rememberMeServices.loginSuccess(request, response, authResult);
				this.securityContextRepository.saveContext(context, request, response);
				onSuccessfulAuthentication(request, response, authResult);
			}
		}
		catch (AuthenticationException ex) {
			this.securityContextHolderStrategy.clearContext();
			this.logger.debug("Failed to process authentication request", ex);
			this.rememberMeServices.loginFail(request, response);
			onUnsuccessfulAuthentication(request, response, ex);
			if (this.ignoreFailure) {
				chain.doFilter(request, response);
			}
			else {
				this.authenticationEntryPoint.commence(request, response, ex);
			}
			return;
		}

		chain.doFilter(request, response);
	}
```
##### RequestCacheAwareFilter
该过滤器实现了某种请求缓存。
##### SecurityContextHolderAwareRequestFilter*
该过滤器的作用存疑，不过应该是重要的。感觉是实现了上下文策略注入。
##### AnonymousAuthenticationFilter
该过滤器的作用是获取上下文信息，如果不存在则注入一个匿名的上下文信息。
##### ExceptionTranslationFilter
该过滤器的对请求过程中可能发生的认证一场和鉴权异常进行捕获分析，将错误信息和重定向地址添加到`request`和`response`中。
##### AuthorizationFilter*
授权过滤器，使用`authorizationManager`进行授权。这个授权似乎是基于切面实现的。
```java
	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws ServletException, IOException {

		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

		if (this.observeOncePerRequest && isApplied(request)) {
			chain.doFilter(request, response);
			return;
		}

		if (skipDispatch(request)) {
			chain.doFilter(request, response);
			return;
		}

		String alreadyFilteredAttributeName = getAlreadyFilteredAttributeName();
		request.setAttribute(alreadyFilteredAttributeName, Boolean.TRUE);
		try {
			AuthorizationResult result = this.authorizationManager.authorize(this::getAuthentication, request);
			this.eventPublisher.publishAuthorizationEvent(this::getAuthentication, request, result);
			// 判断最终授权情况, 没有授权抛出一个授权异常, 然后中断请求。
			if (result != null && !result.isGranted()) {
				throw new AuthorizationDeniedException("Access Denied", result);
			}
			chain.doFilter(request, response);
		}
		finally {
			request.removeAttribute(alreadyFilteredAttributeName);
		}
	}
```

### 2.2 禁用过滤器
>禁用 csrf 过滤器

通过`HttpSecurity`的对应方法获取到对应过滤器的`disable`方法进行禁用。
```java
@Configuration
public class SpringSecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests((requests) ->
                        requests.anyRequest().authenticated()
                )
                // 进行disable方法的调用
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(withDefaults())
                .httpBasic(withDefaults()).build();
    }
}
```
### 2.3 添加过滤器
```java
@Configuration
public class SpringSecurityConfig {
    @Autowired
    GuestFilter guestFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // 禁用默认的匿名账号
                .anonymous(AbstractHttpConfigurer::disable)
                // 手动添加一个游客filter到最后认证之前
                .addFilterBefore(guestFilter, AuthorizationFilter.class)
                .authorizeHttpRequests((requests) ->
                        requests.anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(withDefaults())
                .httpBasic(withDefaults()).build();
    }
}
```

## 3 用户认证流程
### 3.1 默认的用户认证流程
- UsernamePasswordAuthenticationFilter 调用 AuthenticationManager 的 authenticate()。
- AuthenticationManager 找到对应的AuthenticationProvider，对应的 AuthenticationProvider 调用handler()。
- 默认的 AbstractUserDetailsAuthenticationProvider 使用 **UserDetailsService** 的 **loadUserByUsername()** 进行用户查询。
![image.png](https://s2.loli.net/2025/04/28/Cb4UxqGr9L5wyOo.png)
- 默认的用户从 InMemoryUserDetailsManager（基于内存的用户管理）实现。
![image.png](https://s2.loli.net/2025/04/28/WhlCxjJV6NouYPB.png)
- 获取到用户最终完成认证后，加入凭证到 SpringSecurityHolder 中
![image.png](https://s2.loli.net/2025/04/28/3farWxIoEmU29z1.png)
### 3.2 自定义用户认证流程
经过对于默认的认证流程，查看`SpringSecurity`中的`UserDetailsServiceAutoConfiguration`类，配置类中部分关键代码：
```java
@AutoConfiguration
@ConditionalOnClass(AuthenticationManager.class)
@Conditional(MissingAlternativeOrUserPropertiesConfigured.class)
@ConditionalOnBean(ObjectPostProcessor.class)
@ConditionalOnMissingBean(value = { AuthenticationManager.class, AuthenticationProvider.class, UserDetailsService.class,
		AuthenticationManagerResolver.class }, type = "org.springframework.security.oauth2.jwt.JwtDecoder")
@ConditionalOnWebApplication(type = Type.SERVLET)
public class UserDetailsServiceAutoConfiguration {

	private static final String NOOP_PASSWORD_PREFIX = "{noop}";

	private static final Pattern PASSWORD_ALGORITHM_PATTERN = Pattern.compile("^\\{.+}.*$");

	private static final Log logger = LogFactory.getLog(UserDetailsServiceAutoConfiguration.class);

	@Bean
	public InMemoryUserDetailsManager inMemoryUserDetailsManager(SecurityProperties properties,
			ObjectProvider<PasswordEncoder> passwordEncoder) {
		SecurityProperties.User user = properties.getUser();
		List<String> roles = user.getRoles();
		return new InMemoryUserDetailsManager(User.withUsername(user.getName())
			.password(getOrDeducePassword(user, passwordEncoder.getIfAvailable()))
			.roles(StringUtils.toStringArray(roles))
			.build());
	}
}
```
从这个类中可以看出，我们可以通过在容器中自定义这四种类来实现自定义用户认证流程
- AuthenticationManager
- AuthenticationProvider
- UserDetailsService
- AuthenticationManagerResolver
#### 3.2.1 自定义UserDetailsService实现
- 在容器中添加 UserDetailsService 的具体实现即可。
- 此种方式修改设计的内容较少，只需要专注用户的查询逻辑即可，实现简单。
```java
@Service
public class UserService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("YIueil".equals(username)) {
            return User.builder()
                    .username("YIueil")
                    .password("{noop}123456")
                    .roles("USER")
                    .build();
        }
        throw new UsernameNotFoundException(String.format("%s: not found", username));
    }
}
```
#### 3.2.2 自定义AuthenticationProvider
项目结构：
```sh
+---src
|   \---main
|       +---java
|       |   \---cc
|       |       \---yiueil
|       |           |   AuthenticationProviderApplication.java
|       |           |
|       |           +---authenticationprovider
|       |           |       CustomAuthenticationProvider.java
|       |           |
|       |           +---controller
|       |           |       LoggedController.java
|       |           |
|       |           +---entity
|       |           |       UserEntity.java
|       |           |
|       |           \---service
|       |                   UserService.java
|       |
|       \---resources
|               application.yml
```

CustomAuthenticationProvider
```java
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    UserService userService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        UserEntity userEntity = userService.getUserByUsernameAndPassword(username, password);
        // 这里偷懒使用的明文Encoder进行匹配
        if (NoOpPasswordEncoder.getInstance().matches(password, userEntity.getPassword())) {
            return new UsernamePasswordAuthenticationToken(
                    username,
                    password,
                    Collections.emptyList()
            );
        } else {
            throw new BadCredentialsException("Authentication failed");
        }
    }

    // 判断当前的provider是否支持认证
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
```

LoggedController
```java
@RestController  
public class LoggedController {  
    @GetMapping("/")  
    public ResponseEntity<String> hello() {  
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();  
        return ResponseEntity.ok(String.format("Hello %s!", authentication.getName()));  
    }  
}
```
#### 3.2.3 基于AuthenticationManager实现
- 配置自定义的`AuthenticationManager`的Bean。
- 使用自定义的`AuthenticationManager`。
```java
@Configuration
public class SecurityConfig {

    /**
     * 1 自定义 AuthenticationManager, 注入需要的 provider。
     * @param userService
     * @return
     */
    @Bean
    public AuthenticationManager authenticationManager(UserService userService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(NoOpPasswordEncoder.getInstance());
        provider.setUserDetailsService(userService);
        return new ProviderManager(provider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        return http
                // 2 使用自定义的authenticationManager
                .authenticationManager(authenticationManager)
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().authenticated()
                )
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .build();
    }
}
```
### 3.3 前后端分离认证流程
改造内容如下：
- 默认情况下，响应由`DefaultLoginPageGeneratingFilter`生成，修改使用通用`ResultVO`实现`JSON`格式返回。
- 前后端分离下，对`Session`禁用。
- 自定义认证流程，禁用`UsernamePasswordAuthentiactionFilter`不使用内置的`/login`接口进行认证，自己定义接口实现认证。
- 自定义登出流程，使用`/logout`接口进行登出。
- 使用`jwt`进行会话管理。
- 集成`redis`以及`Mybatis`。
- 未认证或授权的异常处理，使用`ResultVO`实现返回。
整体项目结构：
```sh
+---src
|   +---main
|   |   +---java
|   |   |   \---cc
|   |   |       \---yiueil
|   |   |           |   JwtApplication.java
|   |   |           |
|   |   |           +---config
|   |   |           |       RedisConfiguration.java
|   |   |           |       SecurityConfiguration.java
|   |   |           |
|   |   |           +---controller
|   |   |           |       LoggedController.java
|   |   |           |
|   |   |           +---filter
|   |   |           |       JwtFilter.java
|   |   |           |
|   |   |           +---handler
|   |   |           |       CustomAccessDeniedHandler.java
|   |   |           |       CustomAuthenticationEntryPoint.java
|   |   |           |
|   |   |           +---mapper
|   |   |           |       UserMapper.java
|   |   |           |
|   |   |           +---model
|   |   |           |   +---dto
|   |   |           |   |       UserDTO.java
|   |   |           |   |       UserLoginDTO.java
|   |   |           |   |
|   |   |           |   +---entity
|   |   |           |   |       UserEntity.java
|   |   |           |   |       UserPrincipalEntity.java
|   |   |           |   |
|   |   |           |   \---vo
|   |   |           |           ResultVO.java
|   |   |           |
|   |   |           +---service
|   |   |           |       UserService.java
|   |   |           |
|   |   |           \---utils
|   |   |                   JsonUtils.java
|   |   |                   JwtUtils.java
|   |   |
|   |   \---resources
|   |       |   application.yml
|   |       |
|   |       \---mapper-xml
|   |               UserMapper.xml
|   |
|   \---test
|       \---java
|           \---cc
|               \---yiueil
|                       JwtApplicationTest.java
```
#### 3.3.1 添加SpringSecurity配置类
默认的请求逻辑是前后端不分离的，请求的响应方式springsecurity会响应在生成的page中，而现阶段前后端分离是主流，因此需要改造结果返回方式，使用json进行数据交互。
- 默认的所有的请求都进行授权拦截，排除登录地址。
- 添加`jwtFilter`过滤器，实现对于已经授权部分的认证。
- 禁用`session`。
- 禁用`csrf`。
- 禁用`DefaultLoginPageGeneratingFilter`和`DefaultLogoutPageGeneratingFilter`两个过滤器。
- 禁用表单提交行为的过滤器`BasicAuthenticationFilter`。
- 自定义异常的处理器，针对未认证或者未授权的接口进行异常处理。
```java
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        return http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/customLogin").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, AuthorizationFilter.class)
                .sessionManagement(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .exceptionHandling(exceptionHandlingConfigurer ->
                        exceptionHandlingConfigurer
                                .accessDeniedHandler(accessDeniedHandler)
                                .authenticationEntryPoint(customAuthenticationEntryPoint)
                )
                .build();
    }
}
```
#### 3.3.2 登录处理
登录的时候使用`UserLoginDTO`来进行数据接收，由`UserService`负责具体的认证逻辑。
>调用链：LoggedController->UserService->AuthenticationManager->ProviderManager->Provider->UserDetailsService->UserDAO

LoggedController
```java
@RestController
public class LoggedController {

    private static final Logger log = LoggerFactory.getLogger(LoggedController.class);

    @Autowired
    UserService userService;

    @PostMapping(value = "/customLogin")
    public ResultVO<String> customLogin(@RequestBody UserLoginDTO userLoginDTO) {
        try {
            String id_token = userService.authorize(userLoginDTO);
            return ResultVO.authSuccess(id_token);
        } catch (Exception e) {
            log.debug("msg: {}", e.getMessage());
            return ResultVO.authFail(e.getMessage());
        }
    }
}
```
UserService
```java
@Service
public class UserService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    public String authorize(UserLoginDTO userLoginDTO) {
        String uname = userLoginDTO.getUname();
        String pwd = userLoginDTO.getPwd();
        // 封装一个授权请求对象, 交由authenticationManager进行授权
        UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(uname, pwd);
        // 这里的authenticate就是实际的授权结果
        Authentication authenticate = authenticationManager.authenticate(authRequest);
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserPrincipalEntity userPrincipal = (UserPrincipalEntity) authenticate.getPrincipal();
        UserEntity userEntity = userPrincipal.getUserEntity();
        String subject = "user:" + userEntity.getId();
        int expireMillisecond = 5 * 60 * 1000;
        redisTemplate.opsForValue().set(subject, userEntity, expireMillisecond, TimeUnit.MILLISECONDS);
        return JwtUtils.generateIdToken(subject, expireMillisecond);
    }
}
```
AuthenticationManager，位于配置类中定义Bean：
```java
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(username -> {
            UserEntity userEntity = userMapper.getUserByUsername(username);
            if (userEntity == null) {
                throw new UsernameNotFoundException(username);
            }
            UserPrincipalEntity userPrincipalEntity = new UserPrincipalEntity();
            userPrincipalEntity.setUserEntity(userEntity);
            return userPrincipalEntity;
        });
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoAuthenticationProvider);
    }
```
#### 3.3.3 JWT认证处理
对于已经登录请求，会携带JWT的认证Token，由自定义的`JwtFilter`进行认证。
```java
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().startsWith("/customLogin")) {
            filterChain.doFilter(request, response);
            return;
        }
        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7);
            String subject;
            try {
                DecodedJWT decodedJWT = JwtUtils.decodedJWT(token);
                subject = decodedJWT.getSubject();
            } catch (Exception e) {
                throw new AuthorizationDeniedException("认证已过期");
            }
            UserEntity userEntity = ((UserEntity) redisTemplate.opsForValue().get(subject));
            if (userEntity == null) {
                throw new AuthorizationDeniedException("认证已过期");
            }
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userEntity, null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            doFilter(request, response, filterChain);
        }
    }
}
```

自定义的`JwtFilter`需要添加到过滤器链中
```java
@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        return http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/customLogin").permitAll()
                        .anyRequest().authenticated()
                )
                // JwtFilter加入到过滤器链中, 指定位置在授权之前。
                .addFilterBefore(jwtFilter, AuthorizationFilter.class)
                .sessionManagement(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .exceptionHandling(exceptionHandlingConfigurer ->
                        exceptionHandlingConfigurer
                                .accessDeniedHandler(accessDeniedHandler)
                                .authenticationEntryPoint(customAuthenticationEntryPoint)
                )
                .build();
    }
```
#### 3.3.4 登出处理
对于前后端分离的模式下，登出操作主要的处理是吊销`JWT`的`Token`。
```java
	// Controller代码
    @PostMapping(value = "/customLogout")
    public ResultVO<String> customLogout() {
        try {
            userService.logout();
            return ResultVO.success("登出成功");
        } catch (Exception e) {
            return ResultVO.fail(e.getLocalizedMessage());
        }
    }

	// UserService.logout()
    public void logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity userEntity = (UserEntity) authentication.getPrincipal();
        redisTemplate.opsForValue().getAndDelete("user:" + userEntity.getId());
    }
```
#### 3.3.5 异常处理
`Security`提供的默认的`ExceptionTranslationFilter`，其内部会对过滤器链中引发的异常进行解析转换，然后调用默认的`ExceptionHandler`进行处理。
默认的行为： ![](https://s3.bmp.ovh/imgs/2025/04/29/f0ee5ad08c9cd3ee.png)

自定义Handler：
```java
// 自定义认证异常
@Component  
public class CustomAccessDeniedHandler implements AccessDeniedHandler {  
  
    @Override  
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {  
        response.setContentType("application/json;charset=utf-8");  
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);  
        PrintWriter writer = response.getWriter();  
        writer.write(JsonUtils.getInstance().writeValueAsString(ResultVO.fail(accessDeniedException.getMessage())));  
    }  
}

// 自定义授权异常
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        PrintWriter writer = response.getWriter();
        writer.write(JsonUtils.getInstance().writeValueAsString(ResultVO.fail(authException.getMessage())));
    }
}
```

添加的自定义Handler需要添加到`ExceptionTranslationFilter`中
```java
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        return http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/customLogin").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, AuthorizationFilter.class)
                .sessionManagement(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                // 异常处理器配置添加自定义的异常处理器
                .exceptionHandling(exceptionHandlingConfigurer ->
                        exceptionHandlingConfigurer
                                .accessDeniedHandler(accessDeniedHandler)
                                .authenticationEntryPoint(customAuthenticationEntryPoint)
                )
                .build();
    }
```
## 4 Security授权
### 4.1 仅角色的权限校验

### 4.2 基于RBAC的权限校验

## 5 Security的OAuth2支持
### 5.1 OAuth2的介绍
[OAuth 2.0 的四种方式 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)

### 5.2 通过OAuth2协议接入GitHub平台

## 6 SpringAuthorizationServer（SAS认证服务中心）
### 6.1 极简实现

### 6.2 自定义授权确定页

### 6.3 第三方客户端应用信息保存到数据库

### 6.4 OIDC客户端获取用户信息

### 6.5 取消第三方客户端授权

### 6.6 基于SAS和OAuth2实现单点登录
