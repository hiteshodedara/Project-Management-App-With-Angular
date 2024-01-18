import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { Workspace } from 'src/app/models/workspace';
import { AppState } from 'src/app/ngRxStore/app.state';
import { addBoard, loadBoards } from 'src/app/ngRxStore/boards/board.actions';
import { selectBoards } from 'src/app/ngRxStore/boards/board.selectors';
import { loadWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';

@Component({
  selector: 'app-boardhome',
  templateUrl: './boardhome.component.html',
  styleUrls: ['./boardhome.component.sass']
})
export class BoardhomeComponent implements OnInit {
  Workspaces$ = this.store.select(selectWorkspaces);
  Workspaces!: Workspace[];
  selected_workspce!: Workspace;


  boardform!: FormGroup;
  visible_addBoard: boolean = false;

  currunt_boards$!:Observable<Board[]>;
  board_length!:number;

  constructor(private store: Store<AppState>) {
    this.initialize_workspaces();
   }

  ngOnInit() {
    this.initialize_workspaces();
    this.form_Initialize()
      this.Workspaces$.subscribe((res: Workspace[]) => {
        this.Workspaces = res;
        if(res[0]){
          this.selected_workspce = res[0]
          // console.log(this.selected_workspce);
          this.on_select_workspace()
        }
        
      });
      
    
  }

  form_Initialize() {
    this.boardform = new FormGroup({
      boardTitle: new FormControl(''),
      boardDesc: new FormControl(''),
      isFavorite: new FormControl(false),
      isArchive: new FormControl(false),

    })
  }


 
  //loading all workspce form ngrx store
  loadWorkspacesOnStore() {
    this.store.dispatch(loadWorkspaces());
  }

  initialize_workspaces() {
    this.loadWorkspacesOnStore()
    this.Workspaces$.subscribe(res => {
      this.Workspaces = res
    })
  }

  on_select_workspace(){
  if(this.selected_workspce.id)
   this.loadBoards(this.selected_workspce.id)
  }

  loadBoards(id:number){
    this.store.dispatch(loadBoards({workspaceId:id}))
    this.currunt_boards$ =this.store.select(selectBoards)
    this.currunt_boards$.subscribe(res=>{
      this.board_length=res.length
      // console.log(res);
      
    })    
  }

  on_addBoard_show() {
    this.visible_addBoard = true;
  }
  
  on_addBoard() {
    const board_val = this.boardform.value;
    if (this.selected_workspce){
    if (board_val.boardTitle != '' && board_val.boardDesc != '') {
      
      const tempBoard: Board = {
        title: board_val.boardTitle,
        description: board_val.boardTitle,
        isArchive: board_val.isArchive,
        isFavorite: board_val.isFavorite,
      }
      
      const w_id = this.selected_workspce.id
      if(w_id){
        this.store.dispatch(addBoard({ workspaceId: w_id, newBoard: tempBoard }))
      }
      console.log(tempBoard);
      
      this.visible_addBoard = false;
      this.form_Initialize()
    } else {
      console.warn("enter all fields");

    }}else{
      console.warn("select workspace first after you can do!!!");
      
    }


  }
}
