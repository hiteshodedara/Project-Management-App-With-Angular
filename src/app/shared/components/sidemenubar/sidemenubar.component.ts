// sidemenubar.component.ts

import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { AppState } from 'src/app/ngRxStore/app.state';
import { setCurrentBoardId } from 'src/app/ngRxStore/boardID/boardID.actions';
import { addBoard, loadBoards } from 'src/app/ngRxStore/boards/board.actions';
import { selectBoards } from 'src/app/ngRxStore/boards/board.selectors';

@Component({
  selector: 'app-sidemenubar',
  templateUrl: './sidemenubar.component.html',
  styleUrls: ['./sidemenubar.component.sass']
})
export class SidemenubarComponent implements OnInit, OnChanges {
  @Output() sidebar_close = new EventEmitter();
  @Input() c_workspace_id!: number;


  @ViewChild('addboardformpanel') addBoardFormPanel!: OverlayPanel;

  sidebar_menu_item: MenuItem[] | undefined;
  boardsItems: MenuItem[] = [];
  currunt_boards$: Observable<Board[]> = this.store.select(selectBoards);

  addBoardForm!:FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAndMakeBoards();
    this.addboardform_Initialize()
    // console.log("workspace_id in sidebar:", this.c_workspace_id);
  }






  ngOnChanges(changes: SimpleChanges): void {
    if (changes['c_workspace_id']) {
      // console.log("Workspace Id Changed");
      // console.log("workspace_id in sidebar:", this.c_workspace_id);

      this.setWorkspaceId()

      this.loadBoards();

    }
  }

  loadAndMakeBoards() {
    this.setWorkspaceId();
    this.loadBoards();
  }

  addboardform_Initialize() {
    this.addBoardForm = new FormGroup({
      boardTitle: new FormControl(''),
      boardDesc: new FormControl(''),
      isFavorite: new FormControl(false),
    })
  }

  loadBoards() {
    if (isNaN(this.c_workspace_id)) {
      const wId = localStorage.getItem("workspace_id")
      if (wId) {
        this.c_workspace_id = parseInt(atob(wId));
        // console.log("id:",this.c_workspace_id);
        
        this.loadBoards()
      }

    } else {
      this.store.dispatch(loadBoards({ workspaceId: this.c_workspace_id }));
      setTimeout(() => {
        this.makeBoardsMenuItems();
      }, 100);
    }
  }

  makeBoardsMenuItems() {
    this.boardsItems = [];

    setTimeout(() => {
      this.currunt_boards$.pipe(
        map(boards => boards.map(board => ({
          label: board.title,
          id:board.id,
          routerLink: `/b/board/${this.c_workspace_id}/${board.id}`,

        })))
      ).subscribe(menuItems => {
        const b_menuitems =[menuItems];
        this.boardsItems = [];
        
       b_menuitems.map(item=>{
          item.forEach(item=>{
           const temomenuitem:MenuItem={
            label:item.label,
            routerLink:item.routerLink,
            command:()=>{
              this.Emite_event_boardChange(item.id)      
            }}

            this.boardsItems.push(temomenuitem)
          })
        })

        
        this.onSidebarMenuInitialize()

      });
      // console.log("boards item:", this.boardsItems);

    }, 20);
  }

  onSidebarMenuInitialize() {
    this.sidebar_menu_item = [
      {
        label: 'Dashboard',
        items: [
          { label: 'Boards', icon: 'pi pi-table', routerLink: `/w/boardhome/${this.c_workspace_id}` },
          { label: 'Members', icon: 'pi pi-users', routerLink: '/w/members' },
          { label: 'Workspace Settings', icon: 'pi pi-cog', routerLink: '/w/settings' }
        ]
      },
      {
        label: `Your Boards`,
        items: this.boardsItems &&this.boardsItems.length > 0 ? this.boardsItems : [{label:'no boards available'}]
      }
    ];

  }

  onSidebarClose() {
    this.sidebar_close.emit();
  }

  setWorkspaceId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.c_workspace_id = parseInt(id, 10)
    } else {
      const val = location.pathname
      const ans = val.split('/')
      
      // console.log(ans);
      
      if (ans[1] != 'w') return
      else{

        if (ans[2] != 'boardhome') return
        else{
          this.c_workspace_id = parseInt(ans[3])
          const encriptid: string = btoa(this.c_workspace_id.toString())
          // console.log("storeage updated");
          
          localStorage.setItem("workspace_id", encriptid)
        }
      }
    }
  }

  on_addBoard(){






    const board_val = this.addBoardForm.value;
    if (this.c_workspace_id) {
      if (board_val.boardTitle != '' && board_val.boardDesc != '') {

        const tempBoard: Board = {
          title: board_val.boardTitle,
          description: board_val.boardTitle,
          isFavorite: board_val.isFavorite,
        }

        const w_id = this.c_workspace_id
        // console.log("w_id", w_id);
        if (w_id) {
          this.store.dispatch(addBoard({ workspaceId: w_id, newBoard: tempBoard }))
        }
        // console.log(tempBoard);
        this.addBoardFormPanel.hide()
        this.addboardform_Initialize()

      } else {
        console.warn("enter all fields");
      }
    }    
  }

  Emite_event_boardChange(boardID?:number){
    if(boardID){
      this.store.dispatch(setCurrentBoardId({boardId:boardID}))
    }
  }
}
