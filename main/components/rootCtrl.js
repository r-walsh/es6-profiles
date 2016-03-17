export default class RootCtrl {
	constructor( profileService ) {
		profileService.getProfiles()
			.then( profiles => this.profiles = profiles );
	}
}

RootCtrl.$inject = [`profileService`];