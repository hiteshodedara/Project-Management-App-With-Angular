import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { Todolist } from 'src/app/models/todolist';
import { Workspace } from 'src/app/models/workspace';
import { AppState } from 'src/app/ngRxStore/app.state';
import { setCurrentBoardId } from 'src/app/ngRxStore/boardID/boardID.actions';
import { favoriteToggle } from 'src/app/ngRxStore/boards/board.actions';
import { addTodoList, loadArchivedTodoLists, loadTodoLists, loadUnArchivedTodoLists } from 'src/app/ngRxStore/todolists/todolist.actions';
import { selectArchivedTodolists, selectTodolists, selectUnArchivedTodolists } from 'src/app/ngRxStore/todolists/todolist.selectors';
import { BoardService } from 'src/app/services/board.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-board-show',
  templateUrl: './board-show.component.html',
  styleUrls: ['./board-show.component.sass'],
  providers: [MessageService, ConfirmationService]
})
export class BoardShowComponent implements OnInit {
  currunt_boardId!: number;
  currunt_workspaceId!: number;
  currunt_boardObject?: Board;
  currunt_workspaceObject?: Workspace;

  addTodolistForm!: FormGroup;

  addTodolistDialogBoxShow: boolean = false;


  all_todolists$: Observable<Todolist[]> = this.store.select(selectUnArchivedTodolists)

  items: MenuItem[] | undefined;
  constructor(
    private activetedRoute: ActivatedRoute,
    private boardService: BoardService,
    private workspaceService: WorkspaceService,
    private activatedrouter: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.setBoardId()
    this.getBoardId();
    this.getWorkspaceId();
    this.get_all_TodoLists()

  }

  getWorkspaceId() {
    this.activatedrouter.params.subscribe(res => {
      this.currunt_workspaceId = res['wid']
      // console.log("w id:",this.currunt_workspaceId);

    })
  }

  getworkspaceObject(workspaceID: number) {

    this.workspaceService.getWorkspaceById(workspaceID).subscribe(res => {
      this.currunt_workspaceObject = res
    })
  }

  getBoardId() {
    this.store.select('boardid').subscribe((BoardidState) => {
      this.currunt_boardId = BoardidState.currentBoardId;
      this.getWorkspaceId();
      this.get_all_TodoLists();
      this.getBoardObject()
    });
  }

  setBoardId() {
    const b_id = this.activetedRoute.snapshot.paramMap.get('bid');
    if (b_id) {
      this.store.dispatch(setCurrentBoardId({ boardId: parseInt(b_id) }));
    }
  }

  getBoardObject() {
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


  get_all_TodoLists() {
    this.store.dispatch(loadUnArchivedTodoLists({ boardId: this.currunt_boardId, workspaceId: this.currunt_workspaceId }))
  }

  Initialize_addTodolistForm() {
    this.addTodolistForm = new FormGroup({
      todolistname: new FormControl('')
    })
  }

  on_addTodolistDialogbox_Show() {
    this.addTodolistDialogBoxShow = true;
    this.Initialize_addTodolistForm()
  }

  on_addTodolistFormSubmit() {
    const todolistdata = this.addTodolistForm.value
    if (todolistdata.todolistname != '') {
      let tempindex = 0
      this.all_todolists$.subscribe(res => {
        tempindex = res.length + 1
      })

      const tempkey: string = todolistdata.todolistname

      const tempTodolist = {
        name: todolistdata.todolistname,
        todolistKey: tempkey.toLowerCase(),
        todolistIndex: tempindex,
        isArchive: false
      }

      this.store.dispatch(addTodoList({boardId:this.currunt_boardId,
                                      workspaceId:this.currunt_workspaceId,
                                      newTodoList:tempTodolist}))

      
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Your ${tempTodolist.name} Todolist Added!`, life: 3000 });
      this.addTodolistDialogBoxShow=false;

    } else {
      console.error("enter all filds!");

    }
  }

}
