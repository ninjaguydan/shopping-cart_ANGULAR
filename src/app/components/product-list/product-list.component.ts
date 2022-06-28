import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import IProduct from "../../interfaces/IProduct";
import { faStar as outline } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
	productList:Array<IProduct>
	starLine = outline
	star = solid

	constructor(private dataService:DataService) {
		this.productList = dataService.productList
	}

	ngOnInit(): void {
	}

	addProduct(productName:string){
		let newProduct:IProduct|undefined = this.productList.find(n => n.name === productName)
		// @ts-ignore
		this.dataService.addProduct(newProduct)
	}
}
