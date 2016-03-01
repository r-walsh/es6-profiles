angular.module('profiles')
.directive('newProfile', function() {
	return {

		  restrict: 'E'
		, scope: {}
		, templateUrl: `./src/templates/newProfile.html`
		, controller( $scope, profileService ) {
			$scope.skills = [''];

			$scope.postProfile = function() {
				profileService.postProfile( $scope.name, $scope.age, $scope.profileImage, $scope.skills );
			}
		}

	}
});