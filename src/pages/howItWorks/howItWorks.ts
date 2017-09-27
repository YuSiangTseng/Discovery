import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'page-howItWorks',
  templateUrl: 'howItWorks.html'
})
export class howItWorksPage {
  @ViewChild(Slides) slides: Slides;
  startIndex = 2;

  constructor(public navCtrl: NavController, private platform: Platform) {
  	this.platform.ready().then((readySource) => {
    });
  }

  moveToPrevious() {
  	var index = this.slides.getActiveIndex() - 1;
  	var currentIndex = this.slides.getActiveIndex();
  	if(index > -1) {
  		var currentButtonId = "button" + currentIndex;
  		document.getElementById(currentButtonId).style.backgroundColor = "#FFFFFF";
  		document.getElementById(currentButtonId).style.width = "9vw";
  		var previousButtonId = "button" + index;
  		document.getElementById(previousButtonId).style.backgroundColor = "#FFEA2C";
  		document.getElementById(previousButtonId).style.width = "11vw";
  		// this.startIndex = index;
  		// this.slides.slideTo(index);
  		this.slides.slidePrev(200);
  	}
  }

  moveToNext() {
  	var index = this.slides.getActiveIndex() + 1;
  	var currentIndex = this.slides.getActiveIndex();
  	if(index < 5) {
  		var currentButtonId = "button" + currentIndex;
  		document.getElementById(currentButtonId).style.backgroundColor = "#FFFFFF";
  		document.getElementById(currentButtonId).style.width = "5vw";
  		var nextButtonId = "button" + index;
  		document.getElementById(nextButtonId).style.backgroundColor = "#FFEA2C";
  		document.getElementById(nextButtonId).style.width = "9vw";
  		// this.startIndex = index;
  		// this.slides.slideTo(index);
  		this.slides.slideNext(200);
  	}
  }

  updatePagerNextButtonStyle() {
  	var currentButtonId = "button" + this.slides.getActiveIndex();
  	document.getElementById(currentButtonId).style.backgroundColor = "#FFEA2C";
  	document.getElementById(currentButtonId).style.width = "9vw";

  	var chosenIndexBeforeSwipeButtonId = "button" + (this.slides.getActiveIndex() - 1);
  	document.getElementById(chosenIndexBeforeSwipeButtonId).style.backgroundColor = "#FFFFFF";
  	document.getElementById(chosenIndexBeforeSwipeButtonId).style.width = "5vw";

  }

  updatePagerPreviousButtonStyle() {
  	var currentButtonId = "button" + this.slides.getActiveIndex();
  	document.getElementById(currentButtonId).style.backgroundColor = "#FFEA2C";
  	document.getElementById(currentButtonId).style.width = "9vw";

  	var chosenIndexBeforeSwipeButtonId = "button" + (this.slides.getActiveIndex() + 1);
  	document.getElementById(chosenIndexBeforeSwipeButtonId).style.backgroundColor = "#FFFFFF";
  	document.getElementById(chosenIndexBeforeSwipeButtonId).style.width = "5vw";
  }

  updateDescription() {
  	var currentIndex = this.slides.getActiveIndex();
  	var description = document.getElementById("howItWorksDescription");
  	switch(currentIndex) {
  		case 0: 
  		description.innerHTML = "This is the text for slide 0, This is the text for slide 0, This is the text for slide 0, This is the text for slide 0, This is the text for slide 0";
  		break;
  		case 1: 
  		description.innerHTML = "This is the text for slide 1, This is the text for slide 1, This is the text for slide 1, This is the text for slide 1, This is the text for slide 1";
  		break;
  		case 2: 
  		description.innerHTML = "This is the text for slide 2, This is the text for slide 2, This is the text for slide 2, This is the text for slide 2, This is the text for slide 2";
  		break;
  		case 3: 
  		description.innerHTML = "This is the text for slide 3, This is the text for slide 3, This is the text for slide 3, This is the text for slide 3, This is the text for slide 3";
  		break;
  		case 4: 
  		description.innerHTML = "This is the text for slide 4, This is the text for slide 4, This is the text for slide 4, This is the text for slide 4, This is the text for slide 4";
  		break;

  	}


  }

}
