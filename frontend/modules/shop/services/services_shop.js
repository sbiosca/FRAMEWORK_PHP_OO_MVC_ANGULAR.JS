app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {

    let service = {list_cars: list_cars, load_pagination1: load_pagination1, load_pagination2: load_pagination2, details: details};
    return service;

    function list_cars(pagi, items = 0) {
        var total = pagi[0].cars - 3; 
        services.post('shop', 'list_cars', {total: total, items: items})
        .then(function(response) {
           console.log(response);
           $rootScope.cars = response;
           console.log($rootScope.cars);
            
        }, function(error) {
            console.log(error);
        });
    }

    function load_pagination1(total) {
        let items = 0;
        list_cars(total, items);
    }
    function load_pagination2(total) {
        let items = 3;
        list_cars(total, items);
    }

   function details(id) {
       console.log(id);
       services.post('shop', 'list_one_cars', {id : id})
       .then(function(response) {
          console.log(response);
          $rootScope.onecars = response;
       }, function(error) {
           console.log(error);
       });
   }



}]);