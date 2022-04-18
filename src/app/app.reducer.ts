import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromInput from './shared/reducers/user-info-inputs.reducer';

export interface State {
  info: fromInput.AppState;
}

export const getInfoState = createFeatureSelector<fromInput.AppState>('info')

