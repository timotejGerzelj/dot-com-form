import { Action, createFeatureSelector, createSelector, on } from "@ngrx/store";
import * as userFormActions from '../actions/user-info-inputs.actions';
import { userInput } from "../models/userInput.model";
//keeps track of the state of the whole application
//Allows our footrprints to not be constantly updated, meaning we can only select one attribute to edits
//Describes this reducers local state
export interface State {
  readonly allForms: userInput[];
  readonly form: userInput
  readonly status: "pending"| "success" | "error" | "idle"
}

//Means the interface applies to this initialState
const initialState: State = {
    allForms: [],
    form: new userInput("", "date" ,"2011-09-29", "", "", 0, "", ""),
    status: "idle"
}

export function infoFormReducer(state: State = initialState , action: userFormActions.ActionUnion) {
  switch (action.type) {
    case userFormActions.FORM_UPDATE_DATA_REQUEST_PENDING:
      return {...state, status: action.payload.status};
      break
    case userFormActions.UPDATE_DATA_SUCCESS:
      console.log("I have succeded")
      return {...state, status: action.payload.status, allForms: [state.form, ...state.allForms]}
      break
    case userFormActions.UPDATE_DATA_REQUEST_ERROR:
      return {...state, status: action.payload.status}
    default:
        return state
        break
      }
    }
    const formsInfoFeature = createFeatureSelector<userInput[]>('FormsInfo');
    export const allFormsInfo = createSelector(formsInfoFeature, (state: userInput[]) => state);
