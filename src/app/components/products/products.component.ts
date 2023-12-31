import { Component, OnInit } from '@angular/core';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: {
      id: '',
      name: '',
    },
  };
  limit = 10;
  sort = 'asc';
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (error) => {
        window.alert(error);
        this.statusDetail = 'error';
      }
    );
  }

  // callback hell --- ❌
  // readAndUpdate(id: string) {
  //   this.productsService.getProduct(id).subscribe((data) => {
  //     const product = data;
  //     this.productsService
  //       .update(product.id, { title: 'change' })
  //       .subscribe((rtaUpd) => console.log(rtaUpd));
  //   });
  // }

  // Without callback hell --- When there are dependences ✅
  readAndUpdateWithDependencies(id: string) {
    this.productsService
      .fetchWithDependenciesReadAndUpdate(id, { title: 'change' })
      .subscribe((rtaUpd) => {
        console.log(rtaUpd);
      });
  }

  // Without callback hell --- When there aren't dependences (parallel processes) ✅
  readAndUpdateWithoutDependencies(id: string) {
    this.productsService
      .fetchWithoutDependenciesReadAndUpdate(id, { title: 'Change' })
      .subscribe((response) => {
        const read = response[0];
        const update = response[1];
      });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
    };
    this.productsService
      .create(product)
      .subscribe((data) => this.products.unshift(data));
  }

  updateProduct() {
    const id = this.productChosen.id;
    const changes: UpdateProductDTO = {
      ...this.productChosen,
      category: this.productChosen.category.name,
      title: 'Nuevo title',
    };
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  changeSort(sortType: string) {
    this.productsService
      .getAllProducts(this.limit, sortType)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
