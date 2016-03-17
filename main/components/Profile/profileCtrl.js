export default class ProfileCtrl {
	constructor( profileService ) {
		profileService.getProfiles()
			.then( profiles => this.profiles = profiles );
	}
}

ProfileCtrl.$inject = [`profileService`];