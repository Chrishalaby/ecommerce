import { Component, OnInit } from '@angular/core';
import {
  FormArray,
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
import { ModuleRoutes } from '@Enums/routes.enum';
import { CommonModule } from '@angular/common';
import { Attribute, AttributeValue } from '../../shared/models/attribute.model';
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
    CommonModule,
  ],
})
export class AttributeEditComponent implements OnInit {
  editAttributeForm!: FormGroup;
  attributeItem!: Attribute;

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
      name: ['', Validators.required],
      values: this.formBuilder.array([]),
    });
  }

  getAttribute(): void {
    this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        tap((params: ParamMap) => {
          this.attributeFacade.getAttribute(Number(params.get('id')));
        }),
        switchMap(
          () => <Observable<Attribute>>this.attributeFacade.selectAttribute$
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
    this.editAttributeForm.patchValue({
      name: this.attributeItem.name,
    });
    this.initializeValuesFormArray(this.attributeItem.values);
  }

  initializeValuesFormArray(values: AttributeValue[]): void {
    const formArray = this.editAttributeForm.get('values') as FormArray;
    formArray.clear(); // Clear the form array before adding new values
    values.forEach((value) => {
      formArray.push(
        this.formBuilder.group({
          id: [value.id],
          value: [value.value, Validators.required],
        })
      );
    });
  }

  addValueControl(value: AttributeValue = { id: 0, value: '' }): void {
    const valuesFormArray = this.editAttributeForm.get('values') as FormArray;
    const valueGroup = this.formBuilder.group({
      id: [value.id],
      value: [value.value, Validators.required],
    });
    valuesFormArray.push(valueGroup);
  }

  removeValueControl(index: number): void {
    const valuesFormArray = this.editAttributeForm.get('values') as FormArray;
    valuesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.editAttributeForm.valid) {
      const formValue = {
        ...this.editAttributeForm.value,
        id: this.attributeItem.id,
      };
      this.attributeFacade.patchAttribute(formValue);
    }
  }

  // Helper to get the values FormArray for the template
  get valuesFormArray() {
    return this.editAttributeForm.get('values') as FormArray;
  }
  onCancel(): void {
    this.router.navigate([`${ModuleRoutes.Admin}/${ModuleRoutes.Attributes}`]);
  }
}
