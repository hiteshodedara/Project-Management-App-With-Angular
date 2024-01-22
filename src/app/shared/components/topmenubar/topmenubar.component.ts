import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/ngRxStore/app.state';
import { loadWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';

@Component({
  selector: 'app-topmenubar',
  templateUrl: './topmenubar.component.html',
  styleUrls: ['./topmenubar.component.sass']
})
export class TopmenubarComponent implements OnInit {
  topmenuItems: MenuItem[] = [];
  profilemenuItems: MenuItem[] = [];
  topMenu_workspace_items: MenuItem[] = [];

  @Output() on_currunt_workspaceChange = new EventEmitter<number>();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadWorkspaces());
    this.makeWorkspacesMenu();
  }

  menuBarInitialize() {
    this.topmenuItems = [
      {
        label: 'Workspaces',
        items: this.topMenu_workspace_items,
        command: () => this.makeWorkspacesMenu()
      },
      {
        label: 'Recent',
        items: [{ label: 'No recent menus' }]
      },
      {
        label: 'Starred',
        items: [{ label: 'No starred menus' }]
      },
      {
        label: 'Create',
        styleClass: 'createbtn'
      }
    ];

    this.profilemenuItems = [
      { label: 'Profile', icon: 'pi pi-id-card' },
      { label: 'Settings', icon: 'pi pi-cog' },
      { label: 'Sign Out', icon: 'pi pi-sign-out',command:()=>{
        localStorage.removeItem('loginuser')
        location.reload()
      } }
    ];
  }

  makeWorkspacesMenu() {
    this.topMenu_workspace_items = [];

    this.store
      .select(selectWorkspaces)
      .pipe(
        map(workspaces =>
          workspaces.map(workspace => (
            
            {
            label: workspace.title,
            routerLink: `/w/boardhome/${workspace.id}`,
            command: () => this.emitTheData(workspace.id)
          }))
        )
      )
      .subscribe(menuItems => {
        this.topMenu_workspace_items = menuItems;
      });
      // console.log(this.topMenu_workspace_items);

    // Delay the menuBarInitialize to make sure the topMenu_workspace_items is updated.
    setTimeout(() => {
      this.menuBarInitialize();
    }, 1);
  }

  emitTheData(id?: number) {
    this.on_currunt_workspaceChange.emit(id);
  }
}
