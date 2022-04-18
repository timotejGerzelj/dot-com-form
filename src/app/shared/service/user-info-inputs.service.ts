import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from "@ngrx/store";
import { from, map, Observable, of, pipe, tap } from "rxjs";
import { userInput } from "../models/userInput.model";

@Injectable({providedIn: 'root'})
export class userDataService {
  private formStorageInitialised = false;

  constructor(private db: AngularFirestore){}
  //we will receive values from Effect to store inside of our service
  saveToFirebase(formData: userInput) {
    //debugger;
    console.log(" Huh? why*")
    const result = this.db.collection('OBRAZEC').add(JSON.parse(JSON.stringify(formData))
      )
    console.log(result + " Huh?")
    //save to firebasež
    //const formResp = collect.valueChanges().pi
    const giveBack = result.then(documentReference => {
      console.log(`Added document with name:`);
      console.log(documentReference);
  });
   /* const result = this.db.collection('OBRAZEC').snapshotChanges()
                    .pipe(tap((result: any) => console.log(result)));*/
    //const result =  this.db.collection('OBRAZEC').add(JSON.parse(JSON.stringify(formData)))
    //const valueChanged = this.db.collection.valueChanges()
    return of(giveBack)
  }
}
