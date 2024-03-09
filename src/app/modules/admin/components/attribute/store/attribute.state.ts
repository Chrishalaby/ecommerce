import { Attribute } from '../shared/models/attribute.model';

export interface AttributeState {
  attributePending: boolean;
  attributes: Attribute[];
  attribute: Attribute | null;
}
