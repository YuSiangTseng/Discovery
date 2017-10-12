import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalNotificationProvider } from '../../../../providers/LocalNotificationProvider/LocalNotificationProvider';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Calendar } from '@ionic-native/calendar';
import { ShareService } from '../../../ShareService/ShareService';

declare var cordova: any;

@Component({
  selector: 'NotificationSettings',
  templateUrl: 'NotificationSettings.html'
})
export class NotificationSettingsPage {

  daysButtonId = "day";
  notificationSwitch: any;
  numberOfDays: any;
  dataForCalendar: any;
  constructor(public navCtrl: NavController, private platform: Platform, private storage: Storage, private localNotification: LocalNotificationProvider, private localNotificationInSettings: LocalNotifications, private calendar: Calendar, private shareService: ShareService) {
  	this.dataForCalendar = shareService.getDashboardItemDetail();
  	this.updatePermissionFromSettings();
  	this.getStorageValue();
  	this.setDefaultFocusForNotificationDays();
  		
  }

  setDefaultFocusForNotificationDays() {
  	this.storage.get('numberOfDaysForNotification').then((val) => {
            if(val != null) {
              this.setPressedColorForButtonsWithId("day" + val)
            } 
      });
  }

  updatePermissionFromSettings() {
  	cordova.plugins.notification.local.hasPermission(function (granted) {
    	this.notificationSwitch = granted;
	}.bind(this));
  }

  getStorageValue() {
  
  	this.storage.get('switchForNotification').then((val) => {
          if(val != null) {
            this.notificationSwitch = val;
          } 
    });


    this.storage.get('numberOfDaysForNotification').then((val) => {
          if(val == null) {
           this.storage.set('numberOfDaysForNotification', 1);
          } 
    });
  }

  setDaysForNotification(numberOfDaysForNotification) {
  	
  	this.storage.set('numberOfDaysForNotification', numberOfDaysForNotification);
  	this.numberOfDays = numberOfDaysForNotification
  	for(var i = 1; i < 9; i++) {
  		var daysButtonId = "day" + i;
  		if(i == numberOfDaysForNotification) {
  			this.setPressedColorForButtonsWithId("day" + i)
  		} else {
  			document.getElementById(daysButtonId).style.backgroundColor = "transparent";
  			document.getElementById(daysButtonId).style.color = "#FFFFFF";
  		}
  	}
  	 this.localNotificationService(numberOfDaysForNotification);
  }

  updateNotificationSwitch() {
  	cordova.plugins.notification.local.hasPermission(function (granted) {
    	if(granted == false) {	
			cordova.plugins.notification.local.registerPermission(function (granted) {
				//need to show alert to ask user to go to setting to turn it on for ios, prompt only once   
	   		});		  	
		}
	});
  	
  	this.storage.set('switchForNotification', this.notificationSwitch);
  	// this.storage.get('numberOfDaysForNotification').then((val) => {
   //        if(val != null) {
   //          this.localNotificationService(val);
   //        } else {
   //        	this.localNotificationService(1);
   //        }
   //  });
  }

  localNotificationService(numberOfDaysForNotification) {
  		this.localNotification.sendLocalNotification(numberOfDaysForNotification);
  }

  setPressedColorForButtonsWithId(daysButtonId) {
  	document.getElementById(daysButtonId).style.backgroundColor = "white";
  	document.getElementById(daysButtonId).style.color = "#202C2B";
  }

  connectToCalendar() {
      this.calendar.requestWritePermission();
      for(var i = 0; i < this.dataForCalendar.length; i++) {
       this.calendar.createEvent("Event " + i , "London", this.dataForCalendar[i].item.labelKey, new Date(2017, 9, this.dataForCalendar[i].date, 10), new Date(2017, 9, this.dataForCalendar[i].date, 15)).then(result => {
          console.log("1 create event success: ", result);
        }).catch(error => {
          console.log("1 create event error: ", error)
        })
      }
  }


}
