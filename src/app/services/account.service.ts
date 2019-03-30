import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Account } from "../models/Accounts";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountsCollection: AngularFirestoreCollection<Account>;
  accountDoc: AngularFirestoreDocument<Account>
  accounts: Observable<Account[]>
  account: Observable<Account>

  constructor(private afs: AngularFirestore) { 
    this.accountsCollection = afs.collection<Account>('accounts');
  }

  getAccounts(): Observable<Account[]> {
    this.accounts = this.accountsCollection.snapshotChanges().pipe(
      map(changes => changes.map(action => {
        const data = action.payload.doc.data() as Account;
        data.id = action.payload.doc.id;
        return data;

      }))
    );
      return this.accounts
}

newAccount(account: Account) {
  this.accountsCollection.add(account);
}

getAccount(id: string): Observable<Account> {
  this.accountDoc = this.afs.doc<Account>(`accounts/${id}`);
  console.log(this.accountDoc);
  this.account = this.accountDoc.snapshotChanges()
    .pipe(
        map(action => {
            if(action.payload.exists === false){
              return null;
            } else {
            const data = action.payload.data() as Account;
            data.id = action.payload.id;
            return data;
         }
      }));

  return this.account;
}

updateAccount(account: Account){
    this.accountDoc = this.afs.doc(`accounts/${account.id}`);
    this.accountDoc.update(account);
  } 

  deleteAccount(account: Account){
    this.accountDoc = this.afs.doc(`accounts/${account.id}`);
    this.accountDoc.delete();
  } 
  
}


// onDeleteClick(account: Account): Observable<Account> {

// }

// getAccount(id: string): Observable<Account> {
//   this.accountDoc = this.afs.doc<Account>(`accounts/${id}`);
//   console.log(this.accountDoc);
//   this.account = this.accountDoc.snapshotChanges().pipe(
//     map(actions => actions.map(action => {
//     if(action.payload.exists === false){
//       console.log("stuck");
//       return null;
//     } else {
//       const data = action.payload.data() as Account;
//       data.id = action.payload.id;
//       return data;
//     }
//   })));

//   return this.account;
// }
