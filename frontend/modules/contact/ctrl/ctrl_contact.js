/*function click_send_email() {
	$(".button__contact").on('click', '#send_contact', function () {
		check_email();
	});
}

function check_email() {
	$(document).on('click','#send_contact',function(){
		result = true;
		$(".error").remove();

		var pname = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
	    var pmessage = /^[0-9A-Za-z\s]{20,100}$/;
    	var pmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if ($("#name").val() === "" || $("#name").val() === "Introduce tu nombre" ) {
			$("#name").focus().after("<span class='error'>Introduce tu nombre</span>");
			return false;
		}else if (!pname.test($("#name").val())) {
			$("#name").focus().after("<span class='error'>El nombre tiene un minimo de 3 caracteres</span>");
			return false;
		}
		if ($("#email").val() === "" || $("#email").val() === "Introduce tu email" ) {
			$("#email").focus().after("<span class='error'>Introduce tu email</span>");
			return false;
		}else if (!pmail.test($("#email").val())) {
			$("#email").focus().after("<span class='error'>El formato del mail es incorrecto</span>");
			return false;
		}
		if ($("#matter").val() === "Seleccione un asunto" ) {
			$("#matter").focus().after("<span class='error'>Seleccione un asunto</span>");
			return false;
		}
		if ($("#message").val() === "" || $("#message").val() === "Seleccione un asunto" ) {
			$("#message").focus().after("<span class='error'>Introduzca su mensaje</span>");
			return false;
		}else if (!pmessage.test($("#message").val())) {
			$("#message").focus().after("<span class='error'>El mensaje tiene un minimo de 20 caracteres</span>");
			return false;
		}
		
		if (result) {
			send_email({name:$("#name").val(), email:$("#email").val(), matter:$("#matter").val(), message:$("#message").val()});
		}
	});
}

function send_email(content_email) {
	console.log(content_email);
	ajaxPromise(friendlyURL('?modules=contact&op=send_contact'), 'POST', 'JSON', content_email)
	.then(function(data){
		console.log(data);
		toastr.success('Email sended');
	}).catch(function(error) {
		console.log(error);
		toastr.error('Something happend when trying to send.' ,'Error');
	});
}

$(document).ready(function(){
	click_send_email();
});*/

app.controller('ctrl_contact', function($scope, services, toastr) {
	console.log("CONTROLLER CONTACT APP FUNCTION");
	$scope.regName = /^[A-Za-z\s]{6,60}$/;
    $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,6}.[a-z]{2,4}$/;
    $scope.regMatter = /^[A-Za-z-\s]{6,60}$/;
    $scope.regMessage = /^[A-Za-z0-9-\s.]{15,200}$/;

	$scope.sendEmail = function() {
        let email = {'name': "sergi", 'email': $scope.user_email, 'matter': $scope.email_matter, 'message': $scope.email_message};
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
            }// end_else
			console.log(response);
        }, function(error) {
            console.log(error);
        });// end_request
    }// end_$sendEmail
});