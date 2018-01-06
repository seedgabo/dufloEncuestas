import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SurveyProvider } from '../../providers/survey/survey';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  counter1 = 0;
  counter2 = 0;
  counter3 = 0;
  constructor(public navCtrl: NavController, public survey: SurveyProvider, public alert: AlertController) {
    this.survey.ready.then(() => {
      this.survey.getVotes()
        .then((answers) => {
          if (answers) {
            this.counter1 = answers.counter1
            this.counter2 = answers.counter2
            this.counter3 = answers.counter3
          }
        })
    })
  }


  showThanks(pregunta) {
    var counter;
    if (pregunta == 1) {
      this.counter1 = this.counter1 + 1
      console.info("conteo:" + this.counter1);
    }

    if (pregunta == 2) {
      this.counter2 = this.counter2 + 1
      console.info("conteo:" + this.counter2)
    }
    if (pregunta == 3) {
      this.counter3 = this.counter3 + 1
      console.info("conteo:" + this.counter3)
    }







    let alert = this.alert.create({
      title: 'Gracias por tu opinión',
      subTitle: 'Tu opinión es muy valiosa para nosotros y nos ayuda a dar un mejor servicio!',
      cssClass: "thanks-alert"
      // buttons: ['OK']
    });

    this.survey.saveVotes(this.counter1, this.counter2, this.counter3)
    alert.present();
    setTimeout(() => {
      alert.dismiss()
    }, 3000)
  }

  gotoResults() {
    this.navCtrl.push("ResultsPage", {
      results: {
        result1: this.counter1,
        result2: this.counter2,
        result3: this.counter3,
      }
    });
  }




}
