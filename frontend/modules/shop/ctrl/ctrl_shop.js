/*

function read_likes_user(data,user) {
    console.log(data);
    console.log();
    for (row in data) {
        console.log(data[row].enrolment);
        var car = data[row].enrolment;
        var token = user.replace(/['"]+/g, '');
        ajaxPromise('?modules=shop&op=read_likes', 'POST', 'JSON', {id: car, user: token})
        .then(function(data){
            console.log(data);
            if (data[0].enrolment == null) {
                console.log("NO LIKE");
                //click_likes(user,data[0].likes);
            }else {
                console.log(data[0].enrolment)
                var likee = document.getElementById(data[0].enrolment + "1");
                console.log(likee);
                likee.style.color = '#FF0000';
                //click_likes(user,data[0].likes);
            }
            //
        }).catch(function(eerr){
            console.log(eerr);
        });   
    }
    
}

function click_likes(user){
    $(document).on("click",".div-likes",function() {
        $('<p></p>').attr('class',"icon-like").appendTo(".caret")
            .html("")
            var id = this.getAttribute('id');
            if (user == null) {
                toastr.error("DEBES INICIAR SESION PARA HACER LIKE", {
                    "timeOut": "5",
                    "extendedTimeout" : "5"
                }
                );
                var url = "?modules=login&op=list_login&log=" + id;
                window.location.href = url;
                var url = "?modules=shop&op=view&log=" + id;
                localStorage.setItem('url',url);
            }
            var token = user.replace(/['"]+/g, '');
            console.log(token);
            
        ajaxPromise('?modules=shop&op=load_likes', 'POST', 'JSON', {id: id, user: token})
        .then(function(data){
            console.log(data);
            if (data == "LIKE") {
                var likee = document.getElementById(id + "1");
                console.log(likee);
                likee.style.color = '#FF0000';
                toastr.success("LIKE REALIZADO CON ÉXITO!");
                localStorage.setItem('likes','like');
            }
            else {
                var likee = document.getElementById(id + "1");
                console.log(likee);
                likee.style.color = '#808080';
                toastr.success("DISLIKE REALIZADO CON ÉXITO!");
                //localStorage.removeItem('likes');
            }
            //
        }).catch(function(error){
            console.log(error);
        });
    });

}

function read_likes(data){
    var user = localStorage.getItem("token")
   
    if (user) {
        console.log("logeado");
        click_likes(user);
        var mg = localStorage.getItem('likes')
        if (mg) {
            read_likes_user(data,user);
        }
        
    }else {
        console.log("no log");
        click_likes();
    }

}
*/

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
        console.log(id);
        services_shop.click_like();
        if (!localStorage.getItem("token")) {
            console.log("NO TOKEN");
        }
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