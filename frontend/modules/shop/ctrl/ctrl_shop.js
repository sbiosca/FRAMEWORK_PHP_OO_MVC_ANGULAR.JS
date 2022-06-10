app.controller('ctrl_shop', function($scope, $rootScope, $route, list_cars, filters, pagi, services_shop) {

    $scope.list = list_cars;
    $scope.filters = filters;
    $scope.pagination = pagi;
    
    console.log(filters);
   
    $scope.filter_cars = function(brand_name, model_name, color) {
        services_shop.filter_car(brand_name, model_name, color);
    }
    $scope.details = function(id) {
        location.href = '#/details/:'+id;
    }
    
    $scope.remove_filters = function() {
        services_shop.remove_filters();
    }

    $scope.click_like = function(id) {
        if (localStorage.getItem("token")) {
            var toke = localStorage.token.replace(/['\"]+/g, '');
            var toke = toke.substring(1, toke.length - 1);
        }
        
        services_shop.click_like(id, toke);
    }

    let path = $route.current.originalPath.split('/');
    console.log(path);

    if (path[1] === "shop")  {
        $rootScope.show_cars = true;
        $rootScope.show_cars_not = false;
        $scope.show_only_car = false;
        $scope.show_list_car = true;
        $scope.show_pagination = true;
        if (localStorage.getItem("filters")) {
            console.log("FILTROS LOCALSTORAGE");
            var filtros = JSON.parse(localStorage.filters);
            services_shop.print_filter_car(filtros);
            console.log(filtros);
            $scope.filters = filtros;
            if (localStorage.getItem("filters_select")){
            var hightlightfilters = JSON.parse(localStorage.filters_select);
            if (hightlightfilters[0].brand_name) {
                $scope.select_brand = true;
            }
            if (hightlightfilters[0].model_name) {
                $scope.select_model = true;
            }
            if (hightlightfilters[0].color) {
                $scope.select_color = true;
            }}
            
        }else {
            services_shop.list_cars($scope.pagination);  
            $scope.load_pagination1 = function() {
                services_shop.load_pagination1($scope.pagination);
            }
            $scope.load_pagination2 = function() {
                services_shop.load_pagination2($scope.pagination);
            }
        }
    }else if (path[1] === "details") {
        let id = $route.current.params.id.split(':');
        services_shop.details(id[1]);
        $scope.show_only_car = true;
        $scope.show_list_car = false;
    } 
   

});