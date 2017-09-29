import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';
import { CalendarController } from "ion2-calendar/dist";
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';

@Component({
  selector: 'page-registerFavouriteEvent',
  templateUrl: 'registerFavouriteEvent.html',
})
export class registerFavouriteEventPage {
	
  imageSourceMango = 'assets/img/plus.png';
  imageSourceGreen = 'assets/img/plus.png';
  addFavouriteEventCount = 0;
  birthday;
  private selected: any = moment();
  private date: any = moment().toISOString();

  private dummyDataToShowWithImgUrl = [];

  constructor(public platform: Platform ,public navCtrl: NavController, private storage: Storage, public calendarCtrl: CalendarController) {
  	
  	this.getEventsFromServer();

  	this.storage.get('addFavouriteEventCount').then((addFavouriteEventCount) => {


  	if(addFavouriteEventCount != null) {
	  	if(addFavouriteEventCount % 2 == 1) {
		  		this.imageSourceMango = 'assets/img/minus.png';
		} else {
		
		  		this.imageSourceMango = 'assets/img/plus.png';
		}  	
  	} else {
  		this.storage.set('addFavouriteEventCount', 0);
  	}
  	});
  	this.storage.get('addFavouriteEventCountGreen').then((addFavouriteEventCountGreen) => {
  	if(addFavouriteEventCountGreen != null) {
	  	if(addFavouriteEventCountGreen % 2 == 1) {
		  		this.imageSourceGreen = 'assets/img/minus.png';
		} else {
		
		  		this.imageSourceGreen = 'assets/img/plus.png';
		}  	
  	} else {
  		this.storage.set('addFavouriteEventCountGreen', 0);
  	}
  	});

  }

  getEventsFromServer() {
  	  var dummyDataFromServer = [{"eventName" : "BIRTHDAYS", "eventAmount" : "5"}, {"eventName" : "CONFERENCES", "eventAmount" : "7"}, {"eventName" : "MEETINGS", "eventAmount" : "25"}, {"eventName" : "SEMINARS", "eventAmount" : "9"}];
  	  for(var item in dummyDataFromServer) {
  	  	var dataInformation = dummyDataFromServer[item];
  	  	switch(dataInformation.eventName) {
  	  		case "BIRTHDAYS" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventName" : dataInformation.eventName, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/BIRTHDAYS.svg"});
  	  		break;
  	  		case "CONFERENCES" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventName" : dataInformation.eventName, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/CONFERENCES.svg"});
  	  		break;
  	  		case "MEETINGS" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventName" : dataInformation.eventName, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/MEETINGS.svg"});
  	  		break;
  	  		case "SEMINARS" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventName" : dataInformation.eventName, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/SEMINARS.svg"});
  	  		break;
  	  	}
  	  }
  }

  addOrDeleteFavourite(id, event) {
  	var image = document.getElementById(id);
  	var eventName = document.getElementById("eventName" + id);
  	var thumbnail = document.getElementById("thumbnail" + id);
  	var eventIcon = document.getElementById("eventIcon" + id);
    var clicked =  image.getAttribute('src') == 'assets/img/addForFavouriteEvents.svg'? true : false; 

    if(clicked) { 
      image.setAttribute('src', 'assets/img/deleteForFavouriteEvents.svg');
      eventIcon.setAttribute('src', 'assets/img/' + event + "-TRANSPARENT.svg" );
      eventIcon.classList.add('gradientColorForImageTopToBottom');
      eventName.style.color = "#FFFFFF";
      thumbnail.classList.remove('gradientColor');
      thumbnail.classList.add('whiteBackground');
    } else {
      image.setAttribute('src', 'assets/img/addForFavouriteEvents.svg');
      eventIcon.setAttribute('src', 'assets/img/' + event + ".svg" );
      eventIcon.classList.remove('gradientColorForImageTopToBottom');
      eventName.style.color = "#24DE8A";
      thumbnail.classList.remove('whiteBackground');
      thumbnail.classList.add('gradientColor');
    }
  }

  

  addFavouriteEvent(Event) {
	  if(Event == 'Mango') {
	  	this.storage.get('addFavouriteEventCount').then((addFavouriteEventCount) => {
	  		this.storage.set('addFavouriteEventCount', addFavouriteEventCount + 1);
	  		this.storage.get('addFavouriteEventCount').then((addFavouriteEventCount) => {
	  		if(addFavouriteEventCount % 2 == 1) {
	  			this.storage.set('mango', 'Mango');
	  			this.imageSourceMango = 'assets/img/minus.png';
	  		} else {
	  			this.storage.remove('mango');
	  			console.log("wwwww");
	  			this.imageSourceMango = 'assets/img/plus.png';
	  		}
	  		});
	  	});
	  } else {
	  	this.storage.get('addFavouriteEventCountGreen').then((addFavouriteEventCountGreen) => {
	  		this.storage.set('addFavouriteEventCountGreen', addFavouriteEventCountGreen + 1);
	  		this.storage.get('addFavouriteEventCountGreen').then((addFavouriteEventCountGreen) => {
	  		if(addFavouriteEventCountGreen % 2 == 1) {
	  			this.storage.set('green', 'Green');
	  			this.imageSourceGreen = 'assets/img/minus.png';
	  		} else {
	  			this.storage.remove('green');
	  			console.log("yyy");
	  			this.imageSourceGreen = 'assets/img/plus.png';
	  		}
	  		});
	  	});
	  }
  	
  }

  goToTabsPage() {
  	this.navCtrl.setRoot(TabsPage);
  }
  	
}
