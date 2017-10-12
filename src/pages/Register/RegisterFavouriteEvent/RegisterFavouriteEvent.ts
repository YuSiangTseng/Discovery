import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../../Tabs/Tabs';
import { Platform } from 'ionic-angular';
import { CalendarController } from "ion2-calendar/dist";
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';

@Component({
  selector: 'RegisterFavouriteEvent',
  templateUrl: 'RegisterFavouriteEvent.html',
})
export class RegisterFavouriteEventPage {
	
  private selected: any = moment();
  private date: any = moment().toISOString();

  private dummyDataToShowWithImgUrl = [];

  constructor(public platform: Platform ,public navCtrl: NavController, private storage: Storage, public calendarCtrl: CalendarController) {
  	
  	this.getEventsFromServer();

  	

  }

  getEventsFromServer() {
  	  var dummyDataFromServer = [{"eventType" : "BIRTHDAYS", "eventAmount" : "5"}, {"eventType" : "CONFERENCES", "eventAmount" : "7"}, {"eventType" : "MEETINGS", "eventAmount" : "25"}, {"eventType" : "SEMINARS", "eventAmount" : "9"}];
  	  for(var item in dummyDataFromServer) {
  	  	var dataInformation = dummyDataFromServer[item];
  	  	switch(dataInformation.eventType) {
  	  		case "BIRTHDAYS" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventType" : dataInformation.eventType, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/BIRTHDAYS.svg"});
  	  		break;
  	  		case "CONFERENCES" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventType" : dataInformation.eventType, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/CONFERENCES.svg"});
  	  		break;
  	  		case "MEETINGS" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventType" : dataInformation.eventType, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/MEETINGS.svg"});
  	  		break;
  	  		case "SEMINARS" :
  	  		this.dummyDataToShowWithImgUrl.push({"eventType" : dataInformation.eventType, "eventAmount" : dataInformation.eventAmount, "eventImageUrl" : "assets/img/SEMINARS.svg"});
  	  		break;
  	  	}
  	  }
  }

  addOrDeleteFavourite(id, event) {

  	var image = document.getElementById(id);
  	var eventType = document.getElementById("eventType" + id);
  	var thumbnail = document.getElementById("thumbnail" + id);
  	var eventIcon = document.getElementById("eventIcon" + id);
    var clicked =  image.getAttribute('src') == 'assets/img/addForFavouriteEvents.svg'? true : false; 

    if(clicked) { 
      image.setAttribute('src', 'assets/img/deleteForFavouriteEvents.svg');
      eventIcon.setAttribute('src', 'assets/img/' + event + "-TRANSPARENT.svg");
      eventType.style.color = "#FFFFFF";
      thumbnail.classList.remove('gradientColor');
      thumbnail.classList.add('whiteBackground');
    } else {
      image.setAttribute('src', 'assets/img/addForFavouriteEvents.svg');
      eventIcon.setAttribute('src', 'assets/img/' + event + ".svg" );
      eventType.style.color = "#24DE8A";
      thumbnail.classList.remove('whiteBackground');
      thumbnail.classList.add('gradientColor');
    }
  }


  goToTabsPage() {
  	this.navCtrl.setRoot(TabsPage);
  }
  	
}
