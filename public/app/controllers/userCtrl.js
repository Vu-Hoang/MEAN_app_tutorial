angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http,$location,$timeout, User) {

	var app = this;

	this.regUser = function(regData) {
		app.loading = true;
		app.errorMsg = false;
		console.log('form submitted');
		User.create(app.regData).then(function(data) {
			console.log(data.data.success);
			console.log(data.data.message);
			if(data.data.success) {
				app.loading = false;
				//Create Success Message
				app.successMsg = data.data.message + '...Redirecting';
				//Redirect to home page
				$timeout(function(){
					$location.path('/');
				},2000);
				
			} else {
				app.loading = false;
				//Create an error message
				app.errorMsg = data.data.message;
			}
		})
	};
})
