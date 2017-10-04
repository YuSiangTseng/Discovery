import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
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

@Component({
  selector: 'page-myDetail',
  templateUrl: 'myDetail.html'
})
export class MyDetailPage {


  loading: any;
  token = '';
  userName = '';
  birthday = '';
  firstName = '';
  lastName = '';
  email = '';
  gender = '';
  type = "password";
  personTitle = "";
  password = "";

  tempEmail = "";
  tempPassword = "";


  tickImageForFirstName = '';
  tickImageForLastName = '';
  tickImageForEmail = '';
  tickImageForTitle = '';
  private selected: any = moment();
  private date: any = moment().toISOString();
  private imageSrc = "assets/img/userAvatar.svg";
  constructor(public navCtrl: NavController, private platform: Platform, public loadingCtrl: LoadingController, private httpProvider: HttpProvider, private storage: Storage, private keychain: Keychain, public fb: Facebook, private keyboard: Keyboard) {
       storage.get('email').then((val) => {
          var decryptedBytes = CryptoJS.AES.decrypt(val, "My Secret Email");
          var email = decryptedBytes.toString(CryptoJS.enc.Utf8);
          this.tempEmail = email;
        });
       storage.get('password').then((val) => {
          var decryptedBytes = CryptoJS.AES.decrypt(val, "My Secret Password");
          var password = decryptedBytes.toString(CryptoJS.enc.Utf8);
          this.tempPassword = password;
        });


      storage.get('token').then((val) => {
  	  	var decryptedBytes = CryptoJS.AES.decrypt(val, "My Secret Token");
    	  var token = decryptedBytes.toString(CryptoJS.enc.Utf8);
      	this.token = token;

        this.createSpinnerThenSpin();
      	this.getUserDetail(this.token, this.tempEmail, this.tempPassword);
      	this.keyboard.hideKeyboardAccessoryBar(true);
      });
  }

  createSpinnerThenSpin() {
    this.loading = this.loadingCtrl.create({
        content: `
          <ion-spinner ></ion-spinner>`
        });
    this.loading.present();
  }

  dismissSpinner() {
    if(this.loading != null) {
      this.loading.dismiss();
    }
  }



  getUserDetail(token, email, password) {
  	 this.httpProvider.getUserDetail(token, email, password).subscribe(
        result => {
          this.dismissSpinner();
          if(result["member_details"] != null) {
            this.firstName = result["member_details"].name;
            this.birthday = result["member_details"].date_of_birth;
            this.personTitle = result["member_details"].title;
          }
      		this.email = this.tempEmail;
          this.password = this.tempPassword;
          this.updateTickIconAfterSendRequest();
  		});
  }

  updateUserDetailAndPushToTabsPage() {
    this.createSpinnerThenSpin();
    this.httpProvider.updateUserDetail(this.token, this.email, this.password, this.personTitle, this.birthday, this.firstName).subscribe(
        result => {
          this.dismissSpinner();
          if(result["member_details"] != null) {
              this.navCtrl.setRoot(TabsPage);
          }
      });
  }

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

  updateTickIconAfterSendRequest() {
    if(this.firstName != '') {
          this.tickImageForFirstName = "assets/img/tick.svg";
    } else {
          this.tickImageForFirstName = "";
    }

    if(this.email != '') {
      this.tickImageForEmail = "assets/img/tick.svg";
    } else {
      this.tickImageForEmail = "";
    }

    if(this.personTitle != '') {
      this.tickImageForTitle = "assets/img/tick.svg";
    } else {
      this.tickImageForTitle = "";
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
		    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		    destinationType: Camera.DestinationType.FILE_URI,      
		    quality: 100,
		    targetWidth: 1000,
		    targetHeight: 1000,
		    encodingType: Camera.EncodingType.JPEG,      
		    correctOrientation: true
	  	}

	  Camera.getPicture(cameraOptions)
	    .then(file_uri => this.imageSrc = file_uri, 
	    err => console.log(err));   
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

  dismissKeyBoard(event) {
  	if(event.keyCode == 13) {
  		this.keyboard.close();
  	}
  }

}
