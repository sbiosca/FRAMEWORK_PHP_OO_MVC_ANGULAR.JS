app.controller('ctrl_home', function($scope, $window, carrousel_brand, categ, type,services_shop) {
  
  $scope.carrousels = carrousel_brand;
  $scope.categs = categ;
  $scope.types = type;

  $scope.go_shop = function(brand, categ, type) {
    location.href = '#/shop';
    services_shop.filter_car(brand, null, null, categ, type);
  }
  
  //news()
  console.log($scope.categs);

  setTimeout(() => {  
    new Swiper('.swiper', {
        loop: true,
        slidesPerView: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 2000,
        },
      })
    },0)
  
});

