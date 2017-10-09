import { Injectable } from '@angular/core';
import { HttpProvider } from '../../providers/http/http';
import { Storage } from '@ionic/storage';
import { Utils } from '../../providers/utils/utils';
import { AlertController } from 'ionic-angular';
import CryptoJS from 'crypto-js';

//injectable lets this class able to be shared by different components, every component uses the same instance of this class injected, 
//which means it will only have one instance of this class
//in every component, there is no need to construct the object with different parameters since DI does it automatically for us.
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
