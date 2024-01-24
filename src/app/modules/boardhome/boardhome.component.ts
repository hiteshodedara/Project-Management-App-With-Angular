import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { AppState } from 'src/app/ngRxStore/app.state';
import { addBoard, deleteBoard, loadBoards, updateBoard } from 'src/app/ngRxStore/boards/board.actions';
import { selectBoards } from 'src/app/ngRxStore/boards/board.selectors';

@Component({
  selector: 'app-boardhome',
  templateUrl: './boardhome.component.html',
  styleUrls: ['./boardhome.component.sass'],
  providers: [MessageService, ConfirmationService]
})
export class BoardhomeComponent implements OnInit {

  selected_workspce!: number;
  boardform!: FormGroup;
  visible_addBoard: boolean = false;
  visible_updateBoard: boolean = false;
  show_board_item_info:boolean=false;
  board_item_setting_menu!: MenuItem[];
  currunt_boards$!: Observable<Board[]>;
  board_length!: number;

  constructor(private store: Store<AppState>, private activetedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) {
  }

  ngOnInit() {

    this.addform_Initialize()
    this.initialize_board_itemsetting_menu()
    this.getWorkspaceId()
    setTimeout(() => {
      this.loadBoards(this.selected_workspce)
    }, 50);
  }

  addform_Initialize() {
    this.boardform = new FormGroup({
      boardTitle: new FormControl(''),
      boardDesc: new FormControl(''),
      isFavorite: new FormControl(false),

    })
  }

  getWorkspaceId() {
    const val = location.pathname
    const ans = val.split('/')
    this.selected_workspce = parseInt(ans[3])
    // console.log("workspace_id in boardhome:",this.selected_workspce);

  }

  // initializing menu for setting workspce btn
  initialize_board_itemsetting_menu() {
    this.board_item_setting_menu = [
      {
        label: 'Show Info',
        icon: 'pi pi-align-left',
        command: () => {
          this.show_board_item_info=true
        }

      },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: () => {
          this.show_board_update_dialogbox()
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.delete_board_currunt_item();
        }
      }
    ]
  }

  //this variable for setting menu 
  c_selected_item?: Board;//this store currunt selected workspce item
  c_selected_event?: Event;//this store currunt selected event for show dialog box

  //set the value for this variables
  slected_item_data(event: Event, item: Board) {
    this.c_selected_item = item
    this.c_selected_event = event
  }


  loadBoards(id: number) {
    this.store.dispatch(loadBoards({ workspaceId: id }))
    this.currunt_boards$ = this.store.select(selectBoards)
    this.currunt_boards$.subscribe(res => {
      this.board_length = res.length

    })
  }

  on_addBoard_show() {
    this.visible_addBoard = true;
  }

  on_addBoard() {
    this.getWorkspaceId()

    const board_val = this.boardform.value;
    if (this.selected_workspce) {
      if (board_val.boardTitle != '' && board_val.boardDesc != '') {

        const tempBoard: Board = {
          title: board_val.boardTitle,
          description: board_val.boardTitle,
          isFavorite: board_val.isFavorite,
        }

        const w_id = this.selected_workspce
        console.log("w_id", w_id);
        if (w_id) {
          this.store.dispatch(addBoard({ workspaceId: w_id, newBoard: tempBoard }))
        }
        console.log(tempBoard);

        this.visible_addBoard = false;
        this.addform_Initialize()
      } else {
        console.warn("enter all fields");

      }
    } else {
      console.warn("select workspace first after you can do!!!");

    }
  }

  show_board_update_dialogbox() {
    this.boardform = new FormGroup({
      boardTitle: new FormControl(this.c_selected_item?.title),
      boardDesc: new FormControl(this.c_selected_item?.description),
      isFavorite: new FormControl(this.c_selected_item?.isFavorite),
    })

    // console.log("updateform:",this.boardform.value);
    
    this.visible_updateBoard = true
  }

  on_updateBoard() {
    this.getWorkspaceId()
    const board_val = this.boardform.value;
    if (board_val.boardTitle != '' && board_val.boardDesc != '') {

      const tempBoard: Board = {
        title: board_val.boardTitle,
        description: board_val.boardDesc,
        isFavorite: board_val.isFavorite,
      }

    
      console.log(tempBoard);
      
      const w_id = this.selected_workspce
      if (this.c_selected_item?.id) {
        this.store.dispatch(updateBoard({
          workspaceId: w_id, updatedBoard: tempBoard,
          boardId: this.c_selected_item?.id
        }))
      }
      // console.log(tempBoard);

      this.visible_updateBoard = false;
      
    }
  }

  delete_board_currunt_item() {
    this.confirmationService.confirm({
      target: this.c_selected_event?.target as EventTarget,
      message: 'Are you sure you want to Delete Board?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Your ${this.c_selected_item?.title} Board Deleted!`, life: 3000 });
        if (this.c_selected_item?.id) {
          this.store.dispatch(deleteBoard({
            workspaceId: this.selected_workspce,
            boardId: this.c_selected_item.id
          }));
          console.log("board deleted successfully");

        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Your Board Not Deleted', life: 3000 });
      }
    });
  }
}
