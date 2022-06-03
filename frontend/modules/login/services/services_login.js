app.factory('services_login', ['services',  '$rootScope', 'toastr', function(services, $rootScope, toastr) {

    let service = {avatar: avatar, login: login, register: register, verify: verify, user_data: user_data}
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
                toastr.success("Log In Correctamente");
                localStorage.setItem("token", response);
                location.href= "#/home";
                window.location.reload();
            }else {
                $rootScope.error_password_red = true;
                
            }
        }, function(error) {
            console.log(error);
        });
    }

    function register(user, email, passwd, passwd1, avatar) {
        console.log(avatar);
        services.post('login', 'register', {username: user, password: passwd, email: email, password1: passwd1, avatar: avatar})
        .then(function(response) {
            console.log(response);
            if (response == "REGISTRADO") {
                $rootScope.error_email_exists, $rootScope.error_usuario_exists = false;
                console.log("DONE!");
                toastr.success("REGISTRADO CORRECTAMENTE, VERIFICA QUE ERES TU EN EL CORREO");
                //localStorage.setItem("token", data);
            }
            else {
                if (response == '"error_mail"') {
                    console.log("Failed!");
                    $rootScope.error_email_exists = true;
                }else if (response == '"error"') {
                    $rootScope.error_usuario_exists = true;
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
                localStorage.removeItem("token");
                setTimeout(() => { 
                    toastr.error("Su cuenta no esta activada, porfavor revise el correo para verificar tu cuenta.");
                 }, 3)
                
                //window.location.reload();
            }
        }, function(error) {
            console.log(error)
        });
    }
}]);