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
import { ShareService } from '../ShareService/ShareService';
import { Utils } from '../../providers/utils/utils';

@Component({
  selector: 'page-myWorkPlace',
  templateUrl: 'myWorkPlace.html'
})
export class myWorkPlacePage {


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
  constructor(public navCtrl: NavController, private platform: Platform, private utils: Utils, private httpProvider: HttpProvider, private storage: Storage, private keyboard: Keyboard, private shareService: ShareService) {
      // storage.get('token').then((val) => {
      //  var decryptedBytes = CryptoJS.AES.decrypt(val, "My Secret Token");
      //   var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
     //   this.token = plaintext;
     //   this.getUserDetail(this.token);
     //   this.keyboard.hideKeyboardAccessoryBar(true);
     //  });
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
      case "tickImageForPostcode" :
        if(this.tickImageForPostcode != '') {
        this.tickImageForPostcode = "assets/img/tick.svg";
        } else {
          this.tickImageForPostcode = "";
        }
        break;
      case "tickImageForCountry" :
        if(this.tickImageForCountry != '') {
        this.tickImageForCountry = "assets/img/tick.svg";
        } else {
          this.tickImageForCountry = "";
        }
        break;
      case "tickImageForTown" :
        if(this.tickImageForTown != '') {
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
