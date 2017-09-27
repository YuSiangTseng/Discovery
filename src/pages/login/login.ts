import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { MyAccountPage } from '../myAccount/myAccount';
import { Keychain } from '@ionic-native/keychain';
import { registerPage } from '../register/register';
import CryptoJS from 'crypto-js';
import { Keyboard } from '@ionic-native/keyboard';

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


  constructor(public navCtrl: NavController,  public loadingCtrl: LoadingController, private alertCtrl: AlertController, private httpProvider: HttpProvider, private storage: Storage, private keyboard: Keyboard) {
  		//this.tabsElement = document.querySelector('#tabs ion-tabs');
  		//this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
  }

  ionViewDidLoad()
  {
  		console.log("enterPage");
  }
  
  register(email, password, userName, firstName, lastName) {
  	this.getYesData(email, password, userName, firstName, lastName);
  }

  login(email, password) {
    this.loading = this.loadingCtrl.create({
      content: '<ion-spinner ></ion-spinner>'    
    });
    let alert = this.alertCtrl.create({
      title: 'Internet Problems',
      subTitle: 'Please try again',
      buttons: ['Dismiss']
    });
    this.loading.present();
  	this.httpProvider.getJsonDataYes(email, password).subscribe(
	        result => {
            this.loading.dismiss();
	          if(result["success"] == true) {
	          	this.storage.set('login', true);
	     		    var encryptedAES = CryptoJS.AES.encrypt(result["token"], "My Secret Token").toString();
	          	this.storage.set('token', encryptedAES);
	          	this.navCtrl.push(TabsPage)
              console.log(result["token"]);
	          } else {
              alert.present();
	          	this.storage.set('login', false);
	          }
	      	},
          err => {
            this.loading.dismiss();
            alert.present();
          });
  }

  getYesData(email, password, userName, firstName, lastName) {
  		this.httpProvider.registerYes(email, password, userName, firstName, lastName).subscribe(
        result => {
       
          if(result["result"] == true) {
      			this.httpProvider.getJsonDataYes(email, password).subscribe(
		        result => {
		          if(result["success"] == true) {
		          	this.storage.set('login', true);
		          	var encryptedAES = CryptoJS.AES.encrypt(result["token"], "My Secret Token").toString();
		          	this.storage.set('token', encryptedAES);
		          	this.navCtrl.setRoot(MyAccountPage)
		          } else {
		          	this.storage.set('login', false);
		          }
		      	});
          } else {
          		console.log("bad");
          }
  		});

  }

  goToRegisterPage() {
  		this.navCtrl.setRoot(registerPage)
  }

  dismissKeyBoard(event) {
  	if(event.keyCode == 13) {
  		this.keyboard.close();
  	}
  }

}
