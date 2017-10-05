import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class HttpProvider {

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

  getJsonData(){
    return this.http.get('https://api.edamam.com/search?q=smoothies&app_id=c1f22483&app_key=945f948f7024a5bc7f1b053cbd21e477&from=0&to=10').map(res => res.json());
  }

  loginDiscoveryAccount(email, password) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post('http://35.177.35.62/api/login', body, null).timeout(4000).map(res => res.json());

    // return this.http.post('http://35.177.35.62/api/login', body, null).timeout(4000).map(response => {
    //     let token = response.json() && response.json().token;
    //     if (token) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }, err => {
    //     return false;
    //   })
  }

  registerDiscoveryAccount(email, password) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post('http://35.177.35.62/api/createMember', body, null).timeout(4000).map(res => res.json());
    // return this.http.post('http://35.177.35.62/api/createMember', body, null).timeout(4000).map(response => {
    //     let token = response.json() && response.json().token;
    //     if (token) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }, err => {
    //     return false;
    //   })
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

}