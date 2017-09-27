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

  constructor(public platform: Platform ,public navCtrl: NavController, private storage: Storage, public calendarCtrl: CalendarController) {
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

  @ViewChild('datePicker') datePicker;

  dateChanged(date) {
  		const { day, month, year } = date;
  		//this.selected.year(year.value).month(month.text).date(day.value);
  		this.birthday  =   date.day + '/' + date.month + '/' +  date.year;
  };	

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
