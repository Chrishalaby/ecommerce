import { Attribute } from './attribute.model';

export interface PostAttributeProps {
  attribute: Attribute;
}

export interface PatchAttributeProps {
  attributeUpdate: Partial<Attribute>;
}

export interface GetAttributeProps {
  id: number;
}

export interface DeleteAttributeProps {
  id: number;
}

export interface DeleteAttributeSuccessProps {
  id: number;
}

export interface GetAttributeSuccessProps {
  attribute: Attribute;
}

export interface GetAttributeListSuccessProps {
  attributes: Attribute[];
}
