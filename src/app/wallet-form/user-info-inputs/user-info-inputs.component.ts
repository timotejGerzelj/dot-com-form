import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userInput } from '../../shared/models/userInput.model';
import * as InputsActions from '../../shared/actions/user-info-inputs.actions'
import * as fromForms from '../../shared/reducers/user-info-inputs.reducer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { State } from '../../shared/reducers/user-info-inputs.reducer';
@Component({
  selector: 'app-user-info-inputs',
  templateUrl: './user-info-inputs.component.html',
  styleUrls: ['./user-info-inputs.component.css']
})
export class UserInfoInputsComponent implements OnInit,  OnDestroy {
  userInputWallet: FormGroup;
  userInfoSubmit: userInput;
  //Must match Store key!!!!!!
  allFormsInfo: Observable<{form: userInput[]}>
  constructor(
    //How we access them all
    private store: Store<State>,
    //allows us to acces our ngrx Store state
    //inside the <> we put the key we made in the app.module reducer forRoot
    //inside the {} we put the state of our reducer thats how we keep track of it and change it! inside the key needs to be called like in the reducer initialState + the type it uses!!!
    //private store: Store<{informationForm: {form: userInput[]}}>,
    private db: AngularFirestore) {
    //Select properties MUST be observables!

   }
  ngOnDestroy():  void{

  }

  ngOnInit(): void {
    //this.allFormsInfo = this.store.select('');
    this.userInputWallet = new FormGroup({

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

    monthlyFee(upFrontFee, monthlyCharge, instalments){
      return upFrontFee + (monthlyCharge * parseInt(instalments))
    }
    registerUserInput(data) {
      const monthFee = this.monthlyFee(data.upFrontFee, data.monthlyCharge, data.payments)
      console.log(monthFee)
      const newInput: userInput = new userInput(
        data.servedBy,
        data.email,
        data.btBroadband,
        data.btTvPackage,
        data.sportPackage,
        monthFee, data.handyInfo, getCurrentDate()
      )
        return newInput
    }

    addDataToDatabase(data){
      this.db.collection('OBRAZEC').add(JSON.parse(JSON.stringify(data)))
    }

    //On submit we will build our Json object and call monthly fee to calculate our values and submit to firebase
    onSubmit(data){

        const newInput = this.registerUserInput(data)
        console.log(newInput)
        //CALL THE ACTION NOT THE REDUCER
        //The reducer handles the action with dispacth method
       this.store.dispatch(new InputsActions.formInfoInsertStart(newInput))
      //this.addDataToDatabase(newInput);
      //this.store.dispatch(new Inputs.getFormInfo(newInput))
      //this.store.dispatch(new UserInfoSubmitActions(this.createNewUserInfo()))
    }

}
function getCurrentDate(): string {
  let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

