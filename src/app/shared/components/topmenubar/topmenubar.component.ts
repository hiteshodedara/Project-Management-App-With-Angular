import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { TieredMenu } from 'primeng/tieredmenu';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { Workspace } from 'src/app/models/workspace';
import { AppState } from 'src/app/ngRxStore/app.state';
import { setCurrentBoardId } from 'src/app/ngRxStore/boardID/boardID.actions';
import { addBoard } from 'src/app/ngRxStore/boards/board.actions';
import { addWorkspace, loadWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';
import { AuthuserService } from 'src/app/services/authuser.service';
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
  currunt_user_object: any;

  currunt_createt_button_event!: Event | null;
  resent_BoardsItems: MenuItem[] = [];

  userlogoname!: string;
  curruntUserName!: string;

  User_infoSetting_form!: FormGroup;

  user_profile_dialogbox_show: boolean = false;
  user_profile_setting_dialogbox_show: boolean = false;
  addWorkspace_DialogShow: boolean = false;
  addBoard_DialogShow: boolean = false;

  @ViewChild('createButtonMenu') createbuttonmenu!: TieredMenu;

  @Output() on_currunt_workspaceChange = new EventEmitter<number>();

  constructor(private store: Store<AppState>,
    private messageService: MessageService,
    private boardService: BoardService,
    private authService: AuthuserService) { }

  ngOnInit() {
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
        items: this.resent_BoardsItems &&
          this.resent_BoardsItems.length > 0 ? this.resent_BoardsItems :
          [{ label: 'No workspace available' }],
        command: () => {
          this.Creating_recent_menuItems();
        }
      },
      {
        label: 'Starred',
        items: [{ label: 'No Starred menus' }]
      },
      {
        label: 'Create',
        styleClass: 'createbtn',
        command: () => {
          this.make_createBtn_tierdMenu();
        }
      }
    ];

    this.profilemenuItems = [
      { label: 'Profile', icon: 'pi pi-id-card', command: () => { this.show_ProfileDialogBox() } },
      { label: 'Settings', icon: 'pi pi-cog', command: () => { this.show_ProfileSettingDialogBox() } },
      {
        label: 'Sign Out', icon: 'pi pi-sign-out', command: () => {
          localStorage.removeItem('loginuser');
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `You Now Logged out!`, life: 3000 });
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }
    ];
  }

  make_createBtn_tierdMenu() {
    // Save the event
    if (window.event)
      this.currunt_createt_button_event = window.event;

    // Toggle the menu
    this.createbuttonmenu.toggle(this.currunt_createt_button_event);

    this.createButtonItems = [
      {
        label: 'Create Workspace',
        command: () => {
          this.show_addWorkspaceDialogBox()
        }
      },
      {
        label: 'Create Board',
        command: () => {
          this.show_addBoardDialogBox()
        }
      },
    ];
  }

  makeWorkspacesMenu() {
    this.topMenu_workspace_items = [];
    this.Creating_recent_menuItems();
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
        this.Creating_recent_menuItems();
      });

    // Delay the menuBarInitialize to make sure the topMenu_workspace_items is updated.
    setTimeout(() => {
      this.menuBarInitialize();
    }, 500);

    this.getworkspaceId();
    this.getcurruntUserData();
  }

  emitTheData(id?: number) {
    this.on_currunt_workspaceChange.emit(id);
  }

  getworkspaceId() {
    const ls_id = localStorage.getItem('workspace_id');
    if (ls_id) {
      this.currunt_workspace_id = parseInt(atob(ls_id));
    }
  }

  getcurruntUserData() {
    const ls_token = localStorage.getItem('loginuser');
    if (ls_token) {
      const token = JSON.parse(ls_token);
      this.authService.getUserInfoByToken(token).subscribe(res => {
        this.currunt_user_object = res;
        const currunt_username: string = this.currunt_user_object.username;
        this.userlogoname = currunt_username.split(' ').map(w => w.charAt(0)).join('').toUpperCase();
        this.setUserName();
      });
    }
  }

  setUserName() {
    const name: string = this.currunt_user_object.username;
    this.curruntUserName = name.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  Creating_recent_menuItems() {
    this.boardService.getalldatabaseBoards().pipe(map(boards =>
      boards.map(item =>
      ({
        label: item.title,
        routerLink: `/b/board/${item.workspaceId}/${item.id}`,
        command: () => this.Emite_event_boardChange(item.id)
      })
      )
    )
    ).subscribe(res => {
      this.resent_BoardsItems = res.reverse();
      // console.log("res:", res);

      this.menuBarInitialize();
    });

    setTimeout(() => {
      this.menuBarInitialize();
    }, 500);
  }

  Emite_event_boardChange(boardID?: number) {
    if (boardID) {
      this.store.dispatch(setCurrentBoardId({ boardId: boardID }));
    }
  }

  show_ProfileDialogBox() {
    this.user_profile_dialogbox_show = true;
  }

  show_ProfileSettingDialogBox() {
    this.user_profile_setting_dialogbox_show = true;
    this.Initailize_UserInfo_Form();
  }

  on_Update_UserInfo_Submite() {
    if (this.User_infoSetting_form.dirty) {
      this.authService.updateUser(this.User_infoSetting_form.value, this.currunt_user_object.role, this.currunt_user_object.id).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `User Updated Successfully`, life: 3000 });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Server Error', detail: `User Not Updated!`, life: 3000 });
      });
      this.user_profile_setting_dialogbox_show = false;
    } else {
      console.error("Enter fields!");
    }
  }



  show_addWorkspaceDialogBox() {
    this.addWorkspace_DialogShow = true;
    this.Initialize_addWorkspaceForm();
  }


  show_addBoardDialogBox() {
    this.addBoard_DialogShow = true;
    this.Initialize_addBoardForm();
  }


  Initailize_UserInfo_Form() {
    this.User_infoSetting_form = new FormGroup({
      username: new FormControl(this.currunt_user_object.username),
      email: new FormControl(this.currunt_user_object.email),
      password: new FormControl(this.currunt_user_object.password),
    });
  }


  workspaceform!: FormGroup;
  Initialize_addWorkspaceForm() {
    this.workspaceform = new FormGroup({
      workspacetitle: new FormControl(''),
      workspacedis: new FormControl(''),
      isPrivate: new FormControl<boolean>(true)
    });
  }


  boardform!: FormGroup;
  Initialize_addBoardForm() {
    this.boardform = new FormGroup({
      boardTitle: new FormControl(''),
      boardDesc: new FormControl(''),
      isFavorite: new FormControl(false),

    })
    this.getworkspaceId()
  }

  on_addBoardForm_Submite() {
    const b_item = this.boardform.value
    if (b_item.boardTitle != '' && b_item.boarddesc != '') {
      const tempboard:Board = {
        title: b_item.boardTitle,
        description: b_item.boardDesc,
        isFavorite: b_item.isFavorite,
      }
      this.store.dispatch(addBoard({ workspaceId: this.currunt_workspace_id, newBoard: tempboard }))
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Board Added Successfully`, life: 3000 });
      this.addBoard_DialogShow=false;
      
    } else {
      console.error("enter the filds!");

    }
  }

  on_addWorkspaceForm_Submite() {
    const w_item=this.workspaceform.value
    if(w_item.workspacetitle != '' && w_item.workspacedis != ''){
      const tempworkspace: Workspace = {
        title: w_item.workspacetitle,
        description: w_item.workspacedis,
        isPrivate: w_item.isPrivate
      }

      this.store.dispatch(addWorkspace({ newWorkspace: tempworkspace }));//call ngrx add action for add workspace
      
      this.messageService.add({ severity: 'success', summary: 'Success', 
      detail: `${tempworkspace.title} Workspace Added Successfully!` });
      this.addWorkspace_DialogShow=false;
    }else{
      console.error("enter filds!");
      
    }
    


  }
}
