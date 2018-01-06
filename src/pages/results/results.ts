import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// declare var Chart: any;
import Chart from 'chart.js'
import { SurveyProvider } from '../../providers/survey/survey';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results = {
    result1: 0,
    result2: 0,
    result3: 0
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public survey: SurveyProvider) {
    if (this.navParams.get('results')) {
      this.results = this.navParams.get('results');
    } else {
      this.navCtrl.insertPages(0, [{ page: HomePage }]);
    }
  }

  ionViewDidLoad() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          data: [this.results.result1, this.results.result2, this.results.result3],
          label: "# de Votos",
          backgroundColor: ["Red", "Green", "Blue"],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Respuesta 1: ' + this.survey.answer_1,
          'Respuesta 2: ' + this.survey.answer_2,
          'Respuesta 3: ' + this.survey.answer_3,
        ]
      }
    });
  }

}
