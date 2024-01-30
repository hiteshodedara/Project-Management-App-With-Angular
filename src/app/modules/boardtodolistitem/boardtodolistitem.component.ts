import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-boardtodolistitem',
  templateUrl: './boardtodolistitem.component.html',
  styleUrls: ['./boardtodolistitem.component.sass'],
  providers: [DialogService, ConfirmationService, MessageService]

})
export class BoardtodolistitemComponent {

}
