import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.httpClient.post<AttributeResponse>(`attribute`, attribute);
  }

  getAttribute(attributeId: number): Observable<AttributeResponse> {
    return this.httpClient.get<AttributeResponse>(`attribute/${attributeId}`);
  }

  getAttributeList(): Observable<AttributeListResponse> {
    return this.httpClient.get<AttributeListResponse>(`attribute`);
  }

  updateAttribute(
    attributeId: number,
    attributeUpdate: Partial<Attribute>
  ): Observable<AttributeResponse> {
    return this.httpClient.put<AttributeResponse>(
      `attribute/${attributeId}`,
      attributeUpdate
    );
  }

  deleteAttribute(attributeId: number): Observable<null> {
    return this.httpClient.delete<null>(`attribute/${attributeId}`);
  }

  getAndPaginate(tableValues: TableValues): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(
      `attribute` +
        `?sort=${[tableValues.sortField, tableValues.sortOrder]}` +
        `&limit=${tableValues.countPerPage}` +
        `&page=${tableValues.pageNumber}`
    );
  }
}
