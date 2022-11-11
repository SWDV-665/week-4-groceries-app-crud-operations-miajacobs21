import { Component, IterableDiffers } from '@angular/core';
import { NavController, ToastController, AlertController, IonItem } from '@ionic/angular';
 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Grocery";

  items = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Bread",
      quantity: 1
    },
    {
      name: "Banana",
      quantity: 3
    },
    {
      name: "Sugar",
      quantity: 1
    },
  ]


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private alertController: AlertController) {}


// different from video - found answer here - https://forum.ionicframework.com/t/toast-present-is-not-a-function/155889
  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message:`Removing Item: ` + item.name + "...",
      duration: 3000
    });
    toast.present();
    

    this.items.splice(index, 1);
  }

  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message:`Editing Item: ` + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.showEditItemPrompt(item, index);
  }

  async showEditItemPrompt(item, index) {
    console.log("Edit Item... ");
    const alert = await this.alertController.create({
      header: 'Please Edit Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity,
          attributes: {
            maxlength: 4,
          },
          
        },
      ],
      buttons: [
        {
          text:'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        }, 
        {
          text:'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items[index] = item;
          }
        }
      ]
    });
  
    await alert.present();
  }




  addItem() {
    console.log("Adding Item");
    this.presentAlert();
  }

// code from https://ionicframework.com/docs/api/alert
  async presentAlert() {
    console.log("Adding Item... ");
    const alert = await this.alertController.create({
      header: 'Add Grocery Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          attributes: {
            maxlength: 4,
          },
        },
      ],
      buttons: [
        {
          text:'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        }, 
        {
          text:'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items.push(item);
          }
        }
      ]
    });

    await alert.present();
  }
}


