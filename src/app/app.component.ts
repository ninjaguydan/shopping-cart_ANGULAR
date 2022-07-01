import {Component, OnDestroy} from '@angular/core';
import {DataService} from "./services/data.service";
import IUser from "./interfaces/IUser";
import {Subscription} from "rxjs";
import ICart from "./interfaces/ICart";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
	currentUser!:IUser|null
	user$ub:Subscription
	userCart:ICart|undefined
	cart$ub:Subscription

	constructor(private dataService:DataService) {
		this.user$ub = this.dataService.currentUser$.subscribe((next)=>this.currentUser = next)
		this.cart$ub = this.dataService.carts$.subscribe((updatedCarts) => {
			this.userCart = updatedCarts.find((cart) => cart.user === this.currentUser?.id)
		})
	}
	ngOnDestroy():void {
		this.user$ub.unsubscribe()
	}
}
