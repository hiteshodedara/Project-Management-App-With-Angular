// sidemenubar.component.ts

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { AppState } from 'src/app/ngRxStore/app.state';
import { loadBoards } from 'src/app/ngRxStore/boards/board.actions';
import { selectBoards } from 'src/app/ngRxStore/boards/board.selectors';

@Component({
  selector: 'app-sidemenubar',
  templateUrl: './sidemenubar.component.html',
  styleUrls: ['./sidemenubar.component.sass']
})
export class SidemenubarComponent implements OnInit, OnChanges {
  @Output() sidebar_close = new EventEmitter();
  @Input() c_workspace_id!: number;

  sidebar_menu_item: MenuItem[] | undefined;
  boardsItems: MenuItem[] = [];
  currunt_boards$: Observable<Board[]> = this.store.select(selectBoards);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAndMakeBoards();
    
    // console.log("workspace_id in sidebar:", this.c_workspace_id);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['c_workspace_id']) {
      console.log("Workspace Id Changed");
      
      this.loadAndMakeBoards();
     
      // console.log("workspace_id in sidebar:", this.c_workspace_id);
    }
  }

  loadAndMakeBoards() {
    this.setWorkspaceId();
    this.loadBoards();
  }

  loadBoards() {
    if(isNaN(this.c_workspace_id)){
      const wId=localStorage.getItem("workspace_id")
      if(wId){
        this.c_workspace_id = parseInt(atob(wId));
        this.loadBoards()
      }

    }else{
      this.store.dispatch(loadBoards({ workspaceId: this.c_workspace_id }));
      this.makeBoardsMenuItems();
    }
  }

  makeBoardsMenuItems() {
    this.boardsItems = [];

    setTimeout(() => {
      this.currunt_boards$.pipe(
        map(boards => boards.map(board => ({
          label: board.title,
          routerLink: `/b/board/${board.id}`
        })))
      ).subscribe(menuItems => {
        this.boardsItems = menuItems;
        this.onSidebarMenuInitialize();
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
        items: this.boardsItems
      }
    ];
    
  }

  onSidebarClose() {
    this.sidebar_close.emit();
  }

  setWorkspaceId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.c_workspace_id =parseInt(id, 10)
    }else{
      const val = location.pathname
      const ans = val.split('/')
      this.c_workspace_id = parseInt(ans[3])

      if(ans[1]=='w'){

        if (ans[2] =='boardhome'){    
          const encriptid:string = btoa(this.c_workspace_id.toString()) 
          
          localStorage.setItem("workspace_id", encriptid)
        }
      }
    }
  }
}
