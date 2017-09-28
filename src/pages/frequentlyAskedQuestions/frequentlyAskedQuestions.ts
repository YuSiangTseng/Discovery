import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-frequentlyAskedQuestions',
  templateUrl: 'frequentlyAskedQuestions.html'
})
export class frequentlyAskedQuestionsPage {

  constructor(public navCtrl: NavController, private keyboard: Keyboard, private platform: Platform, private socialSharing: SocialSharing) {
  }

  showAnswer(id) {
    var answer = document.getElementById("answer" + id);
    var question = document.getElementById("question" + id);
    var image = document.getElementById("imageForbutton" + id);
    var clicked =  image.getAttribute('src') == 'assets/img/ui-24px-glyph-1_simple-add.svg'? true : false; 
    
    if(clicked) {
      answer.style.color = "#FFEA2C";
      question.style.color = "#FFEA2C"
      image.setAttribute('src', 'assets/img/ui-24px-glyph-1_simple-delete.svg');
    } else {
      answer.style.color = "#FFEA2C";
      question.style.color = "#DE577B"
      image.setAttribute('src', 'assets/img/ui-24px-glyph-1_simple-add.svg');
    }

   switch(id) {
      case "1": 
        if(clicked) {
            answer.innerHTML = "This is for testing1, this is for testing1, this is for testing1;" 
        } else {
            answer.innerHTML = "";
        }
        break;
      case "2": 
        if(clicked) {
            answer.innerHTML = "This is for testing2, this is for testing2, this is for testing2;" 
        } else {
            answer.innerHTML = "";
        }
        break;
      case "3": 
        if(clicked) {
            answer.innerHTML = "This is for testing3, this is for testing3, this is for testing3;" 
        } else {
            answer.innerHTML = "";
        }
        break;
      case "4": 
        if(clicked) {
            answer.innerHTML = "This is for testing4, this is for testing4, this is for testing4;" 
        } else {
            answer.innerHTML = "";
        }
        break;

   }
   
      
    
  
  }





}
