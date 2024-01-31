import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { Todolist } from 'src/app/models/todolist';
import { AppState } from 'src/app/ngRxStore/app.state';
import {  toggletodolistArchiveStatus, updateTodoList } from 'src/app/ngRxStore/todolists/todolist.actions';

@Component({
  selector: 'app-boardtodolist',
  templateUrl: './boardtodolist.component.html',
  styleUrls: ['./boardtodolist.component.sass'],
  providers: [MessageService, ConfirmationService]
})
export class BoardtodolistComponent implements OnInit{
  @Input() todolist!:Todolist;
  @Input() allTodoLists!:Observable<Todolist[]>

  @Input() curruntWorkspaceId!:number;
  @Input() curruntBoardId!:number;

  DropDownItems=[{}]


  updateTodolistDialogBoxShow:boolean=false;

  updateTodolistForm!:FormGroup;

  curruntSaveTodolistItem!:Todolist;

  todolistItemSetting!:MenuItem[];

  constructor(private store: Store<AppState>,
    private messageService2: MessageService,
    private confirmationService: ConfirmationService,
    ){

  }

ngOnInit(): void {
    this.initailize_TodolistitemSetting_Menu()
  this.make_updateTodolistIndexDropdownItems()
}

  initailize_TodolistitemSetting_Menu(){
    this.todolistItemSetting=[
      {
        label:"Archive List",
        command:()=>{
          this.on_TodolistArchived_Click(this.curruntSaveTodolistItem.id)
        }
      }, 
      {
        label: "Update Todolist",
        command: () => {
          this.on_Show_updateTodoListDialogbox()
        }
      }
    ]
  }

  

  on_save_CurruntTodolist(item:Todolist){
    this.curruntSaveTodolistItem=item
  }


  on_TodolistArchived_Click(id?: number) {
    if (id && this.curruntWorkspaceId && this.curruntBoardId) {

      
      
      this.messageService2.add({ severity: 'info', summary: 'Confirmed', detail: `Your ${this.curruntSaveTodolistItem.name} Todolist Archivedd!`, life: 3000 });
      this.store.dispatch(toggletodolistArchiveStatus({boardId:this.curruntBoardId,todoListId:id,workspaceId:this.curruntWorkspaceId}))

    } else {
      console.warn("don't have todolist id?!");

    }
  }

  on_Show_updateTodoListDialogbox(){
    this.Initialize_updateTodolistForm()
    this.make_updateTodolistIndexDropdownItems()
    this.updateTodolistDialogBoxShow=true;

  }

  Initialize_updateTodolistForm() {
    this.updateTodolistForm = new FormGroup({
      todolistname: new FormControl(this.curruntSaveTodolistItem.name),
      todolistisArchive: new FormControl(this.curruntSaveTodolistItem.isArchive),
      todolistIndex:new FormControl(this.curruntSaveTodolistItem.todolistIndex),
      todolistKey:new FormControl(this.curruntSaveTodolistItem.todolistKey)
    })

    
  }

  make_updateTodolistIndexDropdownItems(){
    this.allTodoLists.pipe(
      map(items => items.map((item, index) => ({ itemindex: item.todolistIndex, listindex: index+1 })))
    ).subscribe(res => {
      this.DropDownItems = res;
      // console.log(res);
    });

  }

  on_updateTodolistFormSubmit(){
      
    if(this.updateTodolistForm.dirty){
      const temptodolist={
        name:this.updateTodolistForm.value.todolistname,
        todolistIndex:this.updateTodolistForm.value.todolistIndex,
        isArchive:this.updateTodolistForm.value.todolistisArchive,
        todolistKey: this.updateTodolistForm.value.todolistKey,
      }
      if(this.curruntSaveTodolistItem.id)
      this.store.dispatch(updateTodoList({boardId:this.curruntBoardId,todoListId:this.curruntSaveTodolistItem.id,
      updatedTodoList:temptodolist,workspaceId:this.curruntWorkspaceId}))      
      console.log("success");
      this.updateTodolistDialogBoxShow=false;
      

    }else{
      console.error("change the value and Try");
      
    }
  }

}
