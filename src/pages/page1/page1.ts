import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  listView: Array<{ description: string, priority: string }> = [];
  editDescricao: string = "";
  editPrioridade: string = "";
  isDisabled: boolean = true;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
  }

  btnRemoveClick() {
    this.listView.shift();
    if(this.listView.length===0)
    {
      this.isDisabled=true;
    }
  }

  itemTapped(event, task) {
    let index = 0;
    for(let t of this.listView) {
      if(t===task)
      {
        break;
      }
      index++;
    }
    this.listView.splice(index,1);
    if(this.listView.length===0)
    {
      this.isDisabled=true;
    }
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

    for (let t of this.listView) {
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

    let task = { description: this.editDescricao, priority: "Prioridade: "+this.editPrioridade};
    this.listView.push(task);
    this.editPrioridade="";
    this.editDescricao="";
    if(this.isDisabled===true)
    {
      this.isDisabled=false;
    }
    this.listView.sort((obj1, obj2) => {
      if(obj1.priority<obj2.priority)
      {
        return -1;
      }
      return 1;
    });
  }

}
