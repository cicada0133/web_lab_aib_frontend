# Лабораторная работа №1  

## Цель работы  
  
Познакомиться с протоколом HTTP и протоколом HTTPS, а так же особенностями установления соединения между источником и получателем.  
  
### 1. Исследование URL РГУПС  
Запрос: 
> curl rgups.ru
> 
Ответ:  
```shell  
<html>  
<head><title>301 Moved Permanently</title></head>  
<body>  
<center><h1>301 Moved Permanently</h1></center>  
<hr><center>nginx/1.19.1</center>  
</body>  
</html>  
```

Код перенаправления 301 Moved Permanently протокола передачи гипертекста (HTTP) показывает, что запрошенный ресурс был окончательно перемещён в URL, указанный в заголовке Location (en-US).

Запрос: 
>curl https://rgups.ru/
> 
Ответ:  
```shell  

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="
       #и тд. 
```
 *Получили контент страницы*
 
Запрос: 
>curl rgups.ru -L
> 

Ответ:  
```shell  

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="
       #и тд. 
```
*Получили контент страницы, т.к. ключ -L позволяет принимать и обрабатывать перенаправления (нас перенаправило по верному адресу)*

Запрос: 
> curl http://rgups.ru
> 
Ответ:  
```shell  

<html>  
<head><title>301 Moved Permanently</title></head>  
<body>  
<center><h1>301 Moved Permanently</h1></center>  
<hr><center>nginx/1.19.1</center>  
</body>  
</html>  
```
*Мы не получили доступ к странице, т.к. указан не тот протокол*

Запрос: 
> curl https://rgups.ru -I
> 
Ответ:  

		

Благодаря ключу -I получили только данные HTTP заголовка. Это они и их краткое поянение:

    HTTP/1.1 200 OK - Протокол + код ответа 
    Server: nginx/1.19.1 - данные о веб сервере
    Date: Mon, 18 Sep 2023 13:35:46 GMT - основной HTTP заголовок содержащий дату и время, в которое сообщение было создано
    Content-Type: text/html; charset=utf-8 - тип контента, используемая кодировка текста
    Connection: keep-alive - Заголовок Connection определяет, остаётся ли сетевое соединение активным  после завершения текущей транзакции (запроса). Если в запросе отправлено значение keep-alive,  то
    соединение остаётся и не завершается, позволяя выполнять последующие запросы на тот же сервер
    X-Powered-By: ProcessWire CMS - система управления контентом. _ProcessWire_ — _это_ свободная и открытая система управления контентом (_CMS_). Она написана на языке программирования PHP и использует базу данных MySQL.
    Set-Cookie: wire=7bd9986f618d3b903503f2e03ee5d0d6; path=/; HttpOnly; SameSite=Lax** - HTTP заголовок Set-Cookie используется для отправки cookies с сервера на агент пользователя. 
    Expires:Thu, 19 Nov 1981 08:52:00 GMT- содержит дату/время, по истечении которой ответ сервера считается устаревшим. Прошедшая или невалидная дата, например 0, обозначает, что ресурс уже устарел. Если в ответе с сервера установлен заголовок Cache-Control с директивами "max-age" или "s-maxage" , заголовок Expires игнорируется (но у нас нет таких директив).
    Cache-Control: no-store, no-cache, must-revalidate - Общий заголовок _Cache_-_Control_ используется для задания инструкций кеширования как для запросов, так и для ответов. `no-store`- Кеш не должен хранить никакую информацию о запросе и ответе `no-cache`- Указывает на необходимость отправить запрос на сервер для валидации ресурса перед использованием закешированных данных. `must-revalidate`- Кеш должен проверить статус устаревших ресурсов перед их использованием. Просроченные ресурсы не должны быть использованы.
    Pragma: no-cache - делает контент некэшируемым (?)


Запрос: 

> curl rgups.ru -L -I -k -v
> 
`-I` - Получать только HTTP заголовок, а все содержимое страницы игнорировать. 
`-v` - Этот ключ делает подробный вывод информации о запросе. 
`-L` - Принимать и обрабатывать перенаправления.  
`-k` - Отключает проверку SSL-сертификата.

Ответ:
```shell  

*   Trying 80.72.224.90:80...
* Connected to rgups.ru (80.72.224.90) port 80 (#0)
> HEAD / HTTP/1.1
> Host: rgups.ru
> User-Agent: curl/8.0.1
> Accept: */*
>
< HTTP/1.1 301 Moved Permanently
HTTP/1.1 301 Moved Permanently
< Server: nginx/1.19.1
Server: nginx/1.19.1
< Date: Mon, 18 Sep 2023 14:12:14 GMT
Date: Mon, 18 Sep 2023 14:12:14 GMT
< Content-Type: text/html
Content-Type: text/html
< Content-Length: 169
Content-Length: 169
< Connection: keep-alive
Connection: keep-alive
< Location: https://rgups.ru/
Location: https://rgups.ru/

<
* Connection #0 to host rgups.ru left intact
* Clear auth, redirects to port from 80 to 443
* Issue another request to this URL: 'https://rgups.ru/'
*   Trying 80.72.224.90:443...
* Connected to rgups.ru (80.72.224.90) port 443 (#1)
* schannel: disabled automatic use of client certificate
* ALPN: offers http/1.1
* ALPN: server accepted http/1.1
* using HTTP/1.1
> HEAD / HTTP/1.1
> Host: rgups.ru
> User-Agent: curl/8.0.1
> Accept: */*
>
< HTTP/1.1 200 OK
HTTP/1.1 200 OK
< Server: nginx/1.19.1
Server: nginx/1.19.1
< Date: Mon, 18 Sep 2023 14:12:15 GMT
Date: Mon, 18 Sep 2023 14:12:15 GMT
< Content-Type: text/html; charset=utf-8
Content-Type: text/html; charset=utf-8
< Connection: keep-alive
Connection: keep-alive
< X-Powered-By: ProcessWire CMS
X-Powered-By: ProcessWire CMS
< Set-Cookie: wire=f29d3da6503af9f29cf369f25063f170; path=/; HttpOnly; SameSite=Lax
Set-Cookie: wire=f29d3da6503af9f29cf369f25063f170; path=/; HttpOnly; SameSite=Lax
< Expires: Thu, 19 Nov 1981 08:52:00 GMT
Expires: Thu, 19 Nov 1981 08:52:00 GMT
< Cache-Control: no-store, no-cache, must-revalidate
Cache-Control: no-store, no-cache, must-revalidate
< Pragma: no-cache
Pragma: no-cache

<
* Connection #1 to host rgups.ru left intact

```
  Trying 80.72.224.90:80...
  Trying 80.72.224.90:443...
   Clear auth, redirects to port from 80 to 443
	HTTP/1.1 200 OK
	
*В ходе выполнения запроса нас перенаправило на другой порт и мы получили  код ответа 200 ОК*
- Ip: `80.72.224.90`  
- Port: `80`  
- Host: `rgups.ru`  
- Cache-Control: `no-store, no-cache, must-revalidate`  
- Content-Type: `text/html`  
- Response code: `301 Moved Permanently`  
- Protocol: `HTTP/1.1`



### 2. Исследование URL Github 

Запрос:
> curl www.github.com

Ответ: Ничего

 
Запросы:
> curl https://github.com/
> curl github.com/ -L

*Дают нам контент страницы*

Запрос:

> curl github.com/ -L  -I
> 
Ответ:
(В ответе приведу расшифровку данных ответа, которые ранее не встречались)
  
    HTTP/1.1 301 Moved Permanently
    Content-Length: 0
    Location: https://github.com/

     //перенаправление

    HTTP/1.1 200 OK
    Server: GitHub.com
    Date: Mon, 18 Sep 2023 14:40:09 GMT
    Content-Type: text/html; charset=utf-8
		

    //Заголовок ответа Vary определяет, как сопоставить будущие заголовки запроса, чтобы решить, можно ли использовать кешированный ответ, а не запрашивать новый с исходного сервера.
    
    Vary: X-PJAX, X-PJAX-Container, Turbo-Visit, Turbo-Frame, Accept-Language, Accept-Encoding, Accept, X-Requested-With 
    content-language: en-US
    
    // ETag является идентификатором специфической версии ресурса. 
    Он позволяет более эффективно использовать кеш и сохраняет пропускную способность,
     позволяя серверу отправлять не весь ответ, если содержимое не изменилось.
    
    ETag: W/"c5f4c5899e668a011846e19fa1182426"
    Cache-Control: max-age=0, private, must-revalidate
    // Strict-Transport-Security. HSTS — механизм, принудительно активирующий защищённое соединение через протокол HTTPS. Директива max-age указывает серверу, сколько времени в секундах нужно помнить, что соединение должно проходить по протоколу  HTTPS.
    Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
    X-Frame-Options: deny
    X-Content-Type-Options: nosniff
    X-XSS-Protection: 0
    Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
    
    // CSP (Content Security Policy) — стандарт защиты сайтов от атак с внедрением контента, например XSS — межсайтового скриптинга. CSP описывает безопасные источники загрузки и блокирует ресурсы, которые не входят в «белый список». Все, что не разрешено - запрещено.
    
    Content-Security-Policy: default-src 'none'; base-uri 'self'; child-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/; connect-src 'self' uploads.github.com www.githubstatus.com collector.github.com raw.githubusercontent.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events objects-origin.githubusercontent.com *.actions.githubusercontent.com productionresultssa0.blob.core.windows.net/ productionresultssa1.blob.core.windows.net/ productionresultssa2.blob.core.windows.net/ productionresultssa3.blob.core.windows.net/ productionresultssa4.blob.core.windows.net/ productionresultssa5.blob.core.windows.net/ productionresultssa6.blob.core.windows.net/ productionresultssa7.blob.core.windows.net/ productionresultssa8.blob.core.windows.net/ productionresultssa9.blob.core.windows.net/ wss://*.actions.githubusercontent.com github-production-repository-image-32fea6.s3.amazonaws.com github-production-release-asset-2e65be.s3.amazonaws.com insights.github.com wss://alive.github.com github.githubassets.com; font-src github.githubassets.com; form-action 'self' github.com gist.github.com objects-origin.githubusercontent.com; frame-ancestors 'none'; frame-src viewscreen.githubusercontent.com notebooks.githubusercontent.com support.github.com; img-src 'self' data: github.githubassets.com media.githubusercontent.com camo.githubusercontent.com identicons.github.com avatars.githubusercontent.com github-cloud.s3.amazonaws.com objects.githubusercontent.com secured-user-images.githubusercontent.com/ user-images.githubusercontent.com/ private-user-images.githubusercontent.com opengraph.githubassets.com github-production-user-asset-6210df.s3.amazonaws.com customer-stories-feed.github.com spotlights-feed.github.com objects-origin.githubusercontent.com *.githubusercontent.com; manifest-src 'self'; media-src github.com user-images.githubusercontent.com/ secured-user-images.githubusercontent.com/ private-user-images.githubusercontent.com github.githubassets.com; script-src github.githubassets.com; style-src 'unsafe-inline' github.githubassets.com; upgrade-insecure-requests; worker-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/
    Set-Cookie: _gh_sess=pX56i8wjV9z0IvR%2BNb2m32QFFJ1%2FHRqi8fpvWaBlVG384OVvbYy9oZzrd%2BKiwOFFipzMYN4G2jw%2FnpaZicsT3ZKXwH1oQOVAWoFaJbjvtXoa%2B5wu%2FBRHJ%2BMXDzAsz7PskcbPLnj%2Fzx0URuzOswbgs%2FCvptDlBgBnrivw5wt6W7QtKHSShrQFknCJkFLlBvWUfpavvduSjZGi5484RI%2Bdva%2B74AImg72E%2BGMRZCbvJyKwyddxO9R%2B1rL3F0WMMpavrT9muLoHNSZVFNobBxiRsw%3D%3D--7h1a6RMf20R31vpL--NAT5YGC1RGqoGPVLl8ptzg%3D%3D; Path=/; HttpOnly; Secure; SameSite=Lax
    Set-Cookie: _octo=GH1.1.410741501.1695048018; Path=/; Domain=github.com; Expires=Wed, 18 Sep 2024 14:40:18 GMT; Secure; SameSite=Lax
    Set-Cookie: logged_in=no; Path=/; Domain=github.com; Expires=Wed, 18 Sep 2024 14:40:18 GMT; HttpOnly; Secure; SameSite=Lax
    Accept-Ranges: bytes
    
	    //_Accept_-_Ranges_ — это маркер, который использует сервер, чтобы уведомить клиента о поддержке "запросов по кускам"
	    
    X-GitHub-Request-Id: D01B:0F2E:222C9E54:22A4325D:65086152
- Ip: ` 140.82.121.4`  
- Port: `443`  
- Host: ` github.com`  
- Cache-Control: ` max-age=0, private, must-revalidate`  
- Content-Type: `text/html`  
- Response code: `200`  
- Protocol: `HTTP/1.1` 

      
###  3. Исследование URL РЖД 

Запрос: 

> curl rzd.ru -I  -L

Ответ:

    HTTP/1.1 301 Moved Permanently
    Date: Mon, 18 Sep 2023 15:30:25 GMT
    Content-Type: text/html
    Content-Length: 150
    Connection: keep-alive
    Location: https://rzd.ru:443/

    HTTP/1.1 403 Forbidden
    Connection: close
    Content-Length: 109
    Content-Type: text/html
- Response code: 403 Forbidden

Запрос: 

> curl rzd.ru -I  -L  --User-agent "Yandex"

Ответ:
```shell  
* Connected to www.rzd.ru (212.164.138.130) port 443  
> HEAD / HTTP/1.1  
> Host: www.rzd.ru  
> User-Agent: Yandex  
> Accept: */*  
>  
< HTTP/1.1 200  
< Content-Type: text/html;charset=utf-8  
< Content-Length: 209317  
< Connection: keep-alive  
< Date: Sun, 17 Sep 2023 10:29:28 GMT  
< Vary: Accept-Encoding  
< X-UCM-Pod-Name: inex-ucm-776d97f9d-p87lc  
< Strict-Transport-Security: max-age=15724800; includeSubDomains  
< Via: nginx2  
< X-Frame-Options: sameorigin  
< Set-Cookie: session-cookie=1785a8ec53e50835bdcca0c118991a24f5b69c80b35752d451553e9b9d91271c7350850b2b6dd289ff7b1171eaa572cd; Max-Age=86400; Path=/; secure; HttpOnly  
< X-XSS-Protection: 1; mode=block  
  
```  
- Ip: `212.164.138.130`  
- Port: `443`  
- Host: `rzd.ru`  
- Cache-Control: `?`  
- Content-Type: `text/html`  
- Response code: `200`  
- Protocol: `HTTP/1.1`  
 
 ###  4. Исследование URL Яндекс

Запрос: 

> curl yandex.ru -I  -L

```shell  
HTTP/1.1 302 Moved temporarily
Accept-CH: Sec-CH-UA-Platform-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA, Sec-CH-UA-Full-Version-List, Sec-CH-UA-WoW64, Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Platform, Sec-CH-UA-Full-Version, Viewport-Width, DPR, Device-Memory, RTT, Downlink, ECT
Location: http://yandex.ru/showcaptcha?cc=1&mt=92B0BE1A7B8F5309A9AF4A50136A092455D56F0F48681171623908E61F85BDC58837FBBF33CC45889C86E033C15997C7EC0943AA75C85A2F2B13DE45F91090762FBDE369F8D7A4EFC7661E43427547D0EDD7E4DE267C5E2869BBAD27E74EA1FB2514953C40F7824ED3244D8CE117&retpath=aHR0cDovL3lhbmRleC5ydS8__6193b5dba6f6bb7dbf2c05d4424d259b&t=2/1695050929/c2f230a17b9cf2d8e2d369a0455dfe09&u=9c596466-d4974f26-10a947a0-5dc5b476&s=858e6b86ed8bdfa2c2830a4e8765ef6a
NEL: {"report_to": "network-errors", "max_age": 100, "success_fraction": 0.001, "failure_fraction": 0.1}
Report-To: { "group": "network-errors", "max_age": 100, "endpoints": [{"url": "https://dr.yandex.net/nel", "priority": 1}, {"url": "https://dr2.yandex.net/nel", "priority": 2}]}
Set-Cookie: spravka=dD0xNjYzNTE0OTI5O2k9MTc2LjIxMi4zMy4yMjQ7RD1FQ0I2MzlFRTlBNzlGMjJGNEE3RDUxRDUxRDk4OTM3QTQwQ0JGMjA4REFERjJFMjBFMjFBMTdFQThBQUIwNTRFMUJERDQzODM1NzZCRUFFNTt1PTE2NjM1MTQ5MjkxNjAzNDc3ODg7aD00YzBiMDRlNjg4YzI3OTYyYTEzZmY3OTY4MDYwYjIzMw==; domain=.yandex.ru; path=/; expires=Wed, 18 Oct 2023 15:28:49 GMT
Set-Cookie: _yasc=tYiyv1LToRWIkYYFmrs92P/1edlLTl2Hd3bsJybnDW0SwiS4EUjERG1Oq6Ns2ImsUkqi; domain=.yandex.ru; path=/; expires=Thu, 15 Sep 2033 15:28:49 GMT; secure
X-Content-Type-Options: nosniff
X-Yandex-Captcha: captcha
X-Yandex-EU-Request: 0
X-Yandex-Req-Id: 1695050929160258-12723286491543067269-balancer-l7leveler-kubr-yp-vla-18-BAL

HTTP/1.1 200 Ok
Accept-CH: Sec-CH-UA-Platform-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA, Sec-CH-UA-Full-Version-List, Sec-CH-UA-WoW64, Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Platform, Sec-CH-UA-Full-Version, Viewport-Width, DPR, Device-Memory, RTT, Downlink, ECT
Access-Control-Allow-Origin: yastatic.net
Content-Length: 12894
Content-Type: text/html
NEL: {"report_to": "network-errors", "max_age": 100, "success_fraction": 0.001, "failure_fraction": 0.1}
Report-To: { "group": "network-errors", "max_age": 100, "endpoints": [{"url": "https://dr.yandex.net/nel", "priority": 1}, {"url": "https://dr2.yandex.net/nel", "priority": 2}]}
Set-Cookie: _yasc=ckQvGrpIRe4SPW8DZIXR1aJ3f4b8ewXJrcWINRH0Kd0bVs+iyj+GcP/sWvBI3rU+WZk=; domain=.yandex.ru; path=/; expires=Thu, 15 Sep 2033 15:28:49 GMT; secure
X-Content-Type-Options: nosniff
X-Yandex-Captcha: captcha
X-Yandex-EU-Request: 0
X-Yandex-Req-Id: 1695050929194840-12463190966552088505-balancer-l7leveler-kubr-yp-vla-18-BAL
>  
```  
- Ip: `213.180.193.56`  
- Port: `80`  
- Host: `yandex.ru`  
- Cache-Control: `max-age=1209600,private`  
- Content-Type: `text/html`  
- Response code: `302`  
- Protocol: `HTTP/1.1`  
  

###  5. Исследование URL Python
 
 Запрос: 
> curl python.org -I  -L 

```shell  
  
* Connected to www.python.org (146.75.120.223) port 443  

HTTP/1.1 301 Moved Permanently
Connection: close
Content-Length: 0
Server: Varnish
Retry-After: 0
Accept-Ranges: bytes
Date: Mon, 18 Sep 2023 15:27:22 GMT
Via: 1.1 varnish
X-Served-By: cache-hel1410033-HEL
X-Cache: HIT
X-Cache-Hits: 0
X-Timer: S1695050843.615231,VS0,VE0
Location: https://www.python.org/
Strict-Transport-Security: max-age=315360000; preload

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 50302
Server: nginx
Content-Type: text/html; charset=utf-8
X-Frame-Options: SAMEORIGIN
Via: 1.1 vegur, 1.1 varnish, 1.1 varnish
Accept-Ranges: bytes
Date: Mon, 18 Sep 2023 15:27:22 GMT
Age: 3342
X-Served-By: cache-iad-kiad7000025-IAD, cache-fra-eddf8230023-FRA
X-Cache: HIT, HIT
X-Cache-Hits: 19, 17
X-Timer: S1695050843.987756,VS0,VE0
Vary: Cookie
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
<  
```  
- Ip: `146.75.120.223`  
- Port: ` 443`  
- Host: `www.python.org`  
- Cache-Control: `?`  
- Content-Type: `text/html; charset=utf-8`  
- Response code: `200 OK`  
- Protocol: `HTTP/1.1`  
  
 ###  6. Исследование URL Saint  GIT
  
   Запрос: 
>    curl git-scm.com -I  -L

```shell  
 HTTP/1.1 301 Moved Permanently
Date: Mon, 18 Sep 2023 15:24:13 GMT
Connection: keep-alive
Cache-Control: max-age=3600
Expires: Mon, 18 Sep 2023 16:24:13 GMT
Location: https://git-scm.com/
Server: cloudflare
CF-RAY: 808a9839190b0a31-ARN

HTTP/1.1 200 OK
Date: Mon, 18 Sep 2023 15:24:13 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-Xss-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: strict-origin-when-cross-origin
Cache-Control: public, max-age=14400
Etag: W/"db69273d9410cbf4536e9d4b3a59685d"
X-Request-Id: 476d2e08-474c-4f3d-8503-d83ed21ae45f
X-Runtime: 0.015343
Via: 1.1 vegur
CF-Cache-Status: HIT
Age: 3138
Server: cloudflare
CF-RAY: 808a983a2ce29d96-DME
```  

- Ip: `188.114.99.224`  
- Port: `443`  
- Host: `git-scm.com`  
- Cache-Control: `public, max-age=14400`  
- Content-Type: `text/html; charset=utf-8`  
- Response code: `200 OK`  
- Protocol: `HTTP/1.1`  

  

  ###  7. Исследование URL Jetbrains
   
Запрос: 

> curl jetbrains.com -I -L 

  
```shell  
HTTP/1.1 301 Moved Permanently
Server: CloudFront
Date: Mon, 18 Sep 2023 15:34:24 GMT
Content-Type: text/html
Content-Length: 167
Connection: keep-alive
Location: https://jetbrains.com/
X-Cache: Redirect from cloudfront
Via: 1.1 9f6a623c512f1a1b6fd6b2d4bd697472.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: HEL50-C1
Alt-Svc: h3=":443"; ma=86400
X-Amz-Cf-Id: ZQSP_K6hem6-Zk8gpuIu21wcnTUQgjlfCWreGT865mhq8tNAUB2PvQ==

HTTP/1.1 308 Found
Server: CloudFront
Date: Mon, 18 Sep 2023 15:34:25 GMT
Content-Length: 0
Connection: keep-alive
Location: https://www.jetbrains.com/
Strict-Transport-Security: max-age=31536000;
X-Cache: FunctionGeneratedResponse from cloudfront
Via: 1.1 4b3b9541fe386ba754a368a9d0694d7a.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: HEL50-C1
Alt-Svc: h3=":443"; ma=86400
X-Amz-Cf-Id: qnUb3GLWi1IjLit-t_FYubRx2SZOdWhhJpLuaE_5x7sOKtPAegAcjg==

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 47213
Connection: keep-alive
Date: Mon, 18 Sep 2023 15:33:59 GMT
Server: nginx
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Expires: Mon, 18 Sep 2023 15:33:59 GMT
Cache-Control: max-age=0
Pragma: no-cache
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-Xss-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000;
Vary: Accept-Encoding
Via: 1.1 5ae6b1227c5565476676f5f1039b8206.cloudfront.net (CloudFront)
Alt-Svc: h3=":443"; ma=86400
Age: 26
X-Cache: Hit from cloudfront
X-Amz-Cf-Pop: HEL50-C1
X-Amz-Cf-Id: 7RvXuBbCGIl8D5mP9McIwtZV2Qvai6CpIx6V32VRfaLEf3ulWbDxgQ==
<  
```  
- Ip: `108.157.229.51`  
- Port: `443`  
- Host: `www.jetbrains.com`  
- Cache-Control: `max-age=0`  
- Content-Type: `text/html; charset=utf-8`  
- Response code: `200 OK`  
- Protocol: `HTTP/1.1`  
  

### 8. Исследование URL VSC 
Запрос: 

> curl code.visualstudio.com -I  -L 

  Ответ:

```shell  
HTTP/1.1 307 Temporary Redirect 
Content-Length: 0
Location: https://code.visualstudio.com/
X-Azure-Ref: 0Zm4IZQAAAAAevZIUweL0SYhIdeUKJKHSU1RPRURHRTEzMjEAYmU4N2RjNmQtNDBmOS00NWIwLTg4MTAtOTkxMDg3ZWY4YjI5
Date: Mon, 18 Sep 2023 15:36:06 GMT

HTTP/1.1 200 OK
Content-Length: 50213
Content-Type: text/html; charset=utf-8
Accept-Ranges: bytes
ETag: W/"c425-XBxswsHoV0dlJCAKuBbwZ9s5rjQ"
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: frame-ancestors 'self'
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Content-Type-Options: nosniff
X-Powered-By: ASP.NET
x-azure-ref: 0Zm4IZQAAAAAcD24YnPJrTKctqAqoczFpU1RPRURHRTE0MDkAYmU4N2RjNmQtNDBmOS00NWIwLTg4MTAtOTkxMDg3ZWY4YjI5
X-Cache: CONFIG_NOCACHE
Date: Mon, 18 Sep 2023 15:36:06 GMT


//HTTP код перенаправления 307 Temporary Redirect означает, что запрошенный ресурс был временно перемещён в URL-адрес, указанный в заголовке Location (en-US). Метод и тело исходного запроса повторно используются для выполнения перенаправленного запроса.

	- Ip: `13.107.246.45`  
    - Port: `443`  
    - Host: `code.visualstudio.com`  
    - Cache-Control: `?`  
    - Content-Type: `text/html; charset=utf-8`  
    - Response code: `200 OK`  
    - Protocol: `HTTP/1.1`

