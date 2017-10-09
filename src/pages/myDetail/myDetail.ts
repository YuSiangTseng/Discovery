import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, App } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Utils } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { Keychain } from '@ionic-native/keychain';
import CryptoJS from 'crypto-js';
import { DateFormatPipe } from 'angular2-moment';
// import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-myDetail',
  templateUrl: 'myDetail.html'
})
export class MyDetailPage {


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
  // private selected: any = moment();
  // private date: any = moment().toISOString();

  private imageSrc = "assets/img/userAvatar.svg";
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private app: App, private platform: Platform, public utils: Utils, private httpProvider: HttpProvider, private storage: Storage, private keychain: Keychain, public fb: Facebook, private keyboard: Keyboard, private camera: Camera) {
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

      	this.getUserDetail(this.token, this.tempEmail, this.tempPassword);
      	this.keyboard.hideKeyboardAccessoryBar(true);
      });
  }

  createSpinnerThenSpin() {
    this.utils.createSpinnerThenSpin();
  }

  dismissSpinner() {
    this.utils.dismissSpinner();
  }

  errorMessageHandling(error, errorFromWhichFunction) {
    this.dismissSpinner();
    if(error["statusText"] == "Unauthorized") {
        var alert = this.alertCtrl.create({
            title: 'Invalid Session',
            subTitle: 'please login again',
            buttons: [{
            text: 'OK',
            handler: () => {
              this.storage.set('login', false);
              this.app.getRootNavs()[0].setRoot(LoginPage);
            }
          }]
        });
        alert.present();
    } else {
        var alert = this.alertCtrl.create({
            title: 'Internet Problem',
            buttons: [{
            text: 'Retry',
            handler: () => {
              if(errorFromWhichFunction == "getUserDetail") {
                this.getUserDetail(this.token, this.tempEmail, this.tempPassword);
              } else if(errorFromWhichFunction == "updateUserDetail") {
                this.updateUserDetailAndPushToTabsPage();
              }
              
            }
          }]
        });
        alert.present();
    }
  }

  getUserDetail(token, email, password) {
    this.createSpinnerThenSpin();
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
  		}, err => {
          this.errorMessageHandling(err, "getUserDetail");
      });
  }

  updateUserDetailAndPushToTabsPage() {

    this.createSpinnerThenSpin();
    this.httpProvider.updateUserDetail(this.token, this.email, this.password, this.personTitle, this.birthday, this.firstName).subscribe(
        result => {
          this.dismissSpinner();
          if(result["member_details"] != null) {
              var alert = this.alertCtrl.create({
                title: 'Update Completed',
                buttons: [{
                text: 'Continue',
                handler: () => {
                  this.navCtrl.setRoot(TabsPage);
                }
              }]
            });
            alert.present();
          }
      }, err => {
        this.errorMessageHandling(err, "updateUserDetail");
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

    if(this.personTitle != '') {
      this.tickImageForTitle = "assets/img/tick.svg";
    } else {
      this.tickImageForTitle = "";
    }

    if(this.gender != '') {
      this.tickImageForTitle = "assets/img/tick.svg";
      if(this.gender == "male") {
        this.personTitle = "Mr.";
      } else {
        this.personTitle = "Miss";
      }
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
		    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		    destinationType: this.camera.DestinationType.FILE_URI,      
		    quality: 100,
		    targetWidth: 1000,
		    targetHeight: 1000,
		    encodingType: this.camera.EncodingType.JPEG,      
		    correctOrientation: true
	  	}

	  this.camera.getPicture(cameraOptions)
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
          //this.birthday = response.birthday;
          //this.email = response.email;
          this.gender = response.gender;
          this.updateTickIconAfterSendRequest();
        }, (error) => {
          alert(error);
        })
  	}).catch(e => console.log('Error logging into Facebook', e));

  }

  // updateTickIconAfterFBLogin(): void {
  // 		if(this.firstName != '') {
	 //  			this.tickImageForFirstName = "assets/img/tick.svg";
  // 		} else {
  // 			this.tickImageForFirstName = "";
  // 		}
  // 		if(this.lastName != '') {
	 //  			this.tickImageForLastName = "assets/img/tick.svg";
	 //  	} else {
	 //  			this.tickImageForLastName = "";
	 //  	}
	 //  	if(this.email != '') {
	 //  			this.tickImageForEmail = "assets/img/tick.svg";
	 //  	} else {
	 //  			this.tickImageForEmail = "";
	 //  	}
	 // //  	if(this.gender != '') {
		// // 		this.tickImageForTitle = "assets/img/tick.png";
		// // 		if(this.gender == 'male') {
		// // 			this.personTitle = 'Mr.';
		// // 		} else {
		// // 			this.personTitle = 'Miss';
		// // 		}
		// // } else {
		// // 	this.tickImageForTitle = "";
		// // }
	  		
  // }

}
