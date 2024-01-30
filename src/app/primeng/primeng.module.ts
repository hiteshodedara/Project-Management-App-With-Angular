import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AvatarModule } from 'primeng/avatar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
@NgModule({
  
  exports:[
    CommonModule,
    DialogModule,
    ToastModule,
    TieredMenuModule,
    ConfirmPopupModule,
    AvatarModule,
    InputSwitchModule,
    ChipModule,
    DropdownModule,
    TooltipModule,
    MenuModule,
    MenubarModule,
    OverlayPanelModule,
    PasswordModule,
    InputTextModule,
    DynamicDialogModule
  ]
})
export class PrimengModule { }
