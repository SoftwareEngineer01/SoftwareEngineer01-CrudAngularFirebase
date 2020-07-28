import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from "../Interfaces/product";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productsCollection: AngularFirestoreCollection<Product>;
  public products: Observable<Product[]>;
  public producDoc: AngularFirestoreDocument<Product>;

  constructor(public db:AngularFirestore) {
    //Obtiene los productos con el id de la colección
    this.productsCollection =this.db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
    );
  }

  getProducts(){
    return this.products;
  }

  addProduct(product: Product){
    this.productsCollection.add(product);
  }

  updateProduct(product: Product){
    this.producDoc = this.db.doc(`products/${product.id}`);
    this.producDoc.update(product);
  }

  deleteProduct(product: Product){
    this.producDoc = this.db.doc(`products/${product.id}`);
    this.producDoc.delete();
  }

}
