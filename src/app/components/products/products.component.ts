import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../Services/product.service";
import { Product } from 'src/app/Interfaces/product';
import Swal from "sweetalert2";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  editingProduct: Product;
  saveProduct: boolean = false;
  editing: boolean = false;
  product = {} as Product;

  constructor(public productService:ProductService) { }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(products => {
      this.products = products;
     });
  }

  openSave(event){
    this.saveProduct = true;
  }

  cancel(){
    this.saveProduct = false;
  }

  addProduct(){
    if(this.product.code == undefined || this.product.description == undefined){
      alert('Debe llenar todos los campos');
    }else{
      this.productService.addProduct(this.product);
      this.saveProduct = false;
      this.product = {} as Product;

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Registro guardado correctamente'
      });
    }
  }

  editProduct(event, product){
    this.editingProduct = product;
    this.editing = !this.editing;
  }

  updateProduct(){
    console.log(this.editingProduct);
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = false;

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Registro actualizado correctamente'
    });
  }

  deleteProduct(event, product){
    Swal.fire({
      icon: 'warning',
      title: 'Esta seguro?',
      text: 'Está seguro que desea borrar el registro' ,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if(resp.value){
        this.productService.deleteProduct(product);
      }
    });
  }

}
