angular.module('profiles')
.controller('rootCtrl', function( $scope, profileService ) {

	profileService.getProfiles()
					.then( profiles => $scope.profiles = profiles );

});