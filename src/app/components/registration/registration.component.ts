import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	username!:string
	password!:string
	confirm!:string
	error!:string|void

	constructor(private dataService:DataService) { }

	ngOnInit():void {
	}
	addUser():void{
		this.error = this.dataService.addUser({username: this.username, password: this.password, confirm: this.confirm})
	}
}
