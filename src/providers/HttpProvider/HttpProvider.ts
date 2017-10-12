import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Storage } from '@ionic/storage';
import CryptoJS from 'crypto-js';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class HttpProvider {

  constructor(public http: Http, private storage: Storage) {
    console.log(this.getDummyEvents());
  }

  getDummyEvents() {
    var dummyEvents = [
    {"eventType" : "birthday", "eventImageUrl" : "assets/img/shepherd.jpg", "eventName" : "Day of Discovery", "numberOfParticipants" : "11", "eventDate" : "2017-11-11", 
     "eventStartTime" : "09:00", "eventFinishTime" : "14:30", "eventNameTag" : "dayofdiscovery", "firstEventDescription" : "this is the first description", 
     "secondEventDescription" : "this is the second description", "eventYoutubeLink" : "https://www.youtube.com/embed/Qd2vERHN1lg", "eventWebsiteUrl" : "https://www.minttwist.com/",

     "freeResources" : 
     [
      {"resourceImageUrl" : "assets/img/shepherd.jpg", "resourceOwner" : "Discovery Education", "resourceTitle" : "Hello Test 1", "wayToFindIt" : "Hi Test 1"}, 
      {"resourceImageUrl" : "assets/img/shepherd.jpg", "resourceOwner" : "Discovery Health", "resourceTitle" : "Hello Test 2", "wayToFindIt" : "Hi Test 2"},
      {"resourceImageUrl" : "assets/img/shepherd.jpg", "resourceOwner" : "Discovery Engineering", "resourceTitle" : "Hello Test 3", "wayToFindIt" : "Hi Test 4"}
     ],
     "eventLocationLat" : "51.524657", "eventLocation" : "-0.087164", "eventLocationAddress" : "E106QJ", "eventFacebookPage" : "", "eventTwitterPage" : "",
     
    }];

    return dummyEvents;
  }

  getJsonData(){
    return this.http.get('https://api.edamam.com/search?q=smoothies&app_id=c1f22483&app_key=945f948f7024a5bc7f1b053cbd21e477&from=0&to=10').map(res => res.json());
  }

  loginDiscoveryAccount(email, password) {
    var encryptedEmail = CryptoJS.AES.encrypt(email, "My Secret Email").toString();
    var encryptedPassword = CryptoJS.AES.encrypt(password, "My Secret Password").toString();
    this.storage.set('email', encryptedEmail);
    this.storage.set('password', encryptedPassword);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
    
    return this.http.post('http://35.177.35.62/api/login', body, null).timeout(4000).map(res => res.json());

  }

  registerDiscoveryAccount(personalDetail) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = new FormData();
    body.append('email', personalDetail.userEmail);
    body.append('password', personalDetail.userPassword);
    body.append('title', personalDetail.userTitle);
    body.append('firstname', personalDetail.userFirstName);
    body.append('lastname', personalDetail.userLastName);
    body.append('birthday', personalDetail.userBirthday);
    body.append('jobtitle', personalDetail.userJobTitle);
    body.append('keystage', personalDetail.userKeyStage);
    body.append('schoolname', personalDetail.userSchoolName);
    body.append('postcode', personalDetail.userPostcode);
    body.append('country', personalDetail.userCountry);
    body.append('town', personalDetail.userTown);

    return this.http.post('http://35.177.35.62/api/createMember', body, null).timeout(4000).map(res => res.json());
  }

  getUserDetail(token, email) {
  	let headers = new Headers({ 'Content-Type': 'application/json', 'token' : token });
  	//var options = new RequestOptions({headers: headers});
    let body = new FormData();
    body.append('email', email);
    // body.append('password', password);
    body.append('token', token);
  	return this.http.post('http://35.177.35.62/api/getMemberDetails', body).timeout(4000).map(res => res.json());
  }

  updateUserDetail(token, email, password, title, birthday, name) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'token' : token });
    //var options = new RequestOptions({headers: headers});
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
    body.append('token', token);
    body.append('title', title);
    body.append('date_of_birth', birthday);
    body.append('name', name);
    return this.http.post('http://35.177.35.62/api/updateMemberDetails', body).timeout(4000).map(res => res.json());
  }

  getParticipants() {
    var dummyParticipants = [
    {"imageUrl" : "assets/img/shepherd.jpg", "jobTitle" : "Doctor", "workPlace" : "Leyton", "fullName" : "Shepherd", "joinDate" : "20th Aug 2017", "KeyStage" : "KS1", 
     "activityFeed" : 
      { 
        "followed" : [{"event" : "event1", "date" : "2017-10-01"}, {"event" : "event2", "date" : "2017-09-25"}], 
        "going" : [{"event" : "event3", "date" : "2017-10-06"}, {"event" : "event4", "date" : "2017-10-09"}],
        "commented" : [{"event" : "event5", "date" : "2017-10-10"}, {"event" : "event6", "date" : "2017-09-30"}] 
      },
     "showMyDetail" : true
    },
    

    {"imageUrl" : "assets/img/husky.jpg", "jobTitle" : "Teacher", "workPlace" : "Old Street", "fullName" : "Husky", "joinDate" :  "20th Aug 2017", "KeyStage" : "KS2",
     "activityFeed" : 
      { 
        "followed" : [{"event" : "event2", "date" : "2017-09-30"}], 
        "going" : [{"event" : "event3", "date" : "2017-08-20"}, {"event" : "event4", "date" : "2017-10-09"}]
      },
     "showMyDetail" : true
    },
    {"imageUrl" : "assets/img/yorkshire.jpg", "jobTitle" : "Professor", "workPlace" : "Kensington", "fullName" : "Yorkshire", "joinDate" :  "20th Aug 2017", "KeyStage" : "KS3", "showMyDetail" : false}, 
    {"imageUrl" : "assets/img/pomeranian.jpg", "jobTitle" : "Musician",  "workPlace" : "Holborn", "fullName" : "Pomeranian", "joinDate" :  "20th Aug 2017", "KeyStage" : "KS4", "showMyDetail" : true},
    {"imageUrl" : "assets/img/maltese.jpg", "jobTitle" : "Programmer", "workPlace" : "KingX", "fullName" : "Maltese", "joinDate" :  "20th Aug 2017", "KeyStage" : "KS5", "showMyDetail" : true}
    ];

    return dummyParticipants;

  }

}