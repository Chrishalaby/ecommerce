import { FieldErrorsComponent } from '@Components/field-errors/field-errors.component';
import { Params } from '@Enums/routes.enum';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { Attribute, AttributeValue } from '../../shared/models/attribute.model';
import { AttributeFacade } from '../../store/attribute.facade';

@Component({
  selector: 'app-attribute-value',
  templateUrl: './attribute-value.component.html',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    TranslateModule,
    FieldErrorsComponent,
    DropdownModule,
    MultiSelectModule,
  ],
})
export class AttributeValueComponent implements OnInit {
  editAttributeForm!: FormGroup;
  attributeItem!: Attribute; // Assuming you have a proper type for this

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly attributeFacade: AttributeFacade
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAttribute();
  }

  createForm(): void {
    this.editAttributeForm = this.formBuilder.group({
      values: this.formBuilder.array([]),
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
          () => <Observable<Attribute>>this.attributeFacade.selectAttribute$
        ),
        tap((attribute: any) => {
          if (attribute) {
            this.attributeItem = attribute;
            this.initializeValuesFormArray(attribute.values);
          }
        })
      )
      .subscribe();
  }

  initializeValuesFormArray(values: AttributeValue[]): void {
    if (!values) {
      return;
    }
    const valuesArray = this.editAttributeForm.get('values') as FormArray;
    values.forEach((value) => {
      valuesArray.push(this.formBuilder.control(value));
    });
  }

  addValueControl(): void {
    (this.editAttributeForm.get('values') as FormArray).push(
      this.formBuilder.control('')
    );
  }

  removeValueControl(index: number): void {
    (this.editAttributeForm.get('values') as FormArray).removeAt(index);
  }

  onSubmit(): void {
    if (this.editAttributeForm.valid) {
      this.attributeFacade.patchAttribute(
        this.attributeItem.id,
        this.editAttributeForm.value
      );
    }
  }

  // Helper to get the values FormArray for the template
  get valuesFormArray() {
    return this.editAttributeForm.get('values') as FormArray;
  }
}
