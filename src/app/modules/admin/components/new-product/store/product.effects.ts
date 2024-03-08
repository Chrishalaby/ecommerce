import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ModuleRoutes } from '@Enums/routes.enum';
import { Product } from '@Modules/admin/components/new-product/shared/product.model';
import { NotificationsService } from 'app/shared/services/notifications.service';
import {
  DeleteProductProps,
  GetProductProps,
  PatchProductProps,
  PostProductProps,
} from '../shared/product-props.model';
import { ProductRepository } from '../shared/status.repository';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
  public getProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProduct),
      switchMap(
        (action: GetProductProps): Observable<Product> =>
          this.productRepository.getProduct(action.id)
      ),
      map((product: Product) => ProductActions.getProductSuccess({ product }))
    )
  );

  public postProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.postProduct),
      switchMap(
        (action: PostProductProps): Observable<Product> =>
          this.productRepository.createProduct(action.product)
      ),
      map(() => ProductActions.postProductSuccess())
    )
  );

  public postProductSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.postProductSuccess),
        tap(() => {
          this.notificationsService.showSuccessMessage('Product', 'created');
          this.router.navigate([ModuleRoutes.Products]);
        })
      ),
    { dispatch: false }
  );

  public patchProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.patchProduct),
      switchMap((action: PatchProductProps) =>
        this.productRepository.updateProduct(action.id, action.productUpdate)
      ),
      map(() => ProductActions.patchProductSuccess())
    )
  );

  public patchProductSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.patchProductSuccess),
        tap(() => {
          this.notificationsService.showSuccessMessage('Product', 'updated');
          this.router.navigate([ModuleRoutes.Products]);
        })
      ),
    { dispatch: false }
  );

  public deleteProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap(
        (action: DeleteProductProps): Observable<number> =>
          this.productRepository
            .deleteProduct(action.id)
            .pipe(map(() => action.id))
      ),
      map((id: number) => ProductActions.deleteProductSuccess({ id }))
    )
  );

  public deleteProductSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.deleteProductSuccess),
        tap(() => {
          this.notificationsService.showSuccessMessage('Product', 'deleted');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly productRepository: ProductRepository,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService
  ) {}
}
