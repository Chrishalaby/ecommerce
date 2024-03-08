import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ListOptionsProps } from '@Models/list.model';
import { Product } from '@Modules/admin/components/new-product/shared/product.model';
import { ProductActions } from './product.actions';
import {
  selectProduct,
  selectProductes,
  selectProductPending,
} from './product.reducer';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  public selectProductPending$: Observable<boolean> = this.store.pipe(
    select(selectProductPending)
  );
  public selectProduct$: Observable<Product | null> = this.store.pipe(
    select(selectProduct)
  );
  public selectProductes$: Observable<Product[]> = this.store.pipe(
    select(selectProductes)
  );

  constructor(private readonly store: Store<Product>) {}

  public getProductes(listOptionsProps: ListOptionsProps): void {
    this.store.dispatch(ProductActions.getProductes({ ...listOptionsProps }));
  }

  public getProduct(id: number): void {
    this.store.dispatch(ProductActions.getProduct({ id }));
  }

  public postProduct(product: Product): void {
    this.store.dispatch(ProductActions.postProduct({ product }));
  }

  public patchProduct(id: number, productUpdate: Partial<Product>): void {
    this.store.dispatch(ProductActions.patchProduct({ id, productUpdate }));
  }

  public deleteProduct(id: number): void {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
  }
}
