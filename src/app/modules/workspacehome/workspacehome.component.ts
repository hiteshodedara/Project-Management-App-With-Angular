import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Workspace } from 'src/app/models/workspace';
import { addWorkspace, deleteWorkspace, loadWorkspaces, updateWorkspace } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';
import { AuthuserService } from 'src/app/services/authuser.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspacehome',
  templateUrl: './workspacehome.component.html',
  styleUrls: ['./workspacehome.component.sass'],
  providers: [MessageService, ConfirmationService]
})
export class WorkspacehomeComponent implements OnInit {

  workspaces$ = this.store.select(selectWorkspaces);


  visible_addWorkspace: boolean = false;
  visible_updateWorkspace: boolean = false;
  show_workspace_info: boolean = false;
  workspce_item_setting_menu: MenuItem[] | undefined;

  


  workspaceform: FormGroup = new FormGroup({
    workspacetitle: new FormControl(''),
    workspacedis: new FormControl('')
  });

  constructor(private store: Store<Workspace>, private workspaceService: WorkspaceService,
    private authuser: AuthuserService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }



  ngOnInit(): void {
    this.loadWorkspacesOnStore();
    this.initialize_workspace_item_menu()
  }

  loadWorkspacesOnStore() {
    this.store.dispatch(loadWorkspaces());
  }

  initialize_workspace_item_menu() {
    this.workspce_item_setting_menu = [
      {
        label: 'Show Info',
        icon: 'pi pi-align-left',
        command: () => {
          this.show_workspace_info_dialogbox()
        }

      },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command:()=>{
          this.show_workspace_update_dialogbox()
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.delete_workspce_currunt_item();
        }
      }
    ]
  }

  show_addWorkspace() {
    this.visible_addWorkspace = true;
  }

  update_title_input!:string|undefined;
  update_desc_input!:string|undefined;
  show_workspace_update_dialogbox() {
    this.update_title_input=this.c_selected_item?.title
    this.update_desc_input =this.c_selected_item?.description
    this.visible_updateWorkspace = true;
  }


  show_workspace_info_dialogbox() {
    this.show_workspace_info = true;
  }

  on_addWorkspace() {
    if (this.workspaceform.value.workspacetitle != null && this.workspaceform.value.workspacedis != null) {
      const tempworkspace: Workspace = {
        title: this.workspaceform.value.workspacetitle,
        description: this.workspaceform.value.workspacedis,
        boards: []
      }
      this.store.dispatch(addWorkspace({ newWorkspace: tempworkspace }))
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${tempworkspace.title} Workspace Added Successfully!` });
      this.visible_addWorkspace = false;
      this.workspaceform.reset()

    } else {
      console.warn("enter all filds....");
    }
  }

  on_updateWorkspace() {
    if (this.c_selected_item&&this.workspaceform.value.workspacetitle != null && this.workspaceform.value.workspacedis != null) {
      const tempworkspace: Workspace = {
        title: this.workspaceform.value.workspacetitle,
        description: this.workspaceform.value.workspacedis,
        boards: this.c_selected_item?.boards
      }
      if(this.c_selected_item?.id)
      this.store.dispatch(updateWorkspace({ updatedWorkspace: tempworkspace,workspaceId:this.c_selected_item.id }))
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${tempworkspace.title} Workspace Updated Successfully!` });
      this.visible_updateWorkspace = false;
      this.workspaceform.reset()

    } else {
      console.warn("enter all filds....");
    }
  }



  delete_workspce_currunt_item() {
    this.confirmationService.confirm({
      target: this.c_selected_event?.target as EventTarget,
      message: 'Are you sure you want to Delete Workspace?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Your ${this.c_selected_item?.title} Workspace Deleted!`, life: 3000 });
        if (this.c_selected_item?.id) {
          this.store.dispatch(deleteWorkspace({ workspaceId: this.c_selected_item.id }))
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Your Workspace Not Deleted', life: 3000 });
      }
    });
  }

  c_selected_item?: Workspace;
  c_selected_event?: Event;

  slected_item_data(event: Event, item: Workspace) {
    this.c_selected_item = item
    this.c_selected_event = event
  }

  test_selector(){

  }

}
