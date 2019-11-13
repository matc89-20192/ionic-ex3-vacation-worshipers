import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  tasks: Array<{ description: string, priority: string }> = [];
  editDescricao: string = "";
  editPrioridade: string = "";

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
  }

  btnRemoveClick() {

  }

  btnAddClick() {
    let priority;
    priority = +this.editPrioridade;

    if(this.editDescricao==="" || this.editPrioridade==="")
    {
      return; 
    }

    if(priority<1 || priority>10 )
    {
      let toast = this.toastCtrl.create({
        message: "A prioridade deve estar entre 1 e 10.",
        duration: 2000
      });
      toast.present();
      return;
    }    

    for (let t of this.tasks) {
      if(t.description === this.editDescricao)
      {
        let toast2 = this.toastCtrl.create({
          message: "Tarefa já cadastrada.",
          duration: 2000
        });
        toast2.present();
        return;
      }
    }

    let task = { description: this.editDescricao, priority: this.editPrioridade};
    this.tasks.push(task);

    this.tasks.sort((obj1, obj2) => {
      if(obj1.priority<obj2.priority)
      {
        return -1;
      }
      return 1;
    });
  }

}
