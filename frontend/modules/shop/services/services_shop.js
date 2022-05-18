app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {

    console.log("SERVICES_SHOP");
    let service = {list_cars: list_cars, load_pagination: load_pagination};
    return service;

    function list_cars() {
        let total = 3;
        let items = 0;
        services.post('shop', 'list_cars', {total: total, items: items})
        .then(function(response) {
           console.log(response);
           $rootScope.cars = response;
           console.log($rootScope.cars);
        }, function(error) {
            console.log(error);
        });
    }

    function load_pagination() {
        list_cars();
    }




}]);