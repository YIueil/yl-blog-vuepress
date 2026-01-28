import{_ as n,o as e,c as s,a as i}from"./app-be491351.js";const a={},l=i(`<h1 id="ubuntu24安装vsftpd" tabindex="-1"><a class="header-anchor" href="#ubuntu24安装vsftpd" aria-hidden="true">#</a> Ubuntu24安装Vsftpd</h1><h2 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
<span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> vsftpd <span class="token parameter variable">-y</span>

<span class="token comment"># 查看版本</span>
vsftpd <span class="token parameter variable">-v</span>
<span class="token comment"># vsftpd: version 3.0.5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-默认配置" tabindex="-1"><a class="header-anchor" href="#_2-默认配置" aria-hidden="true">#</a> 2 默认配置</h2><blockquote><p>默认配置下，可以使用本地用户进行访问，不允许匿名访问。</p></blockquote><div class="language-Properties line-numbers-mode" data-ext="Properties"><pre class="language-Properties"><code># Example config file /etc/vsftpd.conf
#
# The default compiled in settings are fairly paranoid. This sample file
# loosens things up a bit, to make the ftp daemon more usable.
# Please see vsftpd.conf.5 for all compiled in defaults.
#
# READ THIS: This example file is NOT an exhaustive list of vsftpd options.
# Please read the vsftpd.conf.5 manual page to get a full idea of vsftpd&#39;s
# capabilities.
#
#
# Run standalone?  vsftpd can run either from an inetd or as a standalone
# daemon started from an initscript.
listen=NO
#
# This directive enables listening on IPv6 sockets. By default, listening
# on the IPv6 &quot;any&quot; address (::) will accept connections from both IPv6
# and IPv4 clients. It is not necessary to listen on *both* IPv4 and IPv6
# sockets. If you want that (perhaps because you want to listen on specific
# addresses) then you must run two copies of vsftpd with two configuration
# files.
listen_ipv6=YES
#
# Allow anonymous FTP? (Disabled by default).
anonymous_enable=NO
#
# Uncomment this to allow local users to log in.
local_enable=YES
#
# Uncomment this to enable any form of FTP write command.
#write_enable=YES
#
# Default umask for local users is 077. You may wish to change this to 022,
# if your users expect that (022 is used by most other ftpd&#39;s)
#local_umask=022
#
# Uncomment this to allow the anonymous FTP user to upload files. This only
# has an effect if the above global write enable is activated. Also, you will
# obviously need to create a directory writable by the FTP user.
#anon_upload_enable=YES
#
# Uncomment this if you want the anonymous FTP user to be able to create
# new directories.
#anon_mkdir_write_enable=YES
#
# Activate directory messages - messages given to remote users when they
# go into a certain directory.
dirmessage_enable=YES
#
# If enabled, vsftpd will display directory listings with the time
# in  your  local  time  zone.  The default is to display GMT. The
# times returned by the MDTM FTP command are also affected by this
# option.
use_localtime=YES
#
# Activate logging of uploads/downloads.
xferlog_enable=YES
#
# Make sure PORT transfer connections originate from port 20 (ftp-data).
connect_from_port_20=YES
#
# If you want, you can arrange for uploaded anonymous files to be owned by
# a different user. Note! Using &quot;root&quot; for uploaded files is not
# recommended!
#chown_uploads=YES
#chown_username=whoever
#
# You may override where the log file goes if you like. The default is shown
# below.
#xferlog_file=/var/log/vsftpd.log
#
# If you want, you can have your log file in standard ftpd xferlog format.
# Note that the default log file location is /var/log/xferlog in this case.
#xferlog_std_format=YES
#
# You may change the default value for timing out an idle session.
#idle_session_timeout=600
#
# You may change the default value for timing out a data connection.
#data_connection_timeout=120
#
# It is recommended that you define on your system a unique user which the
# ftp server can use as a totally isolated and unprivileged user.
#nopriv_user=ftpsecure
#
# Enable this and the server will recognise asynchronous ABOR requests. Not
# recommended for security (the code is non-trivial). Not enabling it,
# however, may confuse older FTP clients.
#async_abor_enable=YES
#
# By default the server will pretend to allow ASCII mode but in fact ignore
# the request. Turn on the below options to have the server actually do ASCII
# mangling on files when in ASCII mode.
# Beware that on some FTP servers, ASCII support allows a denial of service
# attack (DoS) via the command &quot;SIZE /big/file&quot; in ASCII mode. vsftpd
# predicted this attack and has always been safe, reporting the size of the
# raw file.
# ASCII mangling is a horrible feature of the protocol.
#ascii_upload_enable=YES
#ascii_download_enable=YES
#
# You may fully customise the login banner string:
#ftpd_banner=Welcome to blah FTP service.
#
# You may specify a file of disallowed anonymous e-mail addresses. Apparently
# useful for combatting certain DoS attacks.
#deny_email_enable=YES
# (default follows)
#banned_email_file=/etc/vsftpd.banned_emails
#
# You may restrict local users to their home directories.  See the FAQ for
# the possible risks in this before using chroot_local_user or
# chroot_list_enable below.
#chroot_local_user=YES
#
# You may specify an explicit list of local users to chroot() to their home
# directory. If chroot_local_user is YES, then this list becomes a list of
# users to NOT chroot().
# (Warning! chroot&#39;ing can be very dangerous. If using chroot, make sure that
# the user does not have write access to the top level directory within the
# chroot)
#chroot_local_user=YES
#chroot_list_enable=YES
# (default follows)
#chroot_list_file=/etc/vsftpd.chroot_list
#
# You may activate the &quot;-R&quot; option to the builtin ls. This is disabled by
# default to avoid remote users being able to cause excessive I/O on large
# sites. However, some broken FTP clients such as &quot;ncftp&quot; and &quot;mirror&quot; assume
# the presence of the &quot;-R&quot; option, so there is a strong case for enabling it.
#ls_recurse_enable=YES
#
# Customization
#
# Some of vsftpd&#39;s settings don&#39;t fit the filesystem layout by
# default.
#
# This option should be the name of a directory which is empty.  Also, the
# directory should not be writable by the ftp user. This directory is used
# as a secure chroot() jail at times vsftpd does not require filesystem
# access.
secure_chroot_dir=/var/run/vsftpd/empty
#
# This string is the name of the PAM service vsftpd will use.
pam_service_name=vsftpd
#
# This option specifies the location of the RSA certificate to use for SSL
# encrypted connections.
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO

#
# Uncomment this to indicate that vsftpd use a utf8 filesystem.
utf8_filesystem=YES
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-连接测试" tabindex="-1"><a class="header-anchor" href="#_3-连接测试" aria-hidden="true">#</a> 3 连接测试</h2><blockquote><p>可以本地进行连接测试</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yiueil@YIueil-X99:/etc$ <span class="token function">ftp</span> <span class="token number">192.168</span>.1.128
Connected to <span class="token number">192.168</span>.1.128.
<span class="token number">220</span> <span class="token punctuation">(</span>vsFTPd <span class="token number">3.0</span>.5<span class="token punctuation">)</span>
Name <span class="token punctuation">(</span><span class="token number">192.168</span>.1.128:yiueil<span class="token punctuation">)</span>:
<span class="token number">331</span> Please specify the password.
Password:
<span class="token number">230</span> Login successful.
Remote system <span class="token builtin class-name">type</span> is UNIX.
Using binary mode to transfer files.
ftp<span class="token operator">&gt;</span> <span class="token function">ls</span>
<span class="token number">229</span> Entering Extended Passive Mode <span class="token punctuation">(</span><span class="token operator">||</span><span class="token operator">|</span><span class="token number">5211</span><span class="token operator">|</span><span class="token punctuation">)</span>
<span class="token number">150</span> Here comes the directory listing.
drwxr-xr-x    <span class="token number">4</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Oct <span class="token number">13</span> <span class="token number">11</span>:33 Desktop
drwxrwxr-x    <span class="token number">4</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Oct <span class="token number">13</span> <span class="token number">16</span>:35 Disk
drwxr-xr-x    <span class="token number">2</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">12</span> <span class="token number">16</span>:59 Documents
drwxr-xr-x    <span class="token number">4</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Oct <span class="token number">11</span> <span class="token number">16</span>:52 Downloads
drwxr-xr-x    <span class="token number">2</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">12</span> <span class="token number">16</span>:59 Music
drwxr-xr-x    <span class="token number">2</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">12</span> <span class="token number">16</span>:59 Pictures
drwxr-xr-x    <span class="token number">2</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">12</span> <span class="token number">16</span>:59 Public
drwxrwxr-x    <span class="token number">4</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">15</span> <span class="token number">10</span>:40 Software
drwxr-xr-x    <span class="token number">2</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">12</span> <span class="token number">16</span>:59 Templates
drwxr-xr-x    <span class="token number">3</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">12</span> <span class="token number">18</span>:49 Videos
drwxrwxr-x    <span class="token number">5</span> <span class="token number">1000</span>     <span class="token number">1000</span>         <span class="token number">4096</span> Sep <span class="token number">13</span> <span class="token number">21</span>:06 WorkSpace
<span class="token number">226</span> Directory send OK.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-自定义配置" tabindex="-1"><a class="header-anchor" href="#_4-自定义配置" aria-hidden="true">#</a> 4 自定义配置</h2><p>未完待续......</p>`,11),d=[l];function r(t,o){return e(),s("div",null,d)}const u=n(a,[["render",r],["__file","Ubuntu24anzhuangVsftpd.html.vue"]]);export{u as default};
