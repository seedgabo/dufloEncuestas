import { SurveyProvider } from './../../providers/survey/survey';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// declare var Chart: any;
import Chart from 'chart.js'
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
  question = ""
  constructor(public platform:Platform, public navCtrl: NavController, public navParams: NavParams, public survey: SurveyProvider) {
    if (this.navParams.get('results')) {
      this.results = this.navParams.get('results');
    } else {
      this.navCtrl.insertPages(0, [{ page: HomePage }]);
    }
    if (this.navParams.get('question')) {
      this.question = this.navParams.get('question')
    }
    else {
      this.question = this.survey.question
    }

  }

  ionViewDidLoad() {
    var ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: [this.results.result1, this.results.result2, this.results.result3],
          label: "# de Votos",
          backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'],
          borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          '' + this.survey.answer_1,
          '' + this.survey.answer_2,
          '' + this.survey.answer_3,
        ]
      }
    });
  }


  export() {
    var csv = 'Pregunta,' + this.question + '\n';
    csv += this.survey.answer_1 + "," + this.results.result1 + "\n"
    csv += this.survey.answer_2 + "," + this.results.result2 + "\n"
    csv += this.survey.answer_3 + "," + this.results.result3 + "\n"
    // data.forEach(function (row) {
    //   csv += row.join(',');
    //   csv += "\n";
    // });

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    if(platform.is('android'))
       hiddenElement.target = '_system';
    else
      hiddenElement.target = '_blank';
    hiddenElement.download = 'Resultados ' + (new Date()).toDateString() + '.csv';
    hiddenElement.click();
  }

}
