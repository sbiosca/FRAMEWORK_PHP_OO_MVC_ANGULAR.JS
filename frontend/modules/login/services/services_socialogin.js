app.factory('services_socialogin', ['services', 'services_localstorage', 'toastr', function(services, services_localstorage, toastr) {

    let service = { firebase_config: firebase_config, social_login: social_login, provider_config, provider_config};
    return service;

    function firebase_config() {
        var config = {
            apiKey: "AIzaSyCYb_cRSfjsPE8uLFJF9DJZV7a1cqNBG5E",
            authDomain: "test-56e9e.firebaseapp.com",
            databaseURL: "https://test-56e9e.firebaseapp.com",
            projectId: "test-56e9e",
            storageBucket: "",
            //messagingSenderId: "613764177727"
        };
        if(!firebase.apps.length){
            firebase.initializeApp(config);
        }else{
            firebase.app();
        }
        return authService = firebase.auth();
    }

    function social_login(data){
        authService = firebase_config();
        authService.signInWithPopup(provider_config(data))
        .then(function(result) {
            console.log('Hemos autenticado al usuario ', result.user);
            console.log(result.user.photoURL);
            console.log(result.user.email);
            console.log(result.user.uid + "_" + result.credential.providerId);
    
            var username = result.user.email;
            var uid = result.user.uid + "_" + result.credential.providerId;
            var avatar = result.user.photoURL;
            if (result) {
                services.post('login', 'social_login', {user: username, id: uid, avatar: avatar})
                .then(function(response) {
                    console.log(response);
                    toastr.success("Log In Correctamente");
                    services_localstorage.login_setToken(response);
                    location.href = "#/home";
                    window.location.reload();
                }, function(error) {
                    console.log(error);
                });
           }
        },function(error) {
            console.log(error);
        });
    }
    function provider_config(param){
        if(param === 'google'){
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            return provider;
        }else if(param === 'github'){
            return provider = new firebase.auth.GithubAuthProvider();
        }
    }



}]);