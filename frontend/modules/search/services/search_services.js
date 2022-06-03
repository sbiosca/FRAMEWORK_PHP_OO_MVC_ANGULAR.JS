app.factory('services_search', ['services', '$rootScope', function(services, $rootScope) {
    let service = {load_type: load_type, load_model: load_model, autocomplete: autocomplete};
    return service;

    
    function load_type() {
        services.post('search', 'load_type')
       .then(function(response) {
            $rootScope.type = response;
            console.log($rootScope.type);      
       }, function(error) {
           console.log(error);
       });
    }
    

    function load_model(type = undefined) {
        services.post('search', 'load_model', {type: type})
       .then(function(response) {
            $rootScope.model = response;
            console.log($rootScope.model);         
       }, function(error) {
           console.log(error);
       });
    }

    function autocomplete(type = undefined, model = undefined, autocom) {
        if(autocom != ""){
            services.post('search', 'autocomplete', {type: type, model: model, complete: autocom})
            .then(function(response) {
                console.log(response);
                $rootScope.complete = response;
                $rootScope.cars = response;
                localStorage.setItem("filters", JSON.stringify(response));
                location.href = "#/shop";
            }, function(error) {
                console.log(error);
            });       
        }else{
            $rootScope.complete = [];
        }
    }


}]);