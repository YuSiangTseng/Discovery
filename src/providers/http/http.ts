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

  registerDiscoveryAccount(email, password) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);

    return this.http.post('http://35.177.35.62/api/createMember', body, null).timeout(4000).map(res => res.json());
  }

  getUserDetail(token, email, password) {
  	let headers = new Headers({ 'Content-Type': 'application/json', 'token' : token });
  	//var options = new RequestOptions({headers: headers});
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
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