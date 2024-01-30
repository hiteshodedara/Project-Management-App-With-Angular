import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { Todolist } from 'src/app/models/todolist';
import { Workspace } from 'src/app/models/workspace';
import { AppState } from 'src/app/ngRxStore/app.state';
import { setCurrentBoardId } from 'src/app/ngRxStore/boardID/boardID.actions';
import { favoriteToggle } from 'src/app/ngRxStore/boards/board.actions';
import { loadTodoLists } from 'src/app/ngRxStore/todolists/todolist.actions';
import { selectTodolists } from 'src/app/ngRxStore/todolists/todolist.selectors';
import { BoardService } from 'src/app/services/board.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-board-show',
  templateUrl: './board-show.component.html',
  styleUrls: ['./board-show.component.sass']
})
export class BoardShowComponent implements OnInit {
  currunt_boardId!: number;
  currunt_workspaceId!: number;
  currunt_boardObject?: Board;
  currunt_workspaceObject?: Workspace;

  all_todolists:Observable<Todolist[]>=this.store.select(selectTodolists)

  items: MenuItem[] | undefined;
  constructor(
    private activetedRoute: ActivatedRoute,
    private boardService: BoardService,
    private workspaceService: WorkspaceService,
    private activatedrouter: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.setBoardId()
    this.getBoardId();
    this.getWorkspaceId();
    this.get_all_TodoLists()


    setTimeout(() => {
      

        // Fetch board details based on the updated boardId
       
    }, 500);
  }

  getWorkspaceId() {
    this.activatedrouter.params.subscribe(res=>{
      this.currunt_workspaceId=res['wid']
      // console.log("w id:",this.currunt_workspaceId);
      
    })
  }

  getworkspaceObject(workspaceID: number) {

    this.workspaceService.getWorkspaceById(workspaceID).subscribe(res => {
      this.currunt_workspaceObject = res
    })
  }

  getBoardId(){
    this.store.select('boardid').subscribe((boardidstate) => {
      this.currunt_boardId = boardidstate.currentBoardId;
      this.getWorkspaceId();
      this.get_all_TodoLists();
      this.getBoardObject()
    });
  }

  setBoardId() {
    const b_id = this.activetedRoute.snapshot.paramMap.get('bid');
    if (b_id) {
      this.store.dispatch(setCurrentBoardId({ boardId: parseInt(b_id)}));
    }
  }

  getBoardObject(){
    this.getWorkspaceId();
    this.boardService.getBoardById(this.currunt_workspaceId, this.currunt_boardId).subscribe(res => {
      this.currunt_boardObject = res;
    });
  }

  on_click_FavoriteToggle(boardId?: number) {
    this.getWorkspaceId()
    if (boardId) {
      this.store.dispatch(favoriteToggle({ workspaceId: this.currunt_workspaceId, boardId }))
      console.log("favorite toggled");
      this.ngOnInit()
    }
  }


  get_all_TodoLists(){
    this.store.dispatch(loadTodoLists({boardId:this.currunt_boardId,workspaceId:this.currunt_workspaceId}))
  }
}
