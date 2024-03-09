export interface AttributeListItem extends Attribute {
  id: number;
}

export interface Attribute {
  id: number;
  name: string;
  values: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  value: string;
  attribute: Attribute;
}

export interface AttributeResponse extends Attribute {
  id: number;
}

export interface AttributeListResponse {
  data: AttributeResponse[];
  count?: number;
  total?: number;
  page?: number;
  pageCount?: number;
}

export interface AttributeListParameter {
  fields?: string[];
  s?: string;
  filter?: string[];
  or?: string[];
  sort?: string;
  join?: string[];
  limit?: number;
  offset?: number;
  page?: number;
  cache?: number;
}
