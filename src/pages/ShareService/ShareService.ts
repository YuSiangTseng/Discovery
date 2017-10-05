import { Injectable } from '@angular/core';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';
import { Utils } from '../../providers/utils/utils';
import { AlertController } from 'ionic-angular';
import CryptoJS from 'crypto-js';

@Injectable()
export class ShareService {
  public dashboardItemDetail = [];
  index: number;
  itemExisting = false;


  //register user personal detail
  userTitle: String = "";
  userFirstName: String = "";
  userLastName: String = "";
  userBirthday: String = "";
  userEmail: String = "";
  userPassword: String = "";

  //register user work place
  userJobTitle: String = "";
  userKeyStage: String = "";
  userSchoolName: String = "";
  userPostcode: String = "";
  userCountry: String = ""
  userTown: String = ""



  constructor(private httpProvider: HttpProvider, private storage: Storage, private utils: Utils, private alertCtrl: AlertController) {
  		
  }

  errorMessageHandling(errorFromWhichFunction) {
    
    var alert = this.alertCtrl.create({
        title: 'Internet Problem',
        buttons: [{
        text: 'Retry',
        handler: () => {
          if(errorFromWhichFunction == "login") {
            this.loginDiscoveryAccount(this.userEmail, this.userPassword);
          } else if(errorFromWhichFunction == "register") {
            this.registerDiscoveryAccount(this.userEmail, this.userPassword);
          }
          
        }
      }]
    });
    alert.present();
    
  }

  loginDiscoveryAccount(email, password) {
    var encryptedEmail = CryptoJS.AES.encrypt(email, "My Secret Email").toString();
    var encryptedPassword = CryptoJS.AES.encrypt(password, "My Secret Password").toString();
    this.storage.set('email', encryptedEmail);
    this.storage.set('password', encryptedPassword);
    return this.httpProvider.loginDiscoveryAccount(email, password);
  }

  registerDiscoveryAccount(email, password) {
    return this.httpProvider.registerDiscoveryAccount(email, password);
  }

  setData(event, item, eventTag, eventDate, eventMonth, index) {

  	for(var i in this.dashboardItemDetail) {
   		var value = this.dashboardItemDetail[i];
   		if (value.item.itemIndex == index) {
   			this.itemExisting = true;
		  }
  	}
  	if(!this.itemExisting) {
  		this.dashboardItemDetail.push({"item" : item, "tag" : eventTag, "date" : eventDate, "month" : eventMonth, "index" : index });
  	}
  	this.itemExisting = false;
  }
  
  getDashboardItemDetail() {
  	return this.dashboardItemDetail;
  }

}
