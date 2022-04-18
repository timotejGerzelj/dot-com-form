import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { userInput } from '../shared/models/userInput.model';
import * as InputsActions from '../shared/actions/user-info-inputs.actions'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { State } from '../shared/reducers/user-info-inputs.reducer';
import { storeModel }from '../shared/models/store.model';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { selectAllFormsInfo } from '../shared/selectors/user-info-inputs.selectors';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css']
})
export class WalletFormComponent implements OnInit {
  //NOT RELATED TO OUR STATE STORE
  stores: Observable<storeModel[]>//subscribaj se na store
  currentStore: any = new storeModel("", "", "");
  formValuesWallet: FormGroup;
  userForm: userInput;
  allFormsFinished: userInput[] = [];
  storeSubscription: Subscription;
  //allForms = this.store.pipe(select(selectFormListInfo))
  allForms$: Observable<any> ;

  constructor(
    private store: Store<any>,
    private db: AngularFirestore) {
   }
  ngOnDestroy(): void{
  }

  ngOnInit(): void {
    //this.allFormsGet$ = this.store.pipe(select(selectFormListInfo));
    //subscribaj se na store
    this.allForms$ = this.store.pipe(select(selectAllFormsInfo));
    console.log(this.allForms$)
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
    this.formValuesWallet = new FormGroup({
      'storeDatabase' : new FormGroup({
        'storeDbName': new FormControl(null),
       'storeDbDate': new FormControl(this.getCurrentDate()),
        'storeDbAddress': new FormControl(null),
        'storeDbPhoneNumber': new FormControl(null)
      }),
     'servedBy': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'btBroadband': new FormControl(null, Validators.required),
      'btTvPackage': new FormControl(null, Validators.required),
      'sportPackage': new FormControl(null, Validators.required),
      'monthlyCharge' : new FormControl(null, Validators.required),
      'upFrontFee' : new FormControl(null, Validators.required),
      'payments': new FormControl(null, Validators.required),
      'handyInfo': new FormControl(null, Validators.maxLength(50))
    })
  }
    //When event is triggered we check the current key pressed to see if it is number if not we dont allow it to be entered
    keyPress(event: KeyboardEvent) {
      const pattern = /[0-9]/;
      const keyboardChar = event.key

      if (!pattern.test(keyboardChar)) {
          event.preventDefault();
      }
    }

    monthlyFee(upFrontFee, monthlyCharge, instalments): number{
      return (parseInt(upFrontFee) + (monthlyCharge * parseInt(instalments)))
    }
    registerUserInput(data) {
      const monthFee = this.monthlyFee(data.upFrontFee, data.monthlyCharge, data.payments)
      console.log(monthFee)
      const newInput: userInput = new userInput(
        data.servedBy,
        data.date,
        data.email,
        data.btBroadband,
        data.btTvPackage,

        monthFee,
        data.handyInfo,
        data.sportPackage,
        /*
        this.storeName = value.storeName;
        this.date = value.date;
        this.servedBy = value.servedBy;
        this.email = value.email;
        this.btBroadband = value.btBroadbrend;
        this.btTvPackage = value.btTvPackage;
        this.sportPackage = value.sportPackage;
        this.totalPayment = value.totalPayment;
        this.otherHandyInfo = value.otherHandyInfo;
        */
      )
      //this.userForm$ = newInput;

        return newInput
    }

    onReset($event) {
      this.currentStore = new storeModel("", "", "");
      this.formValuesWallet.patchValue({  'servedBy': null,
    'email': null,
    'btBroadband': null,
    'btTvPackage': null,
    'sportPackage': null,
    'monthlyCharge':null,
    'upFrontFee' : null,
    'payments':null,
    'handyInfo': null
  })
      }
      //this.formValuesWallet.reset();

    getCurrentDate(): string {
      let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }
    onSubmit(data){
      this.store.dispatch(new InputsActions.requestUpdateFormUserDataStart({status: "pending", form:this.registerUserInput(data)}))
      this.allFormsFinished.push(this.registerUserInput(data))

      this.onReset("event");
    }

}

