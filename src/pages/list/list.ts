import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SurveyProvider } from '../../providers/survey/survey';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  timeout;
  constructor(public navCtrl: NavController, public navParams: NavParams, public survey: SurveyProvider, public toast: ToastController) {
  }

  save() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.survey.save()
    }, 1500)
  }

  selectImage() {
    var filer = document.getElementById('filer')
    filer.click()
  }

  saveImage(event) {
    try {
      var reader: any = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (result) => {
        this.survey.banner = result.target.result;
        this.survey.saveBanner();
      };
    } catch (error) {
      console.error(error)
    }
  }

  clear() {
    this.survey.clearVotes()
    this.toast.create({
      message: "Limpiado",
      duration: 2000
    }).present()
  }
}
