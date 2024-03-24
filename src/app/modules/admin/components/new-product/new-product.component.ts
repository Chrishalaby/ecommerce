import { FieldNames } from '@Enums/fields.enum';
import { Image } from '@Modules/admin/components/new-product/shared/product.model';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { AttributeRepository } from '../attribute/shared/attribute.repository';
import { Attribute } from '../attribute/shared/models/attribute.model';
import { ProductFacade } from './store/product.facade';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ChipModule,
    DropdownModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    RippleModule,
    InputSwitchModule,
    InputTextareaModule,
    TranslateModule,
    ReactiveFormsModule,
    DialogModule,
    MultiSelectModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductFacade],
})
export class NewProductComponent implements OnInit {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  readonly fieldNames: typeof FieldNames = FieldNames;

  images: any[] = [];
  productForm!: FormGroup;
  attributeOptions: Attribute[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly attributeRepository: AttributeRepository,
    private readonly productFacade: ProductFacade
  ) {}

  ngOnInit(): void {
    this.loadAttributeOptions();
    this.productForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.fb.group({
      [FieldNames.Name]: [''],
      [FieldNames.Price]: [null],
      [FieldNames.Code]: [''],
      [FieldNames.Sku]: [''],
      [FieldNames.InStock]: [true],
      [FieldNames.Description]: [''],
      [FieldNames.Attributes]: this.fb.array([]),
    });
  }

  loadAttributeOptions(): void {
    this.attributeRepository
      .getAndPaginate({})
      .subscribe((data: Attribute[]) => {
        this.attributeOptions = data;
      });
  }
  getAttributes(): FormArray {
    return this.productForm.get(FieldNames.Attributes) as FormArray;
  }
  addAttribute(): void {
    const attributeFormGroup = this.fb.group({
      name: '',
      values: [[]],
    });
    this.getAttributes().push(attributeFormGroup);
  }
  onAttributeSelect(attributeId: Attribute, index: number): void {
    const values =
      this.attributeOptions.find((attr) => attr.id === attributeId.id)
        ?.values || [];

    const attributeFormGroup = this.attributes.at(index);
    attributeFormGroup.get('values')?.setValue(values.map((val) => val.value));
  }

  get attributes(): FormArray {
    return this.productForm.get('attributes') as FormArray;
  }

  createValue(i: any): void {
    console.log(i);
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.images.push(file);
    }
  }

  onImageMouseOver(file: Image) {
    this.buttonEl.toArray().forEach((el) => {
      el.nativeElement.id === file.name
        ? (el.nativeElement.style.display = 'flex')
        : null;
    });
  }

  onImageMouseLeave(file: Image) {
    this.buttonEl.toArray().forEach((el) => {
      el.nativeElement.id === file.name
        ? (el.nativeElement.style.display = 'none')
        : null;
    });
  }

  removeImage(file: Image) {
    this.images = this.images.filter((i) => i.name !== file.name);
  }

  onSubmit(): void {
    const formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }
    formData.append('product', JSON.stringify(this.productForm.value));

    this.productFacade.postProduct(formData);
  }
}
