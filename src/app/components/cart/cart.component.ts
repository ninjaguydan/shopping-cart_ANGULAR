import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import IUser from "../../interfaces/IUser";
import {Subscription} from "rxjs";
import ICart from "../../interfaces/ICart";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
	cartsSub!:Subscription
	userCart!:ICart|undefined
	subtotal:number = 0
	salesTax:number = 0
	shipping:number = 50
	grandTotal:number = 0

	constructor(private dataService:DataService) {
		this.userCart = dataService.carts.find((cart) => cart.user === dataService.currentUser!.id)
		this.updateCart()
		this.cartsSub = dataService.carts$.subscribe((updatedCart) => {
			this.userCart = updatedCart.find((cart) => cart.user === dataService.currentUser!.id)
			this.updateCart()
		})
	}

	ngOnInit(): void {
	}
	ngOnDestroy():void {
		this.cartsSub.unsubscribe()
	}
	removeProduct(productName:string):void{
		this.dataService.removeProduct(productName, this.dataService.currentUser!.id)
	}
	updateCart():void{
		this.subtotal = 0
		this.userCart?.items.forEach((i) => {
			this.subtotal += (i.quantity * i.item.price)
		})
		this.salesTax = (.07 * this.subtotal)
		this.shipping = this.subtotal > 300 ? 0 : 50
		this.grandTotal = this.subtotal + this.salesTax + this.shipping
	}
}
