import { Injectable } from '@angular/core';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';
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



  constructor(private httpProvider: HttpProvider, private storage: Storage) {
  		
  }

  registerDiscoveryAccount(email, password) {
    this.httpProvider.registerDiscoveryAccount(email, password).subscribe(
        result => {
       
          if(result["token"] != null) {
            this.httpProvider.loginDiscoveryAccount(email, password).subscribe(
            result => {
              if(result["token"] != null) {
                this.storage.set('login', true);
                var encryptedToken = CryptoJS.AES.encrypt(result["token"], "My Secret Token").toString();
                var encryptedEmail = CryptoJS.AES.encrypt(email, "My Secret Email").toString();
                var encryptedPassword = CryptoJS.AES.encrypt(password, "My Secret Password").toString();
                this.storage.set('token', encryptedToken);
                this.storage.set('email', encryptedEmail);
                this.storage.set('password', encryptedPassword);
              } else {
                this.storage.set('login', false);
              }
            });
          } else {
              console.log("bad");
          }
      });
  }

  // registerPersonalDetail(email, password, userName, firstName, lastName) {
  //   this.getYesData(email, password, userName, firstName, lastName);
  // }

  // getYesData(email, password, userName, firstName, lastName) {
  //     this.httpProvider.registerYes(email, password, userName, firstName, lastName).subscribe(
  //       result => {
       
  //         if(result["result"] == true) {
  //           this.httpProvider.getJsonDataYes(email, password).subscribe(
  //           result => {
  //             if(result["success"] == true) {
  //               this.storage.set('login', true);
  //               var encryptedAES = CryptoJS.AES.encrypt(result["token"], "My Secret Token").toString();
  //               this.storage.set('token', encryptedAES);
  //               console.log("token saved");
  //             } else {
  //               this.storage.set('login', false);
  //             }
  //           });
  //         } else {
  //             console.log("bad");
  //         }
  //     });

  // }

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
