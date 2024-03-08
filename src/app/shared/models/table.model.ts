import { FormControl, FormGroup } from '@angular/forms';

import { FieldNames } from '@Enums/fields.enum';

type ControlValueMapping = {
  [FieldNames.CountPerPage]: number;
  [FieldNames.PageNumber]: number;
  [FieldNames.TotalRecords]: number;
  [FieldNames.PageCount]: number;
  [FieldNames.SortOrder]: string;
  [FieldNames.SortField]: string;
};
type ControlWithType<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
type TableEventFormControls = ControlWithType<ControlValueMapping>;
export interface TableEventForm extends FormGroup, TableEventFormControls {}
export interface TableValues {
  sortField?: string;
  sortOrder?: string;
  countPerPage?: number;
  pageNumber?: number;
  totalRecords?: number;
  pageCount?: number;
}
export interface TableColumn {
  field: string;
  header: string;
}
export interface TableData {
  data: unknown[];
  translationResource: string;
}
