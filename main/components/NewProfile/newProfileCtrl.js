export default function newProfileCtrl( $scope, profileService ) {
	$scope.skills = [''];

	$scope.postProfile = function() {
		profileService.postProfile( $scope.name, $scope.age, $scope.profileImage, $scope.skills );
	}
}

newProfileCtrl.$inject = [`$scope`, `profileService`];