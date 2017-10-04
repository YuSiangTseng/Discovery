import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { Keychain } from '@ionic-native/keychain';
import CryptoJS from 'crypto-js';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';
import { Camera } from 'ionic-native';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../login/login';
import { registerWorkPlacePage } from '../registerWorkPlace/registerWorkPlace';
import { ShareService } from '../ShareService/ShareService';
import { Utils } from '../../providers/utils/utils';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class registerPage {

  token = '';
  userName = '';
  birthday = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  gender = '';
  personTitle = "";

  tickImageForFirstName = '';
  tickImageForLastName = '';
  tickImageForEmail = '';
  tickImageForTitle = '';
  type = "password";
  private selected: any = moment();
  private date: any = moment().toISOString();
  private imageSrc = "assets/img/userAvatar.svg";
  constructor(public navCtrl: NavController, private utils: Utils, private platform: Platform, private httpProvider: HttpProvider, private storage: Storage, public fb: Facebook, private keyboard: Keyboard, private shareService: ShareService) {
  	  // storage.get('token').then((val) => {
  	  // 	var decryptedBytes = CryptoJS.AES.decrypt(val, "My Secret Token");
    	//   var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
     //  	this.token = plaintext;
     //  	this.getUserDetail(this.token);
     //  	this.keyboard.hideKeyboardAccessoryBar(true);
     //  });
  }

  // getUserDetail(token) {
  // 	 this.httpProvider.getUserDetail(token).subscribe(
  //       result => {
  //     		this.userName = result["first_name"] + "  " + result["last_name"];
  //     		//this.email = result["email"];
  // 		});
  // }

  @ViewChild('datePicker') datePicker;

  dateChanged(date) {
  		const { day, month, year } = date;
  		//this.selected.year(year.value).month(month.text).date(day.value);
  		this.birthday  =   date.year + '-' + date.month + '-' +  date.day;
  }

  showHidePass() {

  	if(this.type == "password") {
  		this.type = "text";
  	} else {
  		this.type = "password";
  	}
  }

  updateTickIcon(field) {
  	switch (field) {
  		case "firstName" :
	  		if(this.firstName != '') {
	  			this.tickImageForFirstName = "assets/img/tick.svg";
	  		} else {
	  			this.tickImageForFirstName = "";
	  		}
	  		break;
	  	case "lastName" :
	  		if(this.lastName != '') {
	  			this.tickImageForLastName = "assets/img/tick.svg";
	  		} else {
	  			this.tickImageForLastName = "";
	  		}
	  		break;
	  	case "email" :
	  		if(this.email != '') {
	  			this.tickImageForEmail = "assets/img/tick.svg";
	  		} else {
	  			this.tickImageForEmail = "";
	  		}
	  		break;
	  	case "title" :
  			if(this.personTitle != '') {
				this.tickImageForTitle = "assets/img/tick.svg";
  			} else {
  				this.tickImageForTitle = "";
  			}
  			break;
	  			
  	} 
  }

  private openGallery (): void {
	  let cameraOptions = {
		    sourceType: 0,
		    destinationType: 1,      
		    quality: 100,
		    targetWidth: 1000,
		    targetHeight: 1000,
		    encodingType: Camera.EncodingType.JPEG,      
		    correctOrientation: true
	  	}

	  Camera.getPicture(cameraOptions)
	    .then((file_uri) => {
      //imageData is a base64 encoded string
        this.imageSrc = file_uri
        // let base64Image = 'data:image/jpeg;base64,' + file_uri;
        // console.log(base64Image);
    }, (err) => {
        console.log(err);
    });
  }

  private fetchFacebookInformation(): void {
  
  	this.fb.login(['public_profile', 'email'])
  	.then((res: FacebookLoginResponse) => {
  		this.imageSrc = "https://graph.facebook.com/" + res.authResponse.userID + "/picture?type=large"
  		this.fb.api('/me?fields=email,first_name,last_name,gender,birthday',[]).then((response)=>{
          this.firstName = response.first_name;
          this.lastName = response.last_name;
          this.birthday = response.birthday;
          this.email = response.email;
          this.gender = response.gender;
          this.updateTickIconAfterFBLogin();
        }, (error) => {
          alert(error);
        })
  	}).catch(e => console.log('Error logging into Facebook', e));

  }

  updateTickIconAfterFBLogin(): void {
  		if(this.firstName != '') {
	  			this.tickImageForFirstName = "assets/img/tick.svg";
  		} else {
  			this.tickImageForFirstName = "";
  		}
  		if(this.lastName != '') {
	  			this.tickImageForLastName = "assets/img/tick.svg";
	  	} else {
	  			this.tickImageForLastName = "";
	  	}
	  	if(this.email != '') {
	  			this.tickImageForEmail = "assets/img/tick.svg";
	  	} else {
	  			this.tickImageForEmail = "";
	  	}
	 //  	if(this.gender != '') {
		// 		this.tickImageForTitle = "assets/img/tick.png";
		// 		if(this.gender == 'male') {
		// 			this.personTitle = 'Mr.';
		// 		} else {
		// 			this.personTitle = 'Miss';
		// 		}
		// } else {
		// 	this.tickImageForTitle = "";
		// }
	  		
  }

  goToTabsPage() {
    this.navCtrl.setRoot(TabsPage);
  }

  goToLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  goToMyWorkPlacePage() {
    this.shareService.userTitle = this.personTitle;
    this.shareService.userFirstName = this.firstName;
    this.shareService.userLastName = this.lastName;
    this.shareService.userBirthday = this.birthday;
    this.shareService.userEmail = this.email;
    this.shareService.userPassword = this.password;
    this.navCtrl.push(registerWorkPlacePage);
  }

}
