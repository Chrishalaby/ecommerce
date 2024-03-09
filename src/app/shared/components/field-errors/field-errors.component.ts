import { FormFieldErrors } from '@Enums/form-errors.enum';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'inv-field-errors',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
})
export class FieldErrorsComponent {
  @Input() public label: string = '';
  @Input() public markAsTouched: boolean = false;

  public formFieldErrors: typeof FormFieldErrors = FormFieldErrors;
  public errorsTranslationPath: string = 'SHARED.COMPONENTS.FIELD_ERRORS.';

  private control: AbstractControl | undefined;

  public get fieldControl(): AbstractControl | undefined {
    if (this.control) {
      return this.control;
    }

    return;
  }
  @Input() public set fieldControl(data: AbstractControl) {
    this.control = data;

    if (this.markAsTouched) {
      this.control.markAsTouched();
    }
  }
}
