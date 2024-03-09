import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';

import { FieldErrorsComponent } from '@Components/field-errors/field-errors.component';
import { FieldNames } from '@Enums/fields.enum';
import { ModuleRoutes } from '@Enums/routes.enum';
import { Router } from '@angular/router';
import { AttributeFacade } from '../../store/attribute.facade';

@Component({
  selector: 'inv-attributes-creation',
  templateUrl: './attribute-create.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    KeyFilterModule,
    FieldErrorsComponent,
  ],
})
export class AttributeCreateComponent implements OnInit {
  createAttributeForm!: FormGroup;
  readonly fieldNames: typeof FieldNames = FieldNames;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly attributeFacade: AttributeFacade,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createAttributeForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      [FieldNames.Name]: [
        '',
        [Validators.required, Validators.max(99), Validators.min(1)],
      ],
    });
  }

  onSubmit(): void {
    this.attributeFacade.postAttribute(this.createAttributeForm.value);
  }

  onCancel(): void {
    this.router.navigate([`${ModuleRoutes.Admin}/${ModuleRoutes.Attributes}`]);
  }
}
