var app = angular.module('FRAMEWORK_PHP_OO_MVC_ANGULAR.JS', ['ngRoute', 'toastr']);

app.config(['$routeProvider', function ($routeProvider) { 
    $routeProvider
    .when ("/contact", {
        templateUrl: "frontend/modules/contact/views/contact_list.html", 
        controller: "ctrl_contact"
    }).when ("/home", {
        templateUrl: "frontend/modules/home/views/home.html", 
        controller: "ctrl_home",
        resolve: {
            carrousel_brand: function (services) {
                return services.get('home','carrousel_brand');
            },
            categ: function (services) {
                return services.get('home','categ');
            },
            type: function (services) {
                return services.get('home','type');
            }
        }
    }).when ("/shop", {
        templateUrl: "frontend/modules/shop/views/shop.html", 
        controller: "ctrl_shop",
        resolve: {
                list_cars: function (services) {
                    return services.get('shop','list_cars');
                },
                filters: function (services) {
                    return services.get('shop','filters');                
                },
                pagi: function (services) {
                    return services.get('shop','count_pagination');
                }
            } 
    }).when ("/shop/not", {
        templateUrl: "frontend/modules/shop/views/shop.html", 
        controller: "ctrl_shop",
        resolve: {
                list_cars: function (services) {
                    return services.get('shop','list_cars');
                },
                filters: function (services) {
                    return services.get('shop','filters');                
                },
                pagi: function (services) {
                    return services.get('shop','count_pagination');
                }
            } 
    }).when ("/details/:id", {
        templateUrl: "frontend/modules/shop/views/shop.html", 
        controller: "ctrl_shop",
        resolve: {
                list_cars: function (services) {
                    return services.get('shop','list_cars');
                },
                filters: function (services) {
                    return services.get('shop','filters');                
                },
                pagi: function (services) {
                    return services.get('shop','count_pagination');
                }
            } 
    }).when ("/login", {
        templateUrl: "frontend/modules/login/views/login.html", 
        controller: "ctrl_login",
    
    }).when ("/logout", {
        templateUrl: "frontend/modules/login/views/login.html", 
        controller: "ctrl_login",
    
    }).when ("/register", {
        templateUrl: "frontend/modules/login/views/register.html", 
        controller: "ctrl_login",
    
    }).when ("/verify/:token", {
        templateUrl: "frontend/modules/login/views/login.html", 
        controller: "ctrl_login",
    
    }).when ("/recover", {
        templateUrl: "frontend/modules/login/views/login.html", 
        controller: "ctrl_login",
    
    }).when ("/recover/:token", {
        templateUrl: "frontend/modules/login/views/login.html", 
        controller: "ctrl_login",
    
    }).otherwise ("/home", {
        templateUrl: "frontend/modules/home/views/home.html", 
        controller: "ctrl_home",
        resolve: {
            carrousel_brand: function (services) {
                return services.get('home','carrousel_brand');
            },
            categ: function (services) {
                return services.get('home','categ');
            },
            type: function (services) {
                return services.get('home','type');
            }
        }
    });

}]);

app.run(function($rootScope, services, services_search, services_login, services_activity){ 
    if(localStorage.token){
        $rootScope.button_logout = true;
        $rootScope.button_login = false;
        var toke = localStorage.token.replace(/['\"]+/g, '');
        var toke = toke.substring(1, toke.length - 1);
        console.log(toke);
        services_login.user_data(toke);
        services_activity.protectactivity();
    }else{
        $rootScope.button_login = true;
        $rootScope.button_logout = false;
    }

    $rootScope.show_page = true;
    services_search.load_type();

    $rootScope.load_model = function(type) {
        services_search.load_model(type);
    }

    $rootScope.autocomplete = function(type = undefined, model = undefined, autocom){
        services_search.autocomplete(type, model, autocom);
    }

});