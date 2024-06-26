import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId :number = 0;
  constructor( private productService: ProductService,
               private route: ActivatedRoute ) {
               
               }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    });
  }

  listProducts(){

    //check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get the id param string. convet string to number using the + symbol
      if(this.route.snapshot.paramMap.get('id') != null){
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      }else{
        this.currentCategoryId = 1;
      }
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

 

}
