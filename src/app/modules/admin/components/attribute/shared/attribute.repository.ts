import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@Environment';
import { TableValues } from '@Models/table.model';
import {
  Attribute,
  AttributeListResponse,
  AttributeResponse,
} from './models/attribute.model';

@Injectable({
  providedIn: 'root',
})
export class AttributeRepository {
  constructor(private readonly httpClient: HttpClient) {}

  createAttribute(attribute: Attribute): Observable<AttributeResponse> {
    return this.httpClient.post<AttributeResponse>(
      `${environment.apiUrl}/attribute`,
      attribute
    );
  }

  getAttribute(attributeId: number): Observable<AttributeResponse> {
    return this.httpClient.get<AttributeResponse>(
      `${environment.apiUrl}/attribute/${attributeId}`
    );
  }

  getAttributeList(): Observable<AttributeListResponse> {
    return this.httpClient.get<AttributeListResponse>(
      `${environment.apiUrl}/attribute`
    );
  }

  updateAttribute(
    attributeId: number,
    attributeUpdate: Partial<Attribute>
  ): Observable<AttributeResponse> {
    return this.httpClient.patch<AttributeResponse>(
      `${environment.apiUrl}/attribute/${attributeId}`,
      attributeUpdate
    );
  }

  deleteAttribute(attributeId: number): Observable<null> {
    return this.httpClient.delete<null>(
      `${environment.apiUrl}/attribute/${attributeId}`
    );
  }

  getAndPaginate(tableValues: TableValues): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(
      `${environment.apiUrl}/attribute` +
        `?sort=${[tableValues.sortField, tableValues.sortOrder]}` +
        `&limit=${tableValues.countPerPage}` +
        `&page=${tableValues.pageNumber}`
    );
  }
}
