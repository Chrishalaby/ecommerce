import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, filter, switchMap, tap } from 'rxjs';

import { FieldErrorsComponent } from '@Components/field-errors/field-errors.component';
import { FieldNames } from '@Enums/fields.enum';
import { ModuleRoutes, Params } from '@Enums/routes.enum';
import {
  Attribute,
  AttributeListItem,
} from '../../shared/models/attribute.model';
import { AttributeFacade } from '../../store/attribute.facade';

@Component({
  selector: 'inv-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    TranslateModule,
    FieldErrorsComponent,
  ],
})
export class AttributeEditComponent implements OnInit {
  editAttributeForm!: FormGroup;
  attributeItem!: Attribute;
  readonly fieldNames: typeof FieldNames = FieldNames;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly attributeFacade: AttributeFacade,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAttribute();
  }

  createForm(): void {
    this.editAttributeForm = this.formBuilder.group({
      [FieldNames.Name]: ['', Validators.required],
    });
  }

  getAttribute(): void {
    this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has(`${Params.Id}`)),
        tap((params: ParamMap) => {
          this.attributeFacade.getAttribute(Number(params.get(`${Params.Id}`)));
        }),
        switchMap(
          () =>
            <Observable<AttributeListItem>>this.attributeFacade.selectAttribute$
        ),
        tap((attribute: any) => {
          if (attribute) {
            this.attributeItem = attribute;
            this.initializeForm();
          }
        })
      )
      .subscribe();
  }

  initializeForm(): void {
    this.editAttributeForm.setValue({
      [FieldNames.Name]: this.attributeItem.name,
    });
  }

  onSubmit(): void {
    const formValue = {
      values: this.editAttributeForm.value,
      id: this.attributeItem.id,
      name: this.attributeItem.name,
    };

    this.attributeFacade.patchAttribute(formValue);
  }

  onCancel(): void {
    this.router.navigate([`${ModuleRoutes.Admin}/${ModuleRoutes.Attributes}`]);
  }
}
