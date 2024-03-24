import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TableValues } from '@Models/table.model';
import { Product, ProductListResponse, ProductResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  constructor(private readonly httpClient: HttpClient) {}

  createProduct(product: Product): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>(`product`, product);
  }

  getProduct(productId: number): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`product/${productId}`);
  }

  getProductList(httpParams: HttpParams): Observable<ProductListResponse> {
    return this.httpClient.get<ProductListResponse>(`product`, {
      params: httpParams,
    });
  }

  getAndPaginate(tableValues: TableValues): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `product` +
        `?sort=${[tableValues.sortField, tableValues.sortOrder]}` +
        `&limit=${tableValues.countPerPage}` +
        `&page=${tableValues.pageNumber}`
    );
  }

  getProductListBad(params: string): Observable<ProductListResponse> {
    return this.httpClient.get<ProductListResponse>(`product` + params);
  }

  updateProduct(
    productId: number,
    productUpdate: Partial<Product>
  ): Observable<ProductResponse> {
    return this.httpClient.patch<ProductResponse>(
      `product/${productId}`,
      productUpdate
    );
  }

  deleteProduct(productId: number): Observable<null> {
    return this.httpClient.delete<null>(`product/${productId}`);
  }
}
