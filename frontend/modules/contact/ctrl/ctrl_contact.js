app.controller('ctrl_contact', function($scope, services, toastr) {
	$scope.regName = /^[A-Za-z\s]{6,60}$/;
    $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,6}.[a-z]{2,4}$/;
    $scope.regMatter = /^[A-Za-z-\s]{6,60}$/;
    $scope.regMessage = /^[A-Za-z0-9-\s.]{15,200}$/;

	$scope.sendEmail = function() {
        let email = {'name': $scope.sendEmail_form.full_name, 'email': $scope.user_email, 'matter': $scope.email_matter, 'message': $scope.sendEmail_form.email_message};
        services.post('contact', 'send_contact', email)
        .then(function(response) {
            if (response == '"done"') {
                toastr.success('The email has been sended, you will receive an answer as soon as posible.' ,'Email sended');
                $scope.full_name = null;
                $scope.user_email = null;
                $scope.email_matter = null;
                $scope.email_message = null;
            }else {
                toastr.error('Something happend when trying to send.' ,'Error');
            }
			console.log($scope);
        }, function(error) {
            console.log(error);
        });
    }
});