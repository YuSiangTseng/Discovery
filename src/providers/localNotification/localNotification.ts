import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Badge } from '@ionic-native/badge';

declare var cordova: any;

@Injectable()
export class localNotification {
  
  upcomingEvents: any;

  constructor(private storage: Storage, private localNotifications: LocalNotifications, private badge: Badge) {
  		
  }

  sendLocalNotification(numberOfDaysForNotification) {
      this.storage.get('switchForNotification').then((val) => {
            if(val != null) {
              if(val == true) {
                for (var i = 0; i < this.upcomingEvents.length - 8; i++) {
                  // this.localNotifications.schedule({
                  // id: i + 1,
                  // badge : i + 1,
                  // text: this.upcomingEvents[i].labelKey,
                  // at: new Date(new Date().getTime() + 3600 * numberOfDaysForNotification * i),
                  // });
                  cordova.plugins.notification.local.schedule({
                      id: i + 1,
                      title: "Event Reminder",
                      badge : i + 1,
                      text: this.upcomingEvents[i].labelKey,
                      at: new Date(new Date().getTime() + 3600 * numberOfDaysForNotification * i) // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp // this also could be minutes i.e. 25 (int)
                      
                  });
                }
              }
            } else {
              this.storage.set('switchForNotification', false);
            }
      });

      document.addEventListener('resume', () => {
       this.badge.clear();
      });
  }
 

}
