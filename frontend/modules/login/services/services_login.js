app.factory('services_login', ['services', '$rootScope', 'toastr','services_localstorage','services_activity', function(services, $rootScope, toastr, services_localstorage, services_activity) {

    let service = {avatar: avatar, login: login, logout: logout, register: register, verify: verify, user_data: user_data,
                    recover_password, recover_password, new_password_recover, new_password_recover}
    return service;

    function avatar(user, email, passwd, passwd1) {
        services.get_api('https://randomuser.me/api/')
        .then(function(response) {
             var avatar = response.results[0].picture.large;
             console.log(avatar);
             register(user, email, passwd, passwd1, avatar)
         }, function(error){
             console.log(error)
         });
    }
    
    function login(user, passwd) {
        services.post('login', 'login', {username: user, password: passwd})
        .then(function(response) {
            console.log(response);
            if (response != '"error"') {
                $rootScope.error_password_red = false;
                toastr.success("Log In Correctamente");
                services_localstorage.login_setToken(response);
                location.href= "#/home";
                window.location.reload();
            }else {
                $rootScope.error_password_red = true;
                
            }
        }, function(error) {
            console.log(error);
        });
    }

    function logout() {
        services_localstorage.logout_remove();
        location.href="#/home";
        window.location.reload();
    }

    function register(user, email, passwd, passwd1, avatar) {
        console.log(avatar);
        services.post('login', 'register', {username: user, password: passwd, email: email, password1: passwd1, avatar: avatar})
        .then(function(response) {
            console.log(response);
            if (response == '"REGISTRADO"') {
                $rootScope.error_email_exists = false;
                $rootScope.error_usuario_exists= false;
                $rootScope.error_password_double = false;
                console.log("DONE!");
                toastr.success("REGISTRADO CORRECTAMENTE, VERIFICA QUE ERES TU EN EL CORREO");
                location.href= "#/home";
                //localStorage.setItem("token", data);
            }
            else {
                if (response == '"error_mail"') {
                    console.log("Failed!");
                    $rootScope.error_email_exists = true;
                }else if (response == '"error"') {
                    $rootScope.error_usuario_exists = true;
                }else if (response == '"false"') {
                    $rootScope.error_password_double = true;
                }
                
            }
        }, function(error) {
            console.log(error);
        });
    }

    function verify(token) {
        services.post('login', 'verify_email', {token: token})
        .then(function(response) {
            console.log(response);
            toastr.success("Cuenta verificada, ya puedes logearte");
        }, function(error) {
            console.log(error)
        });
    }

    function user_data(token) {
        services.post('login', 'user_menu', {token: token})
        .then(function(response) {
            console.log(response);
            $rootScope.avatar = response;
            if (response[0].activate == "false") {
                services_localstorage.logout_remove();
                toastr.error("Su cuenta no esta activada, porfavor revise el correo para verificar tu cuenta.");
                setTimeout(() =>{
                    window.location.reload();
                }, 1300)
            }
            services_activity.regenerate_token(response);
        }, function(error) {
            console.log(error)
        });
    }

    function recover_password(email) {
        services.post('login', 'send_recover_email', {email: email})
        .then(function(response) {
            console.log(response);
            if (response == "error") {
                toastr.error("EMAIL NOT CORRECT");
             }else {
                toastr.success("EMAIL SENDED!");
             }
        }, function(error) {
            console.log(error)
        });
    }

    function new_password_recover(token, passwd) {
        services.post('login', 'new_password', {token: token, passwd: passwd})
        .then(function(response) {
            console.log(response);
            toastr.success('New password succesfully');
            location.href = "#/login";
        }, function(error) {
            console.log(error)
        });
    }

}]);