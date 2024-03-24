import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { FieldNames } from '@Enums/fields.enum';
import { AttributeRoutes, ModuleRoutes } from '@Enums/routes.enum';
import { ListOptionsProps } from '@Models/list.model';
import { TableEventForm } from '@Models/table.model';
import { Observable } from 'rxjs';
import {
  Attribute,
  AttributeListItem,
} from '../../shared/models/attribute.model';
import { AttributeFacade } from '../../store/attribute.facade';

@Component({
  selector: 'inv-attribute-list',
  templateUrl: './attribute-list.component.html',
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    DynamicDialogModule,
    TranslateModule,
    RouterModule,
  ],
  providers: [DialogService, ConfirmationService],
})
export class AttributeListComponent implements OnInit {
  attributes: Observable<Attribute[]> = this.attributeFacade.selectAttributes$;
  attributeColumns: any = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
  ];
  attributeValueColumns: any = [
    { field: 'id', header: 'ID' },
    { field: 'value', header: 'Value' },
  ];

  tableForm!: TableEventForm;

  public readonly fieldNames: typeof FieldNames = FieldNames;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly confirmationService: ConfirmationService,
    private readonly attributeFacade: AttributeFacade,
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    this.tableForm = this.createForm();
    this.getAndPaginate();
  }

  getAndPaginate(): void {
    const tableValues: ListOptionsProps = this.tableForm.value;
    this.attributeFacade.getAttributes(tableValues);
  }

  onPageChange(event: PaginatorState): void {
    this.tableForm.get(FieldNames.CountPerPage)?.patchValue(event.rows);
    this.tableForm
      .get(FieldNames.PageNumber)
      ?.patchValue((event.page || 0) + 1);

    this.getAndPaginate();
  }
  createForm(): TableEventForm {
    const form: unknown = this.formBuilder.group({
      [FieldNames.CountPerPage]: 10,
      [FieldNames.PageNumber]: 1,
      [FieldNames.TotalRecords]: 0,
      [FieldNames.PageCount]: 0,
      [FieldNames.SortOrder]: 'ASC',
      [FieldNames.SortField]: 'id',
    });
    return <TableEventForm>form;
  }

  deleteAttribute(attribute: Attribute): void {
    this.confirmationService.confirm({
      message: `${this.translateService.instant('ATTRIBUTE.DELETE.CONFIRM')} ${
        attribute.name
      }?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attributeFacade.deleteAttribute(attribute.id);
      },
    });
  }

  editAttribute(attribute: AttributeListItem): void {
    this.router.navigate([
      `${ModuleRoutes.Admin}/${ModuleRoutes.Attributes}/${attribute.id}/${AttributeRoutes.Edit}`,
    ]);
  }
}
