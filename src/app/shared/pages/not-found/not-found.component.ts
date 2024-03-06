import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `<p>{{ 'SHARED.PAGES.404' | translate }}</p>`,
  standalone: true,
  imports: [TranslateModule],
})
export class NotFoundComponent {}
