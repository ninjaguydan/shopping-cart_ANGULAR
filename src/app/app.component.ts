import { Component } from '@angular/core';
import {DataService} from "./data.service";
import IUser from "./interfaces/IUser";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	currentUser!:IUser|null

	constructor(private dataService:DataService) {
		this.dataService.currentUser$.subscribe(next=>this.currentUser = next)
	}
}
