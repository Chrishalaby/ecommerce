export interface Product {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: InventoryStatus;
  image?: string;
  rating?: number;
  sku: string;
  inStock: boolean;
  images: Image[];
  attributes: Attribute[];
}

interface InventoryStatus {
  label: string;
  value: string;
}
export interface Image {
  name: string;
  objectURL: string;
}

export interface Attribute {
  label: string;
  value: string;
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
