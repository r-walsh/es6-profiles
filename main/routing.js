export default function routing( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('profiles', {
			url: '/',
			template: require('./components/views/profiles.html'),
			controller: 'profileCtrl',
			controllerAs: 'pc'
		})
		.state('newProfile', {
			url: '/new',
			template: require('./components/views/newProfile.html'),
			controller: 'newProfileCtrl',
			controllerAs: 'npc'
		});
}
routing.$inject = [`$stateProvider`, `$urlRouterProvider`];