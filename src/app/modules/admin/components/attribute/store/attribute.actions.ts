import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ListOptionsProps } from '@Models/list.model';

import {
  DeleteAttributeProps,
  DeleteAttributeSuccessProps,
  GetAttributeListSuccessProps,
  GetAttributeProps,
  GetAttributeSuccessProps,
  PatchAttributeProps,
  PostAttributeProps,
} from '../shared/models/attribute-props.model';

export const AttributeActions = createActionGroup({
  source: 'Attribute',
  events: {
    'Get Attribute': props<GetAttributeProps>(),
    'Get Attribute Success': props<GetAttributeSuccessProps>(),
    'Get Attributes': props<ListOptionsProps>(),
    'Get Attributes Success': props<GetAttributeListSuccessProps>(),
    'Post Attribute': props<PostAttributeProps>(),
    'Post Attribute Success': emptyProps(),
    'Patch Attribute': props<PatchAttributeProps>(),
    'Patch Attribute Success': emptyProps(),
    'Delete Attribute': props<DeleteAttributeProps>(),
    'Delete Attribute Success': props<DeleteAttributeSuccessProps>(),
  },
});
