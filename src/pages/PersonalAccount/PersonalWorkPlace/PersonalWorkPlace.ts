import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, App } from 'ionic-angular';
import { HttpProvider } from '../../../providers/HttpProvider/HttpProvider';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../../Tabs/Tabs';
import { UserLoginPage } from '../../UserLogin/UserLogin';
import { Keychain } from '@ionic-native/keychain';
import CryptoJS from 'crypto-js';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
import { ShareService } from '../../ShareService/ShareService';
import { UtilsProvider } from '../../../providers/UtilsProvider/UtilsProvider';


@Component({
  selector: 'PersonalWorkPlace',
  templateUrl: 'PersonalWorkPlace.html'
})
export class PersonalWorkPlacePage {


  token = '';
  email = '';
  
  userJobTitle = "";
  userKeyStage = "";
  userSchoolName = "";
  userPostcode = "";
  userCountry = "";
  userTown = "";


  type = "password";

  tickImageForJobTitle = '';
  tickImageForKeyStage = '';
  tickImageForSchoolName = '';
  tickImageForPostcode = '';
  tickImageForCountry = '';
  tickImageForTown = '';

  private selected: any = moment();
  private date: any = moment().toISOString();
  private imageSrc = "assets/img/star.png";
  constructor(public navCtrl: NavController, private platform: Platform, private utils: UtilsProvider, private alertCtrl: AlertController, private app: App, private httpProvider: HttpProvider, private storage: Storage, private keyboard: Keyboard, private shareService: ShareService) {
      // this.token = this.shareService.getToken();
      // this.email = this.shareService.getEmail();
      // this.getUserDetail(this.token, this.email);
      storage.get('email').then((val) => {
          var decryptedBytes = CryptoJS.AES.decrypt(val, "My Secret Email");
          var email = decryptedBytes.toString(CryptoJS.enc.Utf8);
          this.email = email;
        });


      storage.get('token').then((val) => {
        var decryptedBytes = CryptoJS.AES.decrypt(val, "My Secret Token");
        var token = decryptedBytes.toString(CryptoJS.enc.Utf8);
        this.token = token;

        this.getUserDetail(this.token, this.email);
        //this.keyboard.hideKeyboardAccessoryBar(true);
      });
  }

  getUserDetail(token, email) {
    this.utils.createSpinnerThenSpin();
     this.httpProvider.getUserDetail(token, email).subscribe(
        result => {
          this.utils.dismissSpinner();
          if(result["member_details"] != null) {
            this.userJobTitle = result["member_details"].jobtitle;
            this.userKeyStage = result["member_details"].keystage;
            this.userSchoolName = result["member_details"].schoolname;
            this.userPostcode = result["member_details"].postcode;
            this.userCountry = result["member_details"].country;
            this.userTown = result["member_details"].town;
          }
          //this.updateTickIconAfterSendRequest();
      }, err => {
          this.errorMessageHandling(err, "getUserDetail");
      });
  }

  errorMessageHandling(error, errorFromWhichFunction) {
    this.utils.dismissSpinner();
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
     }// else {
    //     var alert = this.alertCtrl.create({
    //         title: 'Internet Problem',
    //         buttons: [{
    //         text: 'Retry',
    //         handler: () => {
    //           if(errorFromWhichFunction == "getUserDetail") {
    //             this.getUserDetail(this.token, this.tempEmail);
    //           } else if(errorFromWhichFunction == "updateUserDetail") {
    //             this.updateUserDetailAndPushToTabsPage();
    //           }
              
    //         }
    //       }]
    //     });
    //     alert.present();
    // }
  }


  goToTabsPage() {
    this.navCtrl.setRoot(TabsPage);
  }

  updateTickIcon(field) {
    switch (field) {
      case "userJobTitle" :
        if(this.userJobTitle != '') {
          this.tickImageForJobTitle = "assets/img/tick.svg";
        } else {
          this.tickImageForJobTitle = "";
        }
        break;
      case "userKeyStage" :
        if(this.userKeyStage != '') {
          this.tickImageForKeyStage = "assets/img/tick.svg";
        } else {
          this.tickImageForKeyStage = "";
        }
        break;
      case "userSchoolName" :
        if(this.userSchoolName != '') {
          this.tickImageForSchoolName = "assets/img/tick.svg";
        } else {
          this.tickImageForSchoolName = "";
        }
        break;
      case "userPostcode" :
        if(this.userPostcode != '') {
        this.tickImageForPostcode = "assets/img/tick.svg";
        } else {
          this.tickImageForPostcode = "";
        }
        break;
      case "userCountry" :
        if(this.userCountry != '') {
        this.tickImageForCountry = "assets/img/tick.svg";
        } else {
          this.tickImageForCountry = "";
        }
        break;
      case "userTown" :
        if(this.userTown != '') {
        this.tickImageForTown = "assets/img/tick.svg";
        } else {
          this.tickImageForTown = "";
        }
        break;
          
    } 
  }

  dismissKeyBoard(event) {
    if(event.keyCode == 13) {
      this.keyboard.close();
    }
  }
}
