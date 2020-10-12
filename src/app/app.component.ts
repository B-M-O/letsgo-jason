import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { DBService } from './_services/db.service';
import { ArgonautOrderByPipe } from './_pipes/argonaut-order-by.pipe';
import { Argonaut } from './_interfaces/argonaut';
import { ArgonautDb } from './_interfaces/argonaut-db';

import { faSortNumericUpAlt, faSortNumericDown, faSortAlphaUpAlt, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ArgonautOrderByPipe]
})
export class AppComponent {

	@ViewChild("nameInputRef", {read: ElementRef}) nameInputRef: ElementRef;
	@ViewChild("ageInputRef", {read: ElementRef}) ageInputRef: ElementRef;
	@ViewChild("roleSelectRef", {read: ElementRef}) roleSelectRef: ElementRef;
	
	@ViewChild("orderTypeRef", {read: ElementRef}) orderTypeRef: ElementRef;
	@ViewChild("orderDirectionAscRef", {read: ElementRef}) orderDirectionAscRef: ElementRef;

  title = 'Crew Manager';

  faSortNumericUpAlt = faSortNumericUpAlt;
  faSortNumericDown = faSortNumericDown;
  faSortAlphaUpAlt = faSortAlphaUpAlt;
  faSortAlphaDown = faSortAlphaDown;

  orderDirection: string = "asc";

  orderType: string = "name";

  argonauts: Observable<ArgonautDb[]>;

  constructor (private dbService: DBService) {
  	this.argonauts = this.dbService.argonautsObs;
  }

  ngOnInit(): void {
  	console.log("Welcome to Crew Manager v1.0.1");
  }

  /*DATA STUFF*/

  onSubmitArgonaut(): void {
  	let name: string = this.nameInputRef.nativeElement.value;
  	let age: number = this.ageInputRef.nativeElement.value;
  	let role: string = this.roleSelectRef.nativeElement.value;
  	
  	let errorStr: string = "";

  	if (name == null || name == undefined || name === "")
  		errorStr += "\nRenseigne le nom de l'Argonaute";
  	if (age == null || name == undefined)
  		errorStr += "\nRenseigne l'âge de l'Argonaute";
  	if (role == null || name == undefined || role === "")
  		errorStr += "\nRenseigne le rôle de l'Argonaute";

  	if (errorStr !== "")
  	{
  		errorStr = "Formulaire incomplet !" + errorStr;
  		alert(errorStr);
  		return;
  	}

  	let argonaut: Argonaut = {name:name, age:age, role:role};

  	this.dbService.createArgonaut(argonaut)
  		.then(res => {
  			this.nameInputRef.nativeElement.value = null;
				this.ageInputRef.nativeElement.value = null;
				this.roleSelectRef.nativeElement.selectedIndex = 0;
  		}, err => {
  			alert(`${name} s'est perdu sur le chemin de l'embarcadère...`)
  		});
  }

  /*EVENT STUFF*/
  onOrderTypeChange(): void {
  	this.orderType = this.orderTypeRef.nativeElement.value;
  }

  onOrderDirectionChange(dir: string): void {
  	this.orderDirection = dir;
  }
}
