import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { AppState } from 'src/app/ngRxStore/app.state';
import { addBoard, loadBoards } from 'src/app/ngRxStore/boards/board.actions';
import { selectBoards } from 'src/app/ngRxStore/boards/board.selectors';

@Component({
  selector: 'app-boardhome',
  templateUrl: './boardhome.component.html',
  styleUrls: ['./boardhome.component.sass']
})
export class BoardhomeComponent implements OnInit{

  selected_workspce!:number;
  boardform!: FormGroup;
  visible_addBoard: boolean = false;

  currunt_boards$!:Observable<Board[]>;
  board_length!:number;

  constructor(private store: Store<AppState>,private activetedRoute:ActivatedRoute) {
   }

  ngOnInit() {
    
    this.form_Initialize()
    this.getWorkspaceId() 
    setTimeout(() => {
      this.loadBoards(this.selected_workspce)
    }, 50);
  }

  form_Initialize() {
    this.boardform = new FormGroup({
      boardTitle: new FormControl(''),
      boardDesc: new FormControl(''),
      isFavorite: new FormControl(false),
      isArchive: new FormControl(false),

    })
  }

  getWorkspaceId(){
    const val = location.pathname
    const ans = val.split('/')
    this.selected_workspce = parseInt(ans[3])
    console.log("workspace_id in boardhome:",this.selected_workspce);
    
  }


 



  loadBoards(id:number){
    this.store.dispatch(loadBoards({workspaceId:id}))
    this.currunt_boards$ =this.store.select(selectBoards)
    this.currunt_boards$.subscribe(res=>{
      this.board_length=res.length     
       
    })    
  }

  on_addBoard_show() {
    this.visible_addBoard = true;
  }
  
  on_addBoard() {
    this.getWorkspaceId()
    
    const board_val = this.boardform.value;
    if (this.selected_workspce){
      if (board_val.boardTitle != '' && board_val.boardDesc != '') {
        
        const tempBoard: Board = {
          title: board_val.boardTitle,
          description: board_val.boardTitle,
          isArchive: board_val.isArchive,
          isFavorite: board_val.isFavorite,
        }
        
        const w_id = this.selected_workspce
        console.log("w_id",w_id);
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
