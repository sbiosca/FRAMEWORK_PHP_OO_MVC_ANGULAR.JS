app.factory('services_activity', ['services', 'services_localstorage', 'toastr', function(services, services_localstorage, toastr, services_login) {
    let service = {protectactivity: protectactivity, protecturl: protecturl, regenerate_token: regenerate_token
                    ,refresh_cookies: refresh_cookies};
    return service;

    function protectactivity() {
        setInterval(function(){
            services.get('login', 'activity')
            .then(function(response) {
                console.log(response);
                if (response=="inactivo") {
                    toastr.error("TIEMPO DE INACTIVIDAD SUPERADO");
                    services_login.logout();
                }
            }, function(error) {
                console.log(error);
            });
        }, 600000); //solicitud al servidor cada 600 segundos - 10minutos (600000 milisegundos)
        protecturl();
    }

    function protecturl() {
        setInterval(function(){
            services.post('login', 'controluser')
                .then(function(response) {
                    console.log(response);
                    if(response=="type"){
                        location.href = "#/home";
                    }else if (response=="!type"){
                        toastr.options = {
                            'closeButton': true,                
                        }
                        toastr.warning("DEBES REALIZAR LOGIN");
                    }
            }, function(error) {
                console.log(error);
            });
        }, 600000);
    }

    function regenerate_token(data) {
        console.log(data[0].username);
        var username = data[0].username;
        setInterval(function(){
            services.post('login', 'refresh_token', {username: username})
            .then(function(response) {
                console.log(response);
                services_localstorage.login_setToken(response);
            }, function(error) {
                console.log(error);
            });
        }, 600000); //solicitud al servidor cada 600 segundos - 10minutos (600000 milisegundos)
        refresh_cookies();
    }

    function refresh_cookies() {
        services.post('login', 'refresh_cookies')
        .then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error);
        });
       
    }

}]);