import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { MyAccountPage } from '../myAccount/myAccount';
import { Keychain } from '@ionic-native/keychain';
import { registerPage } from '../register/register';
import CryptoJS from 'crypto-js';
import { Keyboard } from '@ionic-native/keyboard';
import { Utils } from '../../providers/utils/utils';
import { ShareService } from '../ShareService/ShareService';


declare var cordova: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  email = '';
  password = '';
  userName = '';
  firstName = '';
  lastName = '';

  loginEmail = '';
  loginPassword = '';


  constructor(public navCtrl: NavController, private platform: Platform, private utils: Utils, private shareService: ShareService, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private httpProvider: HttpProvider, private storage: Storage, private keyboard: Keyboard) {
  		//this.tabsElement = document.querySelector('#tabs ion-tabs');
  		//this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
      // //temporary register location notification (need to move to somewhere else if it's necessary) 
    if (this.platform.is('cordova')) {
      cordova.plugins.notification.local.registerPermission(function (granted) {
        this.storage.set('switchForNotification', granted);
      }.bind(this));
    }
  }
  
  login(email, password) {
    this.utils.createSpinnerThenSpin();
  	this.shareService.loginDiscoveryAccount(email, password).subscribe(
	        result => {
            this.utils.dismissSpinner();
            if(result) {
              this.storage.set('login', true);
              var encryptedToken = CryptoJS.AES.encrypt(result["token"], "My Secret Token").toString();
              this.storage.set('token', encryptedToken);
              this.navCtrl.push(TabsPage)
            } else {
              this.utils.gerneralErrorHandle();
              this.storage.set('login', false);
            }
	      	}, err => {
            this.utils.dismissSpinner();
            this.utils.gerneralErrorHandle();
          });
  }

  goToRegisterPage() {
  		this.navCtrl.setRoot(registerPage)
  }

}
