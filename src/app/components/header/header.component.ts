import {Component, OnDestroy, OnInit} from '@angular/core';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../../services/data.service";
import IUser from "../../interfaces/IUser";
import {Subscription} from "rxjs";
import ICart from "../../interfaces/ICart";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	iCart = faCartShopping
	currentUser!:IUser|null
	currentUserSub:Subscription
	userCart:ICart|undefined
	cartsSub:Subscription
	userCartCount:number = 0

	constructor(private dataService:DataService) {
		this.currentUserSub = dataService.currentUser$.subscribe((newValue) => {
			this.currentUser = newValue
			this.userCart = dataService.carts.find((cart) => cart.user === this.currentUser!.id)
			this.setCount()
		})
		this.cartsSub = dataService.carts$.subscribe((nextValue) => {
			this.userCart = nextValue.find((cart) => cart.user === this.currentUser!.id)
			this.setCount()
		})

	}
	ngOnInit():void {
	}
	ngOnDestroy():void {
		this.currentUserSub.unsubscribe()
		this.cartsSub.unsubscribe()
	}
	logout(){
		this.dataService.logout()
	}
	setCount():void{
		this.userCartCount = 0
		this.userCart?.items.forEach((item) => {
			this.userCartCount += item.quantity
		})
	}
}
