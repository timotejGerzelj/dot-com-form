import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { storeModel } from '../../shared/models/store.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {
  storeWalletForm: FormGroup;
  formValid = false;
  stores: Observable<storeModel[]>
  userDataInput: {}
  currentStore = new storeModel("", "", "");
  constructor(private db: AngularFirestore) { }

  ngOnInit(){
      this.stores = this.db
      .collection('STORE')
      .snapshotChanges()
      .pipe(map(docArray => {
       return docArray.map(doc => {
         return {
          storeId : doc.payload.doc.id,
          storeAddress: doc.payload.doc.data()['storeAddress'],
          phoneNumber: doc.payload.doc.data()['phoneNumber'],
         }
        })
      }))
      this.storeWalletForm = new FormGroup({
        'storeDbName': new FormControl(null),
        'storeDbDate': new FormControl(this.getCurrentDate()),
        'storeDbAddress': new FormControl(null),
        'storeDbPhoneNumber': new FormControl(null),
      })
  }

  getCurrentDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }
}
