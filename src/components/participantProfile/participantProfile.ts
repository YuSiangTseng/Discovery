import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'participantProfile',
  templateUrl: 'participantProfile.html',
})
export class participantProfilePage {

  participantDetail: any;
  activityFeed = [];
  //isOverOneDay = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.participantDetail = navParams.get('participantDetail');
    this.parseActivityFeedData();
    
  }

  parseActivityFeedData() {

    if(this.participantDetail.activityFeed != null) {
      for(var activityFeedFollowedIndex in this.participantDetail.activityFeed.followed) {
        this.activityFeed.push({"type" : "followed", "event" : this.participantDetail.activityFeed.followed[activityFeedFollowedIndex].event, "date" : new Date(this.participantDetail.activityFeed.followed[activityFeedFollowedIndex].date).getTime()});
      }
    
      for(var activityFeedFollowedIndex in this.participantDetail.activityFeed.going) {
        this.activityFeed.push({"type" : "going", "event" : this.participantDetail.activityFeed.going[activityFeedFollowedIndex].event, "date" : new Date(this.participantDetail.activityFeed.going[activityFeedFollowedIndex].date).getTime()});
      }
    
      for(var activityFeedFollowedIndex in this.participantDetail.activityFeed.commented) {
        this.activityFeed.push({"type" : "commented", "event" : this.participantDetail.activityFeed.commented[activityFeedFollowedIndex].event, "date" : new Date(this.participantDetail.activityFeed.commented[activityFeedFollowedIndex].date).getTime()});
      }
    }
    
    for(var i = 0; i < this.activityFeed.length; i++) {
      for(var j = 0; j < this.activityFeed.length - 1; j++) {
        if(this.activityFeed[j].date < this.activityFeed[j+1].date) {
          var temp = this.activityFeed[j];
          this.activityFeed[j] = this.activityFeed[j+1];
          this.activityFeed[j+1] = temp;
        }
      }
    
    }
  }

  ionViewDidLoad() {

    for(var index in this.activityFeed) {
      if(document.getElementById("timeDescription" + index) != null) {
          document.getElementById("timeDescription" + index).innerHTML = this.attendedTimeDescription(this.activityFeed[index].date);
      }
    }
  }

  attendedTimeDescription(joinTimestamp) {
    if((new Date().getTime() - joinTimestamp) > 0) {
        var timeDifference = new Date().getTime() - joinTimestamp;
        var hours = Math.floor(timeDifference / (60 * 60 * 1000));
        if(hours > 24) {
          if(Math.floor(hours / 24) == 1) {
            return "yesterday";
          } else {
            return Math.floor(hours / 24) + " days";
          }
        }
        return hours + " hours";
      }
  } 

  attendDescription(type, event) {
    switch(type) {
      case "followed" : 
        return "Started Following ";
      case "going" :
        return "Going to ";
      case "commented" :
        return "Commented on "; 
    }
  }
  


}
