import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, App } from 'ionic-angular';
import { HttpProvider } from '../../../providers/HttpProvider/HttpProvider';
import { UtilsProvider } from '../../../providers/UtilsProvider/UtilsProvider';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../../Tabs/Tabs';
import { UserLoginPage } from '../../UserLogin/UserLogin';
import { Keychain } from '@ionic-native/keychain';
import CryptoJS from 'crypto-js';
import { DateFormatPipe } from 'angular2-moment';
// import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
import { ShareService } from '../../ShareService/ShareService';


@Component({
  selector: 'UserDetail',
  templateUrl: 'UserDetail.html'
})
export class UserDetailPage {


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
  tempFirstName = "";
  tempLastName = "";
  tempBirthday = "";
  tempTitle = "";


  tickImageForFirstName = '';
  tickImageForLastName = '';
  tickImageForEmail = '';
  tickImageForTitle = '';
  // private selected: any = moment();
  // private date: any = moment().toISOString();

  private imageSrc = "assets/img/userAvatar.svg";
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private app: App, private shareService: ShareService, private platform: Platform, public utils: UtilsProvider, private httpProvider: HttpProvider, private storage: Storage, private keychain: Keychain, public fb: Facebook, private keyboard: Keyboard, private camera: Camera) {
       this.shareService.getEmail().then((val) => {
          if(val != null && val != "") {
            this.email = val;
            this.shareService.getToken().then((val) => {
              if(val != null && val != "") {
                this.token = val;
                this.getUserDetail(this.token, this.email);
              }
            }).catch(error=>{
                //handle error
            });
          }
      }).catch(error=>{
          //handle error
      });
      this.shareService.getPassword().then((val) => {
          if(val != null && val != "") {
            this.password = val;
            this.tempPassword = val;
          }
      }).catch(error=>{
          //handle error
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
              this.app.getRootNavs()[0].setRoot(UserLoginPage);
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
                this.getUserDetail(this.token, this.tempEmail);
              } else if(errorFromWhichFunction == "updateUserDetail") {
                this.updateUserDetailAndPushToTabsPage();
              }
              
            }
          }]
        });
        alert.present();
    }
  }

  getUserDetail(token, email) {
    this.createSpinnerThenSpin();
  	 this.httpProvider.getUserDetail(token, email).subscribe(
        result => {
          this.dismissSpinner();
          if(result["member_details"] != null) {
            this.firstName = result["member_details"].firstname;
            this.lastName = result["member_details"].lastname;
            this.birthday = result["member_details"].birthday;
            this.personTitle = result["member_details"].title;
            this.tempFirstName = this.firstName;
            this.tempLastName =  this.lastName;
            this.tempBirthday = this.birthday;
            this.tempTitle = this.personTitle;
          }
          this.updateTickIconAfterSendRequest();
  		}, err => {
          this.errorMessageHandling(err, "getUserDetail");
      });
  }

  updateUserDetailAndPushToTabsPage() {

    if(this.tempFirstName != this.firstName || this.tempLastName != this.lastName || this.tempBirthday != this.birthday || this.tempTitle != this.personTitle || this.tempPassword != this.password) {
        this.createSpinnerThenSpin();
          this.httpProvider.updateUserPersonalDetail(this.token, this.email, this.password, this.personTitle, this.birthday, this.firstName, this.lastName).subscribe(
          result => {
            this.dismissSpinner();
            if(result["member_details"] != null) {
              if(this.tempPassword == this.password) {
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
              } else {
                this.httpProvider.updateUserPersonalPassword(this.token, this.email, this.password).subscribe(result => {
                  if(result["member"] != null) {
                    var encryptedPassword = CryptoJS.AES.encrypt(this.password, "My Secret Password").toString();
                    this.storage.set('password', encryptedPassword);
                    var alert = this.alertCtrl.create({
                      title: 'Password has been updated',
                      subTitle: 'Please use new password to log in again',
                      buttons: [{
                      text: 'OK',
                      handler: () => {
                        this.storage.set('login', false);
                        this.app.getRootNavs()[0].setRoot(UserLoginPage);
                      }
                      }]
                      });
                    alert.present();
                  } 
                }, err => {
                    this.errorMessageHandling(err, "updateUserDetail");
                });
              }  
        
            }
          }, err => {
              this.errorMessageHandling(err, "updateUserDetail");
          });
      } else {
        var alert = this.alertCtrl.create({
          title: 'Opps, seems nothing is changed',
          buttons: [{
          text: 'OK'
          }]
          });
        alert.present();
      }
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
    this.tickImageForFirstName = this.utils.updateTickIconForInputField(this.firstName);
    this.tickImageForLastName = this.utils.updateTickIconForInputField(this.lastName);
    this.tickImageForEmail = this.utils.updateTickIconForInputField(this.email);
    this.tickImageForTitle = this.utils.updateTickIconForInputField(this.personTitle);

  }

  updateTickIcon(field) {
  	switch (field) {
  		case "firstName" :
	  		this.tickImageForFirstName = this.utils.updateTickIconForInputField(this.firstName);
	  		break;
	  	case "lastName" :
	  		this.tickImageForLastName = this.utils.updateTickIconForInputField(this.lastName);
	  		break;
	  	case "email" :
	  		this.tickImageForEmail = this.utils.updateTickIconForInputField(this.email);
	  		break;
	  	case "title" :
  			this.tickImageForTitle = this.utils.updateTickIconForInputField(this.personTitle);
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
