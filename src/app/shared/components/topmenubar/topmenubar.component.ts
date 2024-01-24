import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, MessageService } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/ngRxStore/app.state';
import { loadWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-topmenubar',
  templateUrl: './topmenubar.component.html',
  styleUrls: ['./topmenubar.component.sass'],
  providers: [MessageService]
})
export class TopmenubarComponent implements OnInit {
  topmenuItems: MenuItem[] = [];
  profilemenuItems: MenuItem[] = [];
  createButtonItems: MenuItem[] = [];
  topMenu_workspace_items: MenuItem[] = [];
  currunt_workspace_id!: number;

  @ViewChild('createButtonMenu') createbuttonmenu!: TieredMenu;

  @Output() on_currunt_workspaceChange = new EventEmitter<number>();

  constructor(private store: Store<AppState>, private messageService: MessageService,
    private boardService: BoardService) { }

  ngOnInit() {
    this.getworkspaceId();
    //tommorow thing
    console.log("menu_w_id:", this.currunt_workspace_id);
    this.boardService.getAllBoards(this.currunt_workspace_id).subscribe(res => {
      console.log("topmenu", res);

    })
    this.store.dispatch(loadWorkspaces());
    this.makeWorkspacesMenu();
  }

  menuBarInitialize() {



    this.topmenuItems = [
      {
        label: 'Workspaces',
        items: this.topMenu_workspace_items &&
          this.topMenu_workspace_items.length > 0 ? this.topMenu_workspace_items :
          [{ label: 'No workspace available' }],

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
        styleClass: 'createbtn',
        command: () => {
          if (this.createbuttonmenu) {
            this.createbuttonmenu.toggle(event);
          }
        }
      }
    ];

    this.profilemenuItems = [
      { label: 'Profile', icon: 'pi pi-id-card' },
      { label: 'Settings', icon: 'pi pi-cog' },
      {
        label: 'Sign Out', icon: 'pi pi-sign-out', command: () => {
          localStorage.removeItem('loginuser')
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `You Now Logged out!`, life: 3000 });
          setTimeout(() => {
            location.reload()
          }, 1000);
        }
      }
    ];

    this.createButtonItems = [
      { label: 'Create Workspace' },
      { label: 'Create Board' },
    ]
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

  getworkspaceId() {
    const ls_id = localStorage.getItem('workspace_id')
    if (ls_id) {
      this.currunt_workspace_id = parseInt(atob(ls_id))
    }
  }
}
