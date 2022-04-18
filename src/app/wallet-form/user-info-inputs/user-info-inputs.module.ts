import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { infoFormReducer } from '../../shared/reducers/user-info-inputs.reducer';

@NgModule({
  imports: [StoreModule.forFeature('info', infoFormReducer)],
})
export class userInfoInputModule {}
