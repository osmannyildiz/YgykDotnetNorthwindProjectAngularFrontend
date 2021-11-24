import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product1: any = {
    id: 1,
    categoryId: 1,
    name: "Bardak",
    unitPrice: 5
  };
  product2: any = {
    id: 1,
    categoryId: 1,
    name: "Çanak",
    unitPrice: 5
  };
  product3: any = {
    id: 1,
    categoryId: 1,
    name: "Çömlek",
    unitPrice: 5
  };
  products: any = [
    this.product1,
    this.product2,
    this.product3,
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
