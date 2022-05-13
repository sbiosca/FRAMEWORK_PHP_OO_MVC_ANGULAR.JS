var app = angular.module('FRAMEWORK_PHP_OO_MVC_ANGULAR.JS', ['ngRoute', 'toastr']);

app.config(['$routeProvider', function ($routeProvider) { 
    $routeProvider
    .when ("/contact", {
        templateUrl: "frontend/modules/contact/views/contact_list.html", 
        controller: "ctrl_contact"
    }).otherwise ("", {

    });

}]);

app.run(function($rootScope, services, services_search){ 
    console.log("HOLLAAAA");
});