import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { notificationSettingsPage } from '../notificationSettings/notificationSettings';
import { howItWorksPage } from '../howItWorks/howItWorks';
import { getInTouchPage } from '../getInTouch/getInTouch';
import { frequentlyAskedQuestionsPage } from '../frequentlyAskedQuestions/frequentlyAskedQuestions';
import { aboutHighlightPage } from '../aboutHighlight/aboutHighlight';
import { termsAndConditionsPage } from '../termsAndConditions/termsAndConditions';
import { MyAccountPage } from '../myAccount/myAccount';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class settingsPage {

  constructor(public navCtrl: NavController) {

  }

  goToNotificationSettings() {
  	this.navCtrl.push(notificationSettingsPage);
  }

  goToHowItWorks() {
  	this.navCtrl.push(howItWorksPage);
  }

  goToGetInTouch() {
  	this.navCtrl.push(getInTouchPage);
  }

  goToFrequentlyAskedQuestions() {
    this.navCtrl.push(frequentlyAskedQuestionsPage);
  }

  goToAboutHighlight() {
    this.navCtrl.push(aboutHighlightPage);
  }

  goToTermsAndConditions() {
    this.navCtrl.push(termsAndConditionsPage);
  }

  goToMyAccountPage() {
    this.navCtrl.push(MyAccountPage);
  }
}
