import {createFeatureSelector, createSelector} from '@ngrx/store';
import { AppState } from '../app.state';

import { userInput } from '../models/userInput.model';
import  {State} from '../reducers/user-info-inputs.reducer';
//binds our current state to the constant


const formsInfoFeature = createFeatureSelector('informationForm');
export const selectAllFormsInfo = createSelector(
  formsInfoFeature,
  (state: State) => state.allForms
  );

