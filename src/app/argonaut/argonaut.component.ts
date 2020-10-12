import { Component, OnInit, Input } from '@angular/core';

import { DBService } from '../_services/db.service';

import { ArgonautDb } from "../_interfaces/argonaut-db";

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-argonaut',
  templateUrl: './argonaut.component.html',
  styleUrls: ['./argonaut.component.css']
})
export class ArgonautComponent implements OnInit {

	@Input() argonaut: ArgonautDb;

	faTimesCircle = faTimesCircle;

  constructor(private dbService: DBService) { }

  ngOnInit(): void {
  }

  onDelete(): void {
  	this.dbService.deleteArgonaut(this.argonaut)
  	.then(res =>
  		{
  			//ADD SUCCESS FEEDBACK
  		}, err => {
  			//ADD ERROR FEEDBACK
  		});
  }

}
