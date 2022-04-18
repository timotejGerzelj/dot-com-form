import { Action, createAction, props  } from "@ngrx/store";
import { userInput } from "../models/userInput.model";

export const  FORM_UPDATE_DATA_REQUEST_PENDING = '[info] Pending!';
export const  UPDATE_DATA_SUCCESS = '[info] Succes!';
export const UPDATE_DATA_REQUEST_ERROR = '[info] Failure!';

export class requestUpdateFormUserDataStart implements Action {
  readonly type: string =  FORM_UPDATE_DATA_REQUEST_PENDING;
  //so we can add more
  constructor(
  public payload: {status: string, form: userInput}
  ){}
}//GET
export class requestUpdateFormUserDataSuccess implements Action {
  readonly type: string = UPDATE_DATA_SUCCESS;
  constructor(
    //@ts-ignore
    public payload: {status: 'success'}
  ){}
}
export class requestUpdateFormUserDataError implements Action {
  readonly type: string = UPDATE_DATA_REQUEST_ERROR;
  constructor(
    public payload: {status: 'failure'}
  ){}

}

export type ActionUnion =  requestUpdateFormUserDataStart |
                          requestUpdateFormUserDataSuccess |
                          requestUpdateFormUserDataError
