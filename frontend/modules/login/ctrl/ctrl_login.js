app.controller('ctrl_login', function($scope, services_login,  $route, services_socialogin) {
    $scope.regex_username = /^[A-Za-z0-9._-]{5,15}$/;
    $scope.regex_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.regex_password = /^[A-Za-z0-9._-]{5,20}$/;

    $scope.login = function() {
        if ($route.current.params.id) {
            services_login.login($scope.username, $scope.password, $route.current.params.id);
        }else {
            services_login.login($scope.username, $scope.password);
        }
    }

    $scope.register = function() {
        services_login.avatar($scope.username, $scope.email, $scope.password, $scope.password1);
    }

    $scope.login_google = function (google) {
        services_socialogin.firebase_config();
        services_socialogin.social_login(google);
        console.log(google);
    }

    $scope.login_github = function (git) {
        services_socialogin.firebase_config();
        services_socialogin.social_login(git);
        console.log(git);
    }

    $scope.recover_password = function(email) {
        console.log(email);
        services_login.recover_password(email);
    }

    $scope.new_password_recover = function(passwd, passwd1) {
        console.log(passwd, $route.current.params.token);
        if (passwd == passwd1) {
            $scope.error_newpassword_red = false;
        }else {
           $scope.error_newpassword_red = true;
        }
        services_login.new_password_recover($route.current.params.token, passwd);
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'login'){
        console.log("PATH-LOGIN");
        $scope.form_login = true;
    }else if(path[1] === 'logout'){
        services_login.logout();
    }else if(path[1] === 'register'){
       console.log("PATH-REGISTER");
    }else if (path[1] === 'verify') {
        console.log($route.current.params.token);
        services_login.verify($route.current.params.token);
        $scope.form_login = true;
    }else if (path[1] === 'recover') {
        console.log($route.current.params.token);
        if ($route.current.params.token) {
            $scope.form_recover = false;
            $scope.form_new_email = true;
        }else {
            $scope.form_recover = true;
            $scope.form_new_email = false;
        }
    }
});