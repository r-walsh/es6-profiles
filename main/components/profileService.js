export default class ProfileService {
	constructor( $http ) {
		this.http = $http;
	}

	getProfiles() {
		return this.http.get(`/api/profile`)
					.then( profiles => profiles.data );
	}

	postProfile( name, age, url, skills ) {
		return this.http.post(`/api/profile`, {
			name
			, age
			, url
			, skills
		});
	}
}

ProfileService.$inject = [`$http`];