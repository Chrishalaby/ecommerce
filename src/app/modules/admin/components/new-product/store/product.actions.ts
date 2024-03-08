import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ListOptionsProps } from '@Models/list.model';
import {
  DeleteProductProps,
  DeleteProductSuccessProps,
  GetProductListSuccessProps,
  GetProductProps,
  GetProductSuccessProps,
  PatchProductProps,
  PostProductProps,
} from '../shared/product-props.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Get Product': props<GetProductProps>(),
    'Get Product Success': props<GetProductSuccessProps>(),
    'Get Productes': props<ListOptionsProps>(),
    'Get Productes Success': props<GetProductListSuccessProps>(),
    'Post Product': props<PostProductProps>(),
    'Post Product Success': emptyProps(),
    'Patch Product': props<PatchProductProps>(),
    'Patch Product Success': emptyProps(),
    'Delete Product': props<DeleteProductProps>(),
    'Delete Product Success': props<DeleteProductSuccessProps>(),
  },
});
