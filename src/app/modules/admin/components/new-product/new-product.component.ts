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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductFacade],
})
export class NewProductComponent implements OnInit {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  readonly fieldNames: typeof FieldNames = FieldNames;

  // product: Product = {
  //   name: '',
  //   price: 0,
  //   code: '',
  //   sku: '',
  //   inStock: true,
  //   description: '',
  //   images: [],
  //   attributes: [],
  // };

  images: any[] = [];

  productForm!: FormGroup;
  attributeOptions: Attribute[] = [];

  newAttribute: string = '';
  newValue: string = '';
  displayValueDialog: boolean = false;
  currentAttributeIndex: number = -1;

  displayAttributeDialog: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productFacade: ProductFacade
  ) {}

  ngOnInit(): void {
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
      [FieldNames.Images]: this.fb.array([]),
      [FieldNames.Attributes]: this.fb.array([]),
    });
  }

  addNewAttribute(): void {
    if (
      this.newAttribute &&
      !this.attributeOptions.some((option) => option.name === this.newAttribute)
    ) {
      const attributeToAdd: Partial<Attribute> = {
        name: this.newAttribute,
      };

      // this.attributeService.createAttribute(attributeToAdd).subscribe({
      //   next: (response: any) => {
      //     this.attributeOptions.push(response);
      //     this.newAttribute = '';
      //     this.displayAttributeDialog = false;
      //   },
      // });
    }
  }

  getValuesOptions(attributeIndex: number): any[] {
    return this.getValues(attributeIndex).value.map((value: string) => ({
      label: value,
      value: value,
    }));
  }

  getValues(attributeIndex: number): FormArray {
    return this.getAttributes().at(attributeIndex).get('values') as FormArray;
  }

  getAttributes(): FormArray {
    return this.productForm.get(FieldNames.Attributes) as FormArray;
  }

  addAttribute(): void {
    const attributeFormGroup = this.fb.group({
      key: '',
      values: this.fb.array([this.fb.control('')]),
    });
    this.getAttributes().push(attributeFormGroup);
  }

  addNewValue(attributeIndex: number): void {
    if (this.newValue) {
      this.getValues(attributeIndex).push(this.fb.control(this.newValue));
      this.newValue = '';
    }
    this.displayValueDialog = false;
  }

  showValueDialog(attributeIndex: number): void {
    this.currentAttributeIndex = attributeIndex;
    this.displayValueDialog = true;
  }

  showAttributeDialog(): void {
    this.displayAttributeDialog = true;
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
    this.images = this.images.filter((i) => i !== file);
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    // this.productForm.get('images')?.setValue(this.images);
    // this.productFacade.postProduct(this.productForm.value);
  }
}
