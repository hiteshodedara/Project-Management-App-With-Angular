import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { map } from 'rxjs';
import { Workspace } from 'src/app/models/workspace';
import { AppState } from 'src/app/ngRxStore/app.state';
import { loadWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.actions';
import { selectWorkspaces } from 'src/app/ngRxStore/workspaces/workspace.selectors';

@Component({
  selector: 'app-topmenubar',
  templateUrl: './topmenubar.component.html',
  styleUrls: ['./topmenubar.component.sass']
})
export class TopmenubarComponent implements OnInit {

  // main manu variable
  topmenuItems: MenuItem[] | undefined;

  // TieredMenus variables
  profilemenuItems: MenuItem[] | undefined;
  
  topMenu_workspace_items:MenuItem[]=[];
  workspaces$ = this.store.select(selectWorkspaces)
  workspaces!:Workspace[];

  constructor(private store:Store<AppState>){
  }
  
  ngOnInit() {
    this.topMenu_workspace_items = [];
    this.store.dispatch(loadWorkspaces());
    this.make_workspaces_menu()
    
  }


  menuBar_Initialize() {
    // topmenubar menu item details
    this.topmenuItems = [
      {
        label: 'Workspaces',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-align-left',
            routerLink: '/a/workspacehome'
          },
          {
            label: 'workspaces',
            icon: 'pi pi-clone',
            items: this.topMenu_workspace_items
          }],
          command:()=>{
            this.ngOnInit()
          }
      },
      {
        label: 'Recent',
        items: [{ label: 'no any recent menus' }]
      },
      {
        label: 'Starred',
        items: [{ label: 'no any Starred menus' }]
      },
      {
        label:"Create",
        styleClass:"createbtn"
      }
    ];

    // profile menu item details
    this.profilemenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-id-card',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
      }
    ];
  }

   make_workspaces_menu(){
     this.workspaces$.subscribe(res => {
       this.workspaces = res
     })
     setTimeout(() => {
      //  console.log(this.workspaces);
      this.workspaces.forEach(item=>{
        const menu_item:MenuItem={
          label:item.title
        }

        this.topMenu_workspace_items.push(menu_item)
      })
      // console.log(this.topMenu_workspace_items);



       this.menuBar_Initialize()
     }, 500);
  }





}
