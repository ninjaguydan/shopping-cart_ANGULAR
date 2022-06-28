import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import IUser from "../../interfaces/IUser";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
	currentUser!:IUser|null
	cartSub!:Subscription
	carts!:any
	userCart!:any
	subtotal:number = 0
	salesTax:number = 0
	shipping:number = 5
	grandTotal:number = 0

	constructor(private dataService:DataService) {
		this.cartSub = dataService.carts$.subscribe(nextValue => {
			this.carts = nextValue
			this.userCart = this.carts.find((cart:any) => cart.user === dataService.currentUser?.id)
			let total = 0
			this.subtotal = this.userCart?.items.forEach((item:any) => {
				total += item.quantity*item.price
			})
			this.subtotal = total
			this.salesTax = (.07 * this.subtotal)
			this.shipping = this.subtotal > 250 ? 0 : 5
			this.grandTotal = this.subtotal+this.salesTax+this.shipping
		} )
	}

	ngOnInit(): void {
	}
	ngOnDestroy() {
		this.cartSub.unsubscribe()
	}
	removeProduct(productName:string):void{
		this.dataService.removeProduct(productName, this.dataService.currentUser?.id)
	}
}
