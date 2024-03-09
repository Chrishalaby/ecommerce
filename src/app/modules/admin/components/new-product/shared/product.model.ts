import { Attribute } from '@angular/core';
import { AttributeValue } from '../../attribute/shared/models/attribute.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  attributes: ProductAttribute[];
  images: Blob;
}

interface ProductAttribute {
  id: number;
  product: Product;
  attribute: Attribute;
  attributeValue: AttributeValue;
}

export interface Image {
  name: string;
  objectURL: string;
}

export interface ProductResponse extends Product {
  id: number;
}

export interface ProductListResponse {
  data: ProductResponse[];
  count?: number;
  total?: number;
  page?: number;
  pageCount?: number;
}

export interface ProductListParameter {
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
