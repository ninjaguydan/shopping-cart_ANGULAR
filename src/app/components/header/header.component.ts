import {Component, OnDestroy, OnInit} from '@angular/core';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../../data.service";
import IUser from "../../interfaces/IUser";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	imagePath = '/assets/media/logo.png'
	iCart = faCartShopping
	currentUser!:IUser|null
	currentUserSub:Subscription
	carts:any
	cartsSub:Subscription
	userCartCount:number = 0

	constructor(private dataService:DataService) {
		this.currentUserSub = dataService.currentUser$.subscribe(newValue => this.currentUser = newValue)
		this.cartsSub = dataService.carts$.subscribe(nextValue => {
			this.carts = nextValue
			let myCart = dataService.carts.find(cart => cart.user === this.currentUser?.id)
			let total:any = 0
			myCart.items.forEach((item:any) => {
				total += item.quantity
			})
			this.userCartCount = total
		})

	}
	ngOnInit():void {
	}
	ngOnDestroy():void {
		this.currentUserSub.unsubscribe()
	}
	logout(){
		this.dataService.logout()
	}
}
