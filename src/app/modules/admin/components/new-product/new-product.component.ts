import { Attribute, Image } from '@Models/product.model';
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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
})
export class NewProductComponent implements OnInit {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

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

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      price: [0],
      code: [''],
      sku: [''],
      inStock: [true],
      description: [''],
      images: this.fb.array([]),
      attributes: this.fb.array([]),
    });
  }

  addNewAttribute(): void {
    if (
      this.newAttribute &&
      !this.attributeOptions.some(
        (option: Attribute) => option.value === this.newAttribute
      )
    ) {
      this.attributeOptions.push({
        label: this.newAttribute,
        value: this.newAttribute,
      });
      this.newAttribute = '';
    }

    this.displayAttributeDialog = false;
  }
  attributes(): FormArray {
    return this.productForm.get('attributes') as FormArray;
  }

  getValuesOptions(attributeIndex: number): any[] {
    return this.getValues(attributeIndex).value.map((value: string) => ({
      label: value,
      value: value,
    }));
  }

  getValues(attributeIndex: number): FormArray {
    return this.attributes().at(attributeIndex).get('values') as FormArray;
  }

  addAttribute(): void {
    const attributeFormGroup = this.fb.group({
      key: '',
      values: this.fb.array([this.fb.control('')]),
    });
    this.attributes().push(attributeFormGroup);
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

  saveProduct(): void {
    console.log(this.productForm.value);
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
}
