import { createFeature, createReducer, on } from '@ngrx/store';

import { TypedActionProps } from '@Types/action.types';

import { Attribute } from '../shared/models/attribute.model';
import { AttributeActions } from './attribute.actions';
import { AttributeState } from './attribute.state';

export const attributeInitialState: AttributeState = {
  attributes: [],
  attribute: null,
  attributePending: false,
};

export const attributeFeature = createFeature({
  name: 'attribute',
  reducer: createReducer(
    attributeInitialState,
    on(
      AttributeActions.getAttributes,
      AttributeActions.getAttribute,
      AttributeActions.postAttribute,
      AttributeActions.patchAttribute,
      AttributeActions.deleteAttribute,
      (state: AttributeState): AttributeState => ({
        ...state,
        attributePending: true,
      })
    ),
    on(
      AttributeActions.postAttributeSuccess,
      AttributeActions.patchAttributeSuccess,
      (state: AttributeState): AttributeState => ({
        ...state,
        attributePending: false,
      })
    ),
    on(
      AttributeActions.getAttributesSuccess,
      (
        state: AttributeState,
        { attributes }: TypedActionProps<string, { attributes: Attribute[] }>
      ): AttributeState => ({
        ...state,
        attributePending: false,
        attributes,
      })
    ),
    on(
      AttributeActions.getAttributeSuccess,
      (
        state: AttributeState,
        { attribute }: TypedActionProps<string, { attribute: Attribute }>
      ): AttributeState => ({
        ...state,
        attributePending: false,
        attribute,
      })
    ),
    on(
      AttributeActions.deleteAttributeSuccess,
      (
        state: AttributeState,
        { id }: TypedActionProps<string, { id: number }>
      ): AttributeState => ({
        ...state,
        attributePending: false,
        attributes: state.attributes.filter(
          (attribute: Attribute) => id !== attribute.id
        ),
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectAttributeState,
  selectAttributes,
  selectAttribute,
  selectAttributePending,
} = attributeFeature;
