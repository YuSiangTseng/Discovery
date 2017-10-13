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
  password = '';
  
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
      
      this.shareService.getEmail().then((val) => {
          if(val != null || val != "") {
            this.email = val;
            this.shareService.getToken().then((val) => {
              if(val != null || val != "") {
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
          }
      }).catch(error=>{
          //handle error
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
          this.updateTickIconAfterSendRequest();
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
     } else {
        var alert = this.alertCtrl.create({
            title: 'Internet Problem',
            buttons: [{
            text: 'Retry',
            handler: () => {
              if(errorFromWhichFunction == "getUserDetail") {
                this.getUserDetail(this.token, this.email);
              } else if(errorFromWhichFunction == "updateUserDetail") {
                this.updateUserDetailAndPushToTabsPage();
              }
              
            }
          }]
        });
        alert.present();
    }
  }

  updateUserDetailAndPushToTabsPage() {

    this.utils.createSpinnerThenSpin();
    this.httpProvider.updateUserWorkPlace(this.token, this.userJobTitle, this.userKeyStage, this.userSchoolName, this.userPostcode, this.userCountry, this.userTown, this.email, this.password).subscribe(
        result => {
          this.utils.dismissSpinner();
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


  goToTabsPage() {
    this.navCtrl.setRoot(TabsPage);
  }

  updateTickIconAfterSendRequest() {
    this.tickImageForJobTitle = this.utils.updateTickIconForInputField(this.userJobTitle);
    this.tickImageForKeyStage = this.utils.updateTickIconForInputField(this.userKeyStage);
    this.tickImageForSchoolName = this.utils.updateTickIconForInputField(this.userSchoolName);
    this.tickImageForPostcode = this.utils.updateTickIconForInputField(this.userPostcode);
    this.tickImageForCountry = this.utils.updateTickIconForInputField(this.userCountry);
    this.tickImageForTown = this.utils.updateTickIconForInputField(this.userTown);

  }

  updateTickIcon(field) {
    switch (field) {
      case "userJobTitle" :
        this.tickImageForJobTitle = this.utils.updateTickIconForInputField(this.userJobTitle);
        break;
      case "userKeyStage" :
        this.tickImageForKeyStage = this.utils.updateTickIconForInputField(this.userKeyStage);
        break;
      case "userSchoolName" :
        this.tickImageForSchoolName = this.utils.updateTickIconForInputField(this.userSchoolName);
        break;
      case "userPostcode" :
        this.tickImageForPostcode = this.utils.updateTickIconForInputField(this.userPostcode);
        break;
      case "userCountry" :
        this.tickImageForCountry = this.utils.updateTickIconForInputField(this.userCountry);
        break;
      case "userTown" :
        this.tickImageForTown = this.utils.updateTickIconForInputField(this.userTown);
        break;
          
    } 
  }

  dismissKeyBoard(event) {
    if(event.keyCode == 13) {
      this.keyboard.close();
    }
  }
}
