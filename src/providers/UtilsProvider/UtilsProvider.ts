import { LoadingController, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

@Injectable()
export class UtilsProvider {

  loadingSpinner: any;

  constructor(public loadingCtrl: LoadingController, private keyboard: Keyboard, private alertCtrl: AlertController) {
  }

  createSpinnerThenSpin() {
    this.loadingSpinner = this.loadingCtrl.create({
        content: `
          <ion-spinner ></ion-spinner>`
        });
    this.loadingSpinner.present();
  }

  dismissSpinner() {
    if(this.loadingSpinner != null) {
      this.loadingSpinner.dismiss();
    }
  }

  gerneralErrorHandle() {
    let alert = this.alertCtrl.create({
      title: 'Opps there are some Problems',
      subTitle: 'Please try again later',
      buttons: ['OK']
    });

    alert.present();

  }

  
  getMonth(date) {
    switch(date.getMonth()) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
    }
  }

  dismissKeyBoard(event) {
    if(event.keyCode == 13) {
      this.keyboard.close();
    }
  }

}