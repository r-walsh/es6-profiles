angular.module('profiles')
.directive('profile', function() {
	return {

		  restrict: 'E'
		, scope: { profile: '=' }
		, templateUrl: `./src/templates/profile.html`

	}
});