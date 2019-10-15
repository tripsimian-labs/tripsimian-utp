import { Component, OnInit } from '@angular/core'; 
import { AuthService } from './../auth/auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'; 

@ Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
	profile: any;
	profileForm = new FormGroup({
		first_name: new FormControl(''),
		family_name: new FormControl(''),
		personal_contact: new FormGroup({
		  address_1: new FormControl(''),
		  address_2: new FormControl(''),
		  city: new FormControl(''),
		  state_provence: new FormControl(''),
		  postcode: new FormControl(''),
		  phone_country: new FormControl(''),
		  phone_number: new FormControl(''),
		  email: new FormControl('')
		})
	  });
	constructor(public auth: AuthService) {
		//	ideally it should use generic interface/class: this.profileForm = this.getFormBuilderProfile(this.formBuilder);
	}

	onUpdate() {
		// TODO: Use EventEmitter with form value... ex: update AWS or Auth0 w/profile change....
		console.warn(this.profileForm.value);
	}

	getFormBuilderProfile(formBuilder: FormBuilder) {
		//currently not used... see constructor() above.... 
		return formBuilder.group({
//			profile: formBuilder.group(new Profile())
		});
	}

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
