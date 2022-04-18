import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError,of, withLatestFrom, from, Observable, mergeMap,map, EMPTY, switchMap } from 'rxjs';
import * as formActions from '../actions/user-info-inputs.actions'
import { Action, Store } from '@ngrx/store';
import { userDataService } from '../service/user-info-inputs.service';
import { userInput } from '../models/userInput.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FORM_UPDATE_DATA_REQUEST_PENDING } from '../actions/user-info-inputs.actions';

@Injectable()
export class UserInputEffects {
  //UserInputEffects listens for all of our dispatches

saveInput$= createEffect(
  () => this.actions$.pipe(
        //checks if the action is correct
        ofType(FORM_UPDATE_DATA_REQUEST_PENDING),
        switchMap(
          (action: any) => {debugger; return this.userDataService.saveToFirebase(action.payload.form)}),
        map(form =>{
          debugger
         return new formActions.requestUpdateFormUserDataSuccess({status: 'success'})}),
          catchError( err => of(err))
        ));
  constructor(
    private actions$: Actions,
    private userDataService: userDataService,
    //private store: Store<AppState>,
    ) {
    }
}


