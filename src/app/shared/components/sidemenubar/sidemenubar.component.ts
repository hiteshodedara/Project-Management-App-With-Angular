import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidemenubar',
  templateUrl: './sidemenubar.component.html',
  styleUrls: ['./sidemenubar.component.sass']
})
export class SidemenubarComponent implements OnInit{
 
  sidebar_menu_item: MenuItem[] | undefined;

  @Output() sidebar_close=new EventEmitter();

ngOnInit(): void {
    this.on_sidebar_menu_initalize()
}

on_sidebar_menu_initalize() {
  this.sidebar_menu_item=[
    {
      label: 'WorkSpace',
      items: [
        {
          label: 'WorkSpaces',
          icon: 'pi pi-tablet',
          routerLink: '/a/workspacehome'
        },
        {
          label: 'Boards',
          icon: 'pi pi-table',
          routerLink: '/a/boardhome'
        },
        {
          label: 'Members',
          icon: 'pi pi-users',
          routerLink: '/a/workspacemembers'
        }
      ]
    },
    {
      label: `Your Boards`,
      items: [
        {
          label: 'Boards',
          icon: 'pi pi-table',
          routerLink: '/a/boardshow'
        }
      ]
    },
    {
      label: 'Your Settings',
      items: [
        {
          label: 'Archive List',
          icon: 'pi pi-briefcase',
          command: () => {
          }
        }
        
      ]
    }
  ];
}
  

  on_sidebar_close(){
    this.sidebar_close.emit()
  }
}
