import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-getInTouch',
  templateUrl: 'getInTouch.html'
})
export class getInTouchPage {
 
  subject = "";
  message = "";
  constructor(public navCtrl: NavController, private keyboard: Keyboard, private platform: Platform, private socialSharing: SocialSharing) {
  }

  sendMessage() {
    if (this.platform.is('cordova')) {
      this.socialSharing.canShareViaEmail().then(() => {
          this.socialSharing.shareViaEmail(this.message, this.subject, ['yusiangtseng@gmail.com']).then(() => {
          }).catch(() => {
                alert("Uh!! Seems like some issues right now, please try later");
              });
          })
    } else {
      console.log("use device");
    }


    // this.emailComposer.isAvailable().then((available: boolean) => {
    //   if(available) {
    //     console.log(available);
    //     //this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    //     this.emailComposer.open({
    //       to: 'yusiangtseng@gmail.com',
    //       cc: null,
    //       bcc: null,
    //       attachments: null,
    //       subject: this.subject,
    //       body: this.message,
    //       isHtml: false
    //     });
    //   }
    // }, 
    // err => {
    //   console.log(err);
    // });
  }

  dismissKeyBoard(event) {
    if(event.keyCode == 13) {
      this.keyboard.close();
    }
  }



}
