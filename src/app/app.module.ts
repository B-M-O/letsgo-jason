import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from "src/environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ArgonautComponent } from './argonaut/argonaut.component';

import { DBService } from './_services/db.service';

import { ArgonautOrderByPipe } from './_pipes/argonaut-order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArgonautComponent,
    ArgonautOrderByPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FontAwesomeModule
  ],
  providers: [DBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
