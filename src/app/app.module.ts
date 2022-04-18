import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WalletFormComponent } from './wallet-form/wallet-form.component';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { StoreDetailsComponent } from './wallet-form/store-details/store-details.component';
import { infoFormReducer } from './shared/reducers/user-info-inputs.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserInputEffects } from './shared/effects/user-info-inputs.effects';
//import { UserInputEffects } from './shared/effects/user-info-inputs.effects';
@NgModule({
  declarations: [
    AppComponent,
    WalletFormComponent,
    StoreDetailsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //the .forRoot tells our module what makes up our store what is included in its store (we call it ngRx Store)
    StoreModule.forFeature('informationForm' ,infoFormReducer),
    StoreModule.forRoot({ informationForm: infoFormReducer}),
    EffectsModule.forRoot([UserInputEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
