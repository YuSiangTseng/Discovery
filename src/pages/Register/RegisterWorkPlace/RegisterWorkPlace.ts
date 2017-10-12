import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
import { HttpProvider } from '../../../providers/HttpProvider/HttpProvider';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../../Tabs/Tabs';
import CryptoJS from 'crypto-js';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';
import { Keyboard } from '@ionic-native/keyboard';
import { RegisterFavouriteEventPage } from '../../Register/RegisterFavouriteEvent/RegisterFavouriteEvent';
import { ShareService } from '../../ShareService/ShareService';
import { UtilsProvider } from '../../../providers/UtilsProvider/UtilsProvider';

@Component({
  selector: 'RegisterWorkPlace',
  templateUrl: 'RegisterWorkPlace.html'
})
export class RegisterWorkPlacePage {

  token = '';
  
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
  constructor(public navCtrl: NavController, private platform: Platform, private utils: UtilsProvider, private alertCtrl: AlertController, private httpProvider: HttpProvider, private storage: Storage, private keyboard: Keyboard, private shareService: ShareService) {
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

  goToRegisterFavouriteEvents() {
    this.shareService.userJobTitle = this.userJobTitle;
    this.shareService.userKeyStage = this.userKeyStage;
    this.shareService.userSchoolName = this.userSchoolName;
    this.shareService.userPostcode = this.userPostcode;
    this.shareService.userCountry = this.userCountry;
    this.shareService.userTown = this.userTown;
    //var personalDetail = [];
    var personalDetail = {"userTitle" : this.shareService.userTitle, "userFirstName" : this.shareService.userFirstName, "userLastName" : this.shareService.userLastName,
    "userBirthday" : this.shareService.userBirthday, "userEmail" : this.shareService.userEmail, "userPassword" : this.shareService.userPassword, 
    "userJobTitle" : this.shareService.userJobTitle, "userKeyStage" : this.shareService.userKeyStage, "userSchoolName" : this.shareService.userSchoolName,
    "userPostcode" : this.shareService.userPostcode, "userCountry" : this.shareService.userCountry, "userTown" : this.shareService.userTown};
    
    this.utils.createSpinnerThenSpin();
    this.httpProvider.registerDiscoveryAccount(personalDetail).subscribe(
        registerResult => {
          //register returns a token but will never be used, if register successfully, use the account to login afterwards
          this.utils.dismissSpinner();
          if(registerResult["token"] != null) {
            this.httpProvider.loginDiscoveryAccount(this.shareService.userEmail, this.shareService.userPassword).subscribe(
              loginResult => {
                if(loginResult["token"] != null) {
                  this.storage.set('login', true);
                  var encryptedToken = CryptoJS.AES.encrypt(loginResult["token"], "My Secret Token").toString();
                  this.storage.set('token', encryptedToken);
                  var alert = this.alertCtrl.create({
                    title: 'Register Successfully',
                    subTitle: 'Please continue to choose your favourite events',
                    buttons: [{
                    text: 'Continue',
                    handler: () => {
                      this.navCtrl.push(RegisterFavouriteEventPage);
                    }}]
                  });
                  alert.present();
                } else {
                  this.utils.gerneralErrorHandle();
                }
              }, err => {
                this.utils.gerneralErrorHandle();
              });
          } else {
            console.log("bad");
            this.utils.gerneralErrorHandle();
          }
      }, err => {
        console.log(err);
        this.utils.dismissSpinner();
        this.utils.gerneralErrorHandle();
      }); 
    

    }

}
