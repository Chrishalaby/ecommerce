import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private readonly messageService: MessageService) {}

  showMessage(message: Message): void {
    this.messageService.add({
      summary: message.summary,
      severity: message.severity || 'error',
      detail: message.detail,
      key: message.key || 'global-toast',
      life: message.life || 3400,
      sticky: message.sticky || false,
      closable: message.closable || true,
    });
  }

  showSuccessMessage(name: string, event: string): void {
    this.showMessage({
      detail: `${name} ${event} successfully`,
      severity: 'success',
      summary: 'Success',
    });
  }
}
