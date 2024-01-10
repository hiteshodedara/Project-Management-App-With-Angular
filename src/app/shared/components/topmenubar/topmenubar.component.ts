import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-topmenubar',
  templateUrl: './topmenubar.component.html',
  styleUrls: ['./topmenubar.component.sass']
})
export class TopmenubarComponent implements OnInit {

  // main manu variable
  topmenuItems: MenuItem[] | undefined;

  // TieredMenus variables
  profilemenuItems: MenuItem[] | undefined;
  workspacemenuItems: MenuItem[] | undefined;
  recentmenuItems: MenuItem[] | undefined;
  starredmenuItems: MenuItem[] | undefined;


  // get html elements property
  @ViewChild('workspacemenu') workspacemenu!: TieredMenu;
  @ViewChild('recentmenu') recentmenu!: TieredMenu;
  @ViewChild('starredmenu') starredmenu!: TieredMenu;


  ngOnInit() {
    // topmenubar menu item details
    this.topmenuItems = [
      {
        label: 'Workspaces',
        icon: 'pi pi-chevron-down',
        command: () => {
          this.toggleWorkspacemenu(this.workspacemenu)
        }

      },
      {
        label: 'Recent',
        icon: 'pi pi-chevron-down',
        command: () => {
          this.toggleRecentmenu(this.recentmenu)
        }

      },
      {
        label: 'Starred',
        icon: 'pi pi-chevron-down',
        command: () => {
          this.toggleStarredmenu(this.starredmenu)
        }
      }
    ];

    // profile menu item details
    this.profilemenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-id-card',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
      }
    ];

    // workspace menuitem decleration
    this.workspacemenuItems = [
      {
        label: 'New Workspace',
        icon: 'pi pi-plus',
        routerLink: '/a/workspacehome'
      },
      {
        label: 'workspaces',
        icon:'pi pi-clone',
        items: [
          {
            label: 'workspace 1',
          },
          {
            label: 'workspace 2',
          }
        ]
      }
    ];

     // resent menuitem decleration
     this.recentmenuItems = [
      {
        label:'no any recent menus'
      }
    ];

    // resent menuitem decleration
    this.starredmenuItems = [
      {
        label:'no any Starred menus'
      }
    ];
  }

  // for workspce menu
  toggleWorkspacemenu(workspacemenu: TieredMenu) {
    workspacemenu.toggle(event);
  }

  // for workspce menu
  toggleRecentmenu(recentmenu: TieredMenu) {
    recentmenu.toggle(event);
  }

  // for workspce menu
  toggleStarredmenu(starredmenu: TieredMenu) {
    starredmenu.toggle(event);
  }

}
