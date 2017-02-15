angular.module('mainController',['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location,$rootScope) {
	var app = this;

	$rootScope.$on('$routeChangeStart', function() {
		if (Auth.isLoggedIn()) {
			console.log('Success: User is logged in');
			app.isLoggedIn = true;
			Auth.getUser().then(function(data) {
				console.log(data.data.username);
				app.username = data.data.username;
				app.useremail = data.data.email;
			});
		} else {
			console.log('Failure: User is NOT logged in.');
			app.isLoggedIn = false;
			app.username = '';
		}
	});

	this.doLogin = function(loginData) {
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data) {
			if(data.data.success) {
				app.loading = false;
				//Create Success Message
				app.successMsg = data.data.message + '...Redirecting';
				//Redirect to home page
				$timeout(function(){
					$location.path('/about');
					app.loginData = '';
					app.successMsg = false;
				},2000);
				
			} else {
				app.loading = false;
				//Create an error message
				app.errorMsg = data.data.message;
			}
		});
	};

	this.logout = function($) {
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
		}, 2000);
	}

});