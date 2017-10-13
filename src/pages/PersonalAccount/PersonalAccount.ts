import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { UserDetailPage } from '../PersonalAccount/UserDetail/UserDetail';
import { PersonalFavouriteEventPage } from '../PersonalAccount/PersonalFavouriteEvent/PersonalFavouriteEvent';
import { PersonalWorkPlacePage } from '../PersonalAccount/PersonalWorkPlace/PersonalWorkPlace';
import { UserLoginPage } from '../UserLogin/UserLogin';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'PersonalAccount',
  templateUrl: 'PersonalAccount.html'
})
export class PersonalAccountPage {

  constructor(public navCtrl: NavController, private app: App, private storage: Storage) {

  }


  goToMyAccount() {
  	this.navCtrl.push(UserDetailPage);
  }

  goToMyFavouriteEvent() {
  	this.navCtrl.push(PersonalFavouriteEventPage);
  }

  goToMyWorkPlace() {
    this.navCtrl.push(PersonalWorkPlacePage);
  }

  tempLogout() {
    this.storage.set('login', false);
    this.app.getRootNavs()[0].setRoot(UserLoginPage);
  }
}
