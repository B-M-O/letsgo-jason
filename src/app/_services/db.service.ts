import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Argonaut } from '../_interfaces/argonaut';
import { ArgonautDb } from '../_interfaces/argonaut-db';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable()
export class DBService {

    private FIREBASE_CONFIG: any;
    
    private argonautsCollection: AngularFirestoreCollection;

    argonautsObs: Observable<ArgonautDb[]>

    constructor( private firestore: AngularFirestore ) {
        this.argonautsCollection = this.firestore.collection("argonauts");

        this.argonautsObs = this.argonautsCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as ArgonautDb;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
    }

    createArgonaut(argonaut: Argonaut): Promise<any> {
        return new Promise<any>((resolve, reject) =>{
            this.argonautsCollection
                .add(argonaut)
                .then(res => {
                    console.log("Argonaut member successfully added");
                    resolve(res);
                }, err => {
                    console.log("Error cannot add member");
                    reject(err);
                });
        });
    }

    deleteArgonaut(argonaut: ArgonautDb): Promise<any> {
        return new Promise<any>((resolve, reject) =>{
            this.argonautsCollection
                .doc(argonaut.id).delete().then(res => {
                    console.log("Document successfully deleted");
                }, err => {
                    console.log("Error cannot delete document");
                    reject(err);
                });
        });
    }

}