## Introducción de proyecto
1. [Información](#Información)
2. [Tecnologías](#Tecnologías)
3. [Modulos](#Modulos)
4. [Funciones](#Funciones)

### Información
***
Mi proyecto es una aplicación web de un concesionario de coches llamado BIOSCAR. Mi proyecto se ha realizado para el ciclo superior de Desarrollo de Aplicaciones WEB. El proyecto contiene el archivo .gitignore, donde selecciona todos los archivos .ini donde se encuentran todas las credenciales del programa. El codigo de proyecto esta definido en dos carpetas(backend y frontend), donde estan definidas las parte de servidor y cliente.

## Tecnologías
***
Este proyecto lo he basado con los siguientes lenguajes:
* [JavaScript](https://www.javascript.com/)
* [PHP](https://www.php.net/)
* [CSS-HTML](https://html.com/)
* [MYSQL](https://www.mysql.com/)
> Con un Framework y Angular.js:
* [Angular JS](https://angularjs.org/): 1.4.9
> Y las siguientes librerias:
* [MapBox](https://docs.mapbox.com/)
* [Swiper-Carousel](https://swiperjs.com/swiper-api)
* [Toastr](https://www.npmjs.com/package/toastr)
* [Firebase-auth](https://firebase.google.com)

## Modulos
***
El proyecto esta dividido en los siguientes 5 modulos:
1. Modulo Contact
  > Desde el menú podemos acceder al modulo de contact donde se encuentra un formulario para contactar a través de un servidor de correo al soporte de la         página.

2. Modulo Home
  > La página principal, el homepage. Consiste en un apartado de las diferentes marcas que contiene el concesionario, desde donde podemos acceder a los       coches seleccionando la marca que nos interesa. Luego otro apartado de las categorias y tipos de coches, donde también podemos acceder a los coches seleccionando el tipo o categoría que nos interesa. Y al final del home se encuentran las noticias relacionadas de nuestra página web.

3. Modulo Login
  > El login, cumple con todas sus acciones para que un usuario pueda registrarse o logearse a nuestra página web. Una vez un usuario se registra deberá verificar su usuario a través de su correo electrónico. Una vez logeado un usuario podrá realizar sus coches favoritos. Si un usuario no recuerda su contraseña, mediante su correo podrá recuperar y cambiar su contraseña. Y también he añadido el social login, que un usuario pueda logearse en mi página desde su cuenta de Google o Github. Dentro de todo el login, he realizado el secure login, donde todos los usuarios podrán tener su cuenta bien segura, sin que nadie ajeno a su cuenta pueda acceder a ella o atacar hacía el usuario.

4. Modulo Search
  > El search lo encontraremos en todas las opciones de nuestra página, ya que se encuentra en el menú. Desde el search podremos buscar los deseados coches por tipo, categoría o ciudad en la que está a la venta.

5. Modulo Shop
  > El shop, donde se encuentran todo el listado de coches que ofrece nuestro concesionario con todas las características de los coches. Podemos filtrar en diferentes filtros, por modelo, color o marca del coche que deseamos filtrar. Podemos realizar la paginación, donde saldrán diferentes coches. También está el mapa donde situa los coches donde se encuentran a la venta. Tambíen el usuario puede seleccionar un coche y ver más profundas las características y fotos de ese coche, donde también aparecerán los coches relacionados o interesados para ese usuario. Y el usuario puede seleccionar todos los coches que desee para ponerselo en likes.


## Funciones
***
Diferentes funciones de cada módulo:
1. Módulo Shop, services shop:
    > Function; list_cars, filter_car, print_filter_car, load_pagination1, load_pagination2, details, mapbox ,details_map, more_cars, remove_filters, click_likes, read_likes
2. Módulo Home, ctrl home:
    > Function; carrousel_brand, category, type
3. Módulo Contact, ctrl contact:
    > Function; send_email
4. Módulo Login, services login, services_activity, services_localstorage, services_socialogin:
    > avatar, login, logout, register, verify, user_data, recover_password, new_password_recover
    > protectactivity, protecturl, regenerate_token, refresh_cookies
    > login_setToken, logout_remove
    > firebase_config, social_login, provider_config