import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class SurveyProvider {
  question = "";
  answer_1 = "";
  answer_2 = "";
  answer_3 = "";
  banner;
  resolve;
  ready = new Promise((resolve) => {
    this.resolve = resolve;
  })
  constructor(public http: HttpClient, public storage: Storage) {
    this.storage.get("question").then((question) => {
      if (question) this.question = question;
      this.storage.get("banner").then((banner) => {
        if (banner) this.banner = banner;
      })

      this.storage.get("answer_1").then((answer_1) => {
        if (answer_1) this.answer_1 = answer_1;
      })

      this.storage.get("answer_2").then((answer_2) => {
        if (answer_2) this.answer_2 = answer_2;
      })
      this.storage.get("answer_3").then((answer_3) => {
        if (answer_3) this.answer_3 = answer_3;
        this.resolve();
      })

    })

  }

  save() {
    this.storage.set('question', this.question);
    this.storage.set('answer_1', this.answer_1);
    this.storage.set('answer_2', this.answer_2);
    this.storage.set('answer_3', this.answer_3);
  }

  saveBanner() {
    this.storage.set('banner', this.banner);
  }

  saveVotes(count1, count2, count3) {
    let key = 'answers_' + (new Date().toDateString().substring(0, 11))
    this.storage.set(key, {
      counter1: count1,
      counter2: count2,
      counter3: count3,
    })
  }

  getVotes(date = null): Promise<any> {
    if (date == null) {
      date = new Date();
    }
    let key = 'answers_' + (date.toDateString().substring(0, 11))
    var promise = this.storage.get(key)
    return promise;
  }

  clearVotes(date = null) {
    if (date == null) {
      date = new Date();
    }
    let key = 'answers_' + (date.toDateString().substring(0, 11))
    this.storage.remove(key)
  }


}
