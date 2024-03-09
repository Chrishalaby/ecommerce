import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '@Models/store.model';

import { ListOptionsProps } from '@Models/list.model';
import { Attribute } from '../shared/models/attribute.model';
import { AttributeActions } from './attribute.actions';
import {
  selectAttribute,
  selectAttributePending,
  selectAttributes,
} from './attribute.reducer';

@Injectable({ providedIn: 'root' })
export class AttributeFacade {
  public selectAttributePending$: Observable<boolean> = this.store.pipe(
    select(selectAttributePending)
  );
  public selectAttributes$: Observable<Attribute[]> = this.store.pipe(
    select(selectAttributes)
  );
  public selectAttribute$: Observable<Attribute | null> = this.store.pipe(
    select(selectAttribute)
  );

  constructor(private readonly store: Store<State>) {}

  public getAttributes(listOptionsProps: ListOptionsProps): void {
    this.store.dispatch(
      AttributeActions.getAttributes({ ...listOptionsProps })
    );
  }

  public getAttribute(id: number): void {
    this.store.dispatch(AttributeActions.getAttribute({ id }));
  }

  public postAttribute(attribute: Attribute): void {
    this.store.dispatch(AttributeActions.postAttribute({ attribute }));
  }

  public patchAttribute(attributeUpdate: Partial<Attribute>): void {
    this.store.dispatch(AttributeActions.patchAttribute({ attributeUpdate }));
  }

  public deleteAttribute(id: number): void {
    this.store.dispatch(AttributeActions.deleteAttribute({ id }));
  }
}
