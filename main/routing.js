export default function routing( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('profiles', {
			url: '/',
			template: require('./components/views/profiles.html'),
			controller: 'profileCtrl'
		})
		.state('newProfile', {
			url: '/new',
			template: require('./components/views/newProfile.html'),
			controller: 'newProfileCtrl'
		});
}
routing.$inject = [`$stateProvider`, `$urlRouterProvider`];