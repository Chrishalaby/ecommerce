import { createFeature, createReducer, on } from '@ngrx/store';

import { Product } from '@Modules/admin/components/new-product/shared/product.model';
import { TypedActionProps } from '@Types/action.types';
import { ProductActions } from './product.actions';
import { ProductState } from './product.state';

export const productInitialState: ProductState = {
  product: null,
  products: [],
  productPending: false,
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    productInitialState,
    on(
      ProductActions.postProduct,
      ProductActions.getProduct,
      ProductActions.getProducts,
      ProductActions.patchProduct,
      ProductActions.deleteProduct,
      (state: ProductState): ProductState => ({
        ...state,
        productPending: true,
      })
    ),
    on(
      ProductActions.postProductSuccess,
      ProductActions.patchProductSuccess,
      (state: ProductState): ProductState => ({
        ...state,
        productPending: false,
      })
    ),
    on(
      ProductActions.getProductSuccess,
      (
        state: ProductState,
        { product }: TypedActionProps<string, { product: Product }>
      ): ProductState => ({
        ...state,
        productPending: false,
        product,
      })
    ),
    on(
      ProductActions.getProductsSuccess,
      (
        state: ProductState,
        { products }: TypedActionProps<string, { products: Product[] }>
      ): ProductState => ({
        ...state,
        productPending: false,
        products,
      })
    ),
    on(
      ProductActions.deleteProductSuccess,
      (
        state: ProductState,
        { id }: TypedActionProps<string, { id: number }>
      ): ProductState => ({
        ...state,
        productPending: false,
        products: state.products.filter(
          (product: Product) => id !== product.id
        ),
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectProductState,
  selectProduct,
  selectProducts,
  selectProductPending,
} = productFeature;
