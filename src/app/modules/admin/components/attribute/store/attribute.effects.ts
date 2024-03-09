import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ModuleRoutes } from '@Enums/routes.enum';

import { Store } from '@ngrx/store';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { AttributeRepository } from '../shared/attribute.repository';
import {
  DeleteAttributeProps,
  GetAttributeProps,
  PatchAttributeProps,
  PostAttributeProps,
} from '../shared/models/attribute-props.model';
import { Attribute } from '../shared/models/attribute.model';
import { AttributeActions } from './attribute.actions';

@Injectable()
export class AttributeEffects {
  public getAttribute$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(AttributeActions.getAttribute),
      switchMap(
        (action: GetAttributeProps): Observable<Attribute> =>
          this.attributeRepository.getAttribute(action.id)
      ),
      map((attribute: Attribute) =>
        AttributeActions.getAttributeSuccess({ attribute })
      )
    )
  );

  public postAttribute$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(AttributeActions.postAttribute),
      switchMap(
        (action: PostAttributeProps): Observable<Attribute> =>
          this.attributeRepository.createAttribute(action.attribute)
      ),
      map(() => AttributeActions.postAttributeSuccess())
    )
  );

  public postAttributeSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AttributeActions.postAttributeSuccess),
        tap(() => {
          this.notificationsService.showSuccessMessage('Attribute', 'created');
          this.router.navigate([
            `${ModuleRoutes.Admin}/${ModuleRoutes.Attributes}`,
          ]);
        })
      ),
    { dispatch: false }
  );

  public patchAttribute$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(AttributeActions.patchAttribute),
      switchMap((action: PatchAttributeProps) =>
        this.attributeRepository.updateAttribute(action.attributeUpdate)
      ),
      map(() => AttributeActions.patchAttributeSuccess())
    )
  );

  public patchAttributeSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AttributeActions.patchAttributeSuccess),
        tap(() => {
          this.notificationsService.showSuccessMessage('Attribute', 'updated');
          this.router.navigate([
            `${ModuleRoutes.Admin}/${ModuleRoutes.Attributes}`,
          ]);
        })
      ),
    { dispatch: false }
  );

  public deleteAttribute$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(AttributeActions.deleteAttribute),
      switchMap(
        (action: DeleteAttributeProps): Observable<number> =>
          this.attributeRepository
            .deleteAttribute(action.id)
            .pipe(map(() => action.id))
      ),
      map((id: number) => AttributeActions.deleteAttributeSuccess({ id }))
    )
  );

  public deleteAttributeSuccess$: CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AttributeActions.deleteAttributeSuccess),
        tap(() => {
          this.notificationsService.showSuccessMessage('Attribute', 'deleted');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly attributeRepository: AttributeRepository,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    private readonly store: Store
  ) {}
}
