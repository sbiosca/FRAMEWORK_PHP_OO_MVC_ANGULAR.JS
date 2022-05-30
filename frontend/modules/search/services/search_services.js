/*
function autocomplete() {
    $(document).on('keyup', '#city', function() {
        let infor =  {complete: $(this).val()};
        if (($('#type').val() != 0)){
            infor.type = $('#type').val();
            if(($('#type').val() != 0) && ($('#model').val() != 0)){
                infor.model = $('#model').val();
             }
        }
        if(($('#type').val() == 0) && ($('#model').val() != 0)){ 
            infor.model = $('#model').val();
        }
        ajaxPromise(friendlyURL('?modules=search&op=autocomplete'), 'POST', 'JSON', infor)
        .then(function(data) {
            $('#search_city').empty();
            $('#search_city').fadeIn(1000);
            for (row in data) {
                $('<div></div>').appendTo('#search_city').html(data[row].city).attr({'class': 'searchElement', 'id': data[row].city});
            }
            $(document).on('click', '.searchElement', function() {
                $('#city').val(this.getAttribute('id'));
                $('#search_city').fadeOut(1000);
            });
            
        }).catch(function(error) {
            console.log(error);
        });

    });
}

function icon_search() {
    $(document).on('click', '.icon-search', function() {
        var search = [];
        var type = [];
        var model = [];
        var city = [];
    
        localStorage.removeItem('search');
        if(($('#type').val() == 0) && ($('#model').val() == 0)){
            if($('#city').val() != ""){
                city.push($('#city').val());
                search.push(city)
                localStorage.setItem('city',city);
            }
        }else if(($('#type').val() != 0) && ($('#model').val() == 0)){
            if($('#city').val() != ""){
                city.push($('#city').val());
                search.push(city)
                localStorage.setItem('city',city);
            }
            type.push($('#type').val());
            search.push(type)
            localStorage.setItem('type',type);
        }else if(($('#type').val() == 0) && ($('#model').val() != 0)){
            if($('#city').val() != ""){
                city.push($('#city').val());
                search.push(city)
                localStorage.setItem('city',city);
            }
            model.push($('#model').val());
            search.push(model)
            localStorage.setItem('model',model);
        }else{
            if($('#city').val() != ""){
                city.push($('#city').val());
                search.push(city)
                localStorage.setItem('city',city);
            }
            type.push($('#type').val());
            search.push(type)
            localStorage.setItem('type',type);
            model.push($('#model').val());
            search.push(model)
            localStorage.setItem('model',model);
        }    
        localStorage.removeItem('search');
        if(search.length != 0){
            localStorage.setItem('search', JSON.stringify(search));
        }
        window.location.href=friendlyURL("?modules=shop&op=view");
    });

    $(document).on('click', '#remove-search', function() {
        localStorage.removeItem('filters');
        localStorage.removeItem('search');
        localStorage.removeItem('city');
        localStorage.removeItem('model');
        localStorage.removeItem('type');
        window.location.href = '?modules=shop&op=view';

    });
}
$(document).ready(function() {
    autocomplete();
    load_search();
    icon_search();
    
});*/

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