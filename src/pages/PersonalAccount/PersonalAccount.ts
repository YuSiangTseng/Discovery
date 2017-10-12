import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserDetailPage } from '../PersonalAccount/UserDetail/UserDetail';
import { PersonalFavouriteEventPage } from '../PersonalAccount/PersonalFavouriteEvent/PersonalFavouriteEvent';
import { PersonalWorkPlacePage } from '../PersonalAccount/PersonalWorkPlace/PersonalWorkPlace';

@Component({
  selector: 'PersonalAccount',
  templateUrl: 'PersonalAccount.html'
})
export class PersonalAccountPage {

  constructor(public navCtrl: NavController) {

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
}
