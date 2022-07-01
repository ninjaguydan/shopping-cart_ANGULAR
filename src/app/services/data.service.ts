import {Injectable, OnInit} from '@angular/core';
import IUser from "../interfaces/IUser";
import IProduct from "../interfaces/IProduct";
import {v4 as uuid} from 'uuid'
import {Subject} from "rxjs";
import ICart from "../interfaces/ICart";
import ICartItem from "../interfaces/ICartItem";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	productList:Array<IProduct> = [
		{
			"imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
			"name": "Checker Print Shirt",
			"price": 110,
			"rating": 4,
		},
		{
			"imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
			"name": "Gloria High Logo Sneaker",
			"price": 91,
			"rating": 3
		},
		{
			"imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
			"name": "Cate Rigid Bag",
			"price": 94.5,
			"rating": 2
		},
		{
			"imgUrl": "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
			"name": "Guess Connect Watch",
			"price": 438.9,
			"rating": 5
		},
		{
			"imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
			"name": "70s Retro Glam Kefiah",
			"price": 20,
			"rating": 3
		}
	]
	userList:Array<IUser> = []
	currentUser!:IUser|null
	currentUser$ = new Subject<IUser|null>()
	carts:Array<ICart> = []
	carts$ = new Subject<Array<ICart>>()

	constructor() {
	}

	logout() {
		this.currentUser$.next(null)
	}

	login(username:string, password:string):void|string {
		const foundUser = this.userList.find(u => u.username === username)
		if (foundUser && foundUser.password === password) {
			this.currentUser = foundUser
			this.currentUser$.next(foundUser)
		} else {
			return "Username or password do not match our records"
		}
	}

	addUser(newUser:{ username:string, password:string, confirm:string }):void|string {
		//Add validation to prevent empty fields
		if (this.userList.find(ul => ul.username.toLowerCase() === newUser.username.toLowerCase())) {
			return "Username already exists"
		}
		if (newUser.password !== newUser.confirm) {
			return "Passwords do not match"
		}
		const userObj:IUser = {
			id: uuid(),
			username: newUser.username,
			password: newUser.password,
		}
		this.userList = [
			userObj,
			...this.userList
		]
		this.login(newUser.username, newUser.password)
	}

	addProduct(product:IProduct):void {
		let myCart:ICart|undefined = this.carts.find((cart) => cart.user === this.currentUser?.id)
		if ( !myCart ) {
			myCart = {
				user: this.currentUser!.id,
				items: [
					{item:product, quantity: 1}
				]
			}
			this.carts = [
				...this.carts,
				myCart
			]
			this.carts$.next(this.carts)
			return
		} else {
			const foundProduct = myCart.items.find((i) => i.item.name === product.name)
			if ( foundProduct ) {
				foundProduct.quantity++
			} else {
				myCart.items = [
					...myCart.items,
					{item:product, quantity: 1}
				]
			}
		}
		this.carts = this.carts.map((cart) => {
			if ( cart.user === this.currentUser!.id) {
				return myCart!
			} else {
				return cart
			}
		})
		this.carts$.next(this.carts)
	}
	removeProduct(productName:string, id:string):void {
		let myCart:ICart = this.carts.find((c) => c.user === id)!
		let item:ICartItem = myCart!.items.find( (i) => i.item.name === productName )!
		if (item.quantity > 1 ) {
			item.quantity--
		} else {
			myCart.items = myCart!.items.filter((i) => i.item.name !== productName)
		}
		this.carts = [
			...this.carts,
			myCart
		]
		this.carts$.next(this.carts)
	}
}
