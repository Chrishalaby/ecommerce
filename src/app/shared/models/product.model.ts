export interface Product {
  id?: string;
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
