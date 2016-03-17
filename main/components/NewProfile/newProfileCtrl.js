export default class NewProfileCtrl {
	constructor( profileService ) {
		this.skills = [''];
		this.profileService = profileService;
	}

	postProfile() {
		this.profileService.postProfile( this.name, this.age, this.profileImage, this.skills );
	}
}

NewProfileCtrl.$inject = [`profileService`];