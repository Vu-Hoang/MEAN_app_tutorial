angular.module('userApp', ['appRoute', 'userControllers','userServices','ngAnimate', 'mainController', 'authServices'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});