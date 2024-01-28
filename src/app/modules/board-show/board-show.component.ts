import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Board } from 'src/app/models/board';
import { Workspace } from 'src/app/models/workspace';
import { AppState } from 'src/app/ngRxStore/app.state';
import { setCurrentBoardId } from 'src/app/ngRxStore/boardID/boardID.actions';
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
  items: MenuItem[] | undefined;
  constructor(
    private activetedRoute: ActivatedRoute,
    private boardService: BoardService,
    private workspaceService: WorkspaceService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getWorkspaceId();
    this.getBoardId();

    setTimeout(() => {
      this.store.select('boardid').subscribe((boardidstate) => {
        this.currunt_boardId = boardidstate.currentBoardId;

        // Fetch board details based on the updated boardId
        this.getWorkspaceId();
        this.boardService.getBoardById(this.currunt_workspaceId, this.currunt_boardId).subscribe(res => {
          this.currunt_boardObject = res;
        });
      });
    }, 800);
  }

  getWorkspaceId() {
    const ls_id = localStorage.getItem('workspace_id');
    if (ls_id) {
      this.currunt_workspaceId = parseInt(atob(ls_id));
      this.getworkspaceObject(this.currunt_workspaceId)
    }
  }

  getworkspaceObject(workspaceID: number) {
    this.workspaceService.getWorkspaceById(workspaceID).subscribe(res => {
      this.currunt_workspaceObject = res
    })
  }

  getBoardId() {
    const b_id = this.activetedRoute.snapshot.paramMap.get('id');
    if (b_id) {
      this.currunt_boardId = parseInt(b_id);
      this.store.dispatch(setCurrentBoardId({ boardId: this.currunt_boardId }));
    }
  }
}
