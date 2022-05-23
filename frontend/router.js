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
        }
    ).otherwise ("/home", {
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

app.run(function($rootScope, services, services_search){ 
    console.log("HOLLAAAA_ RUN");

    services_search.load_type();
    //services_search.load_model();

});