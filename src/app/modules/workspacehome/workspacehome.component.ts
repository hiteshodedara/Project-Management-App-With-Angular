import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Workspace } from 'src/app/models/workspace';
import { addWorkspace, deleteWorkspace, loadWorkspaces, updateWorkspace } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';
import { AuthuserService } from 'src/app/services/authuser.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspacehome',
  templateUrl: './workspacehome.component.html',
  styleUrls: ['./workspacehome.component.sass'],
  providers: [MessageService, ConfirmationService]
})
export class WorkspacehomeComponent implements OnInit, OnDestroy {

  workspaces$ = this.store.select(selectWorkspaces);//get all workspace data from ngrx store state
  Workspaces!: Workspace[];
  //for is workspace is avaliable or not
  is_workspaces_avaliable!: boolean;

  //length of workspaces
  workspace_legth!: number;


  //this variable for show dialog box on menu click 
  visible_addWorkspace: boolean = false;
  visible_updateWorkspace: boolean = false;
  show_workspace_info: boolean = false;

  //setting menu variable
  workspce_item_setting_menu: MenuItem[] | undefined;


  //this is two form variable for add and update workspace
  workspaceform!: FormGroup;
  workspace_updateForm!: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<Workspace>, private workspaceService: WorkspaceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.initializeAddWorkspaceForm()
  }



  ngOnInit(): void {
    this.initialize_workspace_item_menu();
    this.validate_isWorkspaceAvaliable();
    this.loadWorkspacesOnStore();

    // Subscribe to changes in the store
    this.subscriptions.push(
      this.workspaces$.subscribe(res => {
        this.Workspaces = res;

        // Notify the service about the changes
        this.workspaceService.updateWorkspaces(res);
      })
    );
  }

  // validating workspce is avaliable or not
  validate_isWorkspaceAvaliable() {
    this.subscriptions.push(
      this.workspaces$.subscribe(res => {

        this.workspace_legth = res.length

        if (res.length !== 0) {
          this.is_workspaces_avaliable = false
        } else {
          this.is_workspaces_avaliable = true
        }

      })
    );
  }

  //initializing add workspace form data
  initializeAddWorkspaceForm() {
    this.workspaceform = new FormGroup({
      workspacetitle: new FormControl('', Validators.required),
      workspacedis: new FormControl('', Validators.required),
      isPrivate: new FormControl<boolean>(true)
    });
  }

  //loading all workspce form ngrx store
  loadWorkspacesOnStore() {
    this.store.dispatch(loadWorkspaces());
  }

  // initializing menu for setting workspce btn
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
        command: () => {
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

  //method for show add workspace dialog box
  show_addWorkspace() {
    this.visible_addWorkspace = true;
  }


  //method for show update workspace dialog box
  show_workspace_update_dialogbox() {

    //initializing update_workspaceForm
    this.workspace_updateForm = new FormGroup({
      workspace_updated_title: new FormControl(this.c_selected_item?.title),
      workspace_updated_dis: new FormControl(this.c_selected_item?.description),
      updated_isPrivate: new FormControl(this.c_selected_item?.isPrivate)
    });

    // console.log("defultform",this.workspace_updateForm.value);//debug point



    this.visible_updateWorkspace = true;
  }

  //method for show workspace information on dialog box
  show_workspace_info_dialogbox() {
    this.show_workspace_info = true;
  }

  //this method use to add workspace in backend
  on_addWorkspace() {
    if (this.workspaceform.valid) {

      const tempworkspace: Workspace = {
        title: this.workspaceform.value.workspacetitle,
        description: this.workspaceform.value.workspacedis,
        isPrivate: this.workspaceform.value.isPrivate
      }

      this.store.dispatch(addWorkspace({ newWorkspace: tempworkspace }));//call ngrx add action for add workspace

      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${tempworkspace.title} Workspace Added Successfully!` });
      this.visible_addWorkspace = false;
      this.workspaceform.reset()
      this.initializeAddWorkspaceForm()

    } else {

      console.warn("enter all filds....");

    }


  }

  //this method use for update workspace data
  on_updateWorkspace() {

    if (this.c_selected_item
      && this.workspace_updateForm.valid) {
      // console.log("newForm:",this.workspace_updateForm.value);

      const tempworkspace: Workspace = {
        title: this.workspace_updateForm.value.workspace_updated_title,
        description: this.workspace_updateForm.value.workspace_updated_dis,
        isPrivate: this.workspace_updateForm.value.updated_isPrivate
      }

      if (this.c_selected_item?.id) {
        this.store.dispatch(updateWorkspace({ updatedWorkspace: tempworkspace, workspaceId: this.c_selected_item.id }))//calling ngrx update action
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${tempworkspace.title} Workspace Updated Successfully!` });
      this.visible_updateWorkspace = false;

    } else {
      console.warn("enter all filds....");
    }
  }


  //this method use for delete workspace form backend and also frontend
  delete_workspce_currunt_item() {
    this.confirmationService.confirm({
      target: this.c_selected_event?.target as EventTarget,
      message: 'Are you sure you want to Delete Workspace?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Your ${this.c_selected_item?.title} Workspace Deleted!`, life: 3000 });
        if (this.c_selected_item?.id) {
          this.store.dispatch(deleteWorkspace({ workspaceId: this.c_selected_item.id }));//calling ngrx delete action
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Your Workspace Not Deleted', life: 3000 });
      }
    });
  }

  //this variable for setting menu 
  c_selected_item?: Workspace;//this store currunt selected workspce item
  c_selected_event?: Event;//this store currunt selected event for show dialog box

  //set the value for this variables
  slected_item_data(event: Event, item: Workspace) {
    this.c_selected_item = item
    this.c_selected_event = event
  }


  // this for testing anything
  test_selector() {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
