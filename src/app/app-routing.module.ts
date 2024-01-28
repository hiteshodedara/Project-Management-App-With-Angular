import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';
import { secureloginpageGuard } from './guards/secureloginpage.guard';
import { LoginpageComponent } from './modules/loginpage/loginpage.component';
import { RegisterpageComponent } from './modules/registerpage/registerpage.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { AuthorizedComponent } from './layouts/authorized/authorized.component';
import { loginaccessGuard } from './guards/loginaccess.guard';
import { WorkspacehomeComponent } from './modules/workspacehome/workspacehome.component';
import { WorkspaceComponent } from './layouts/workspace/workspace.component';
import { BoardhomeComponent } from './modules/boardhome/boardhome.component';
import { WorkspacemembersComponent } from './modules/workspacemembers/workspacemembers.component';
import { WorkspaceSettingComponent } from './modules/workspace-setting/workspace-setting.component';
import { BoardComponent } from './layouts/board/board.component';
import { BoardShowComponent } from './modules/board-show/board-show.component';


const routes: Routes = [
{path:'',redirectTo:'u',pathMatch:'full'},
  {path:'u'
  ,component:UnauthorizedComponent
  ,canActivate:[secureloginpageGuard]
  ,children:[
    {path:'',redirectTo:'loginpage',pathMatch:'full'},
    {path:'loginpage',component:LoginpageComponent},
    {path:'registerpage',component:RegisterpageComponent},
    {path:'forgotpasswordpage',component:ForgotPasswordComponent},

  ]},
  {path:'a'
  ,component:AuthorizedComponent
  ,canActivate:[loginaccessGuard]
  ,children:[
  {path:'',redirectTo:'workspacehome',pathMatch:'full'},
  {path:"workspacehome",component:WorkspacehomeComponent},
]},
{
  path:'w'
  ,component:WorkspaceComponent
  ,canActivate:[loginaccessGuard]
  ,children:[
    { path: '', redirectTo: 'boardhome', pathMatch: 'full' },
    { path: "boardhome/:w_id", component: BoardhomeComponent },
    { path: "members", component: WorkspacemembersComponent },
    { path: "settings", component: WorkspaceSettingComponent },
  ]
},
  {
    path: 'b'
    , component: BoardComponent
    , canActivate: [loginaccessGuard]
    , children: [
      { path: "board/:wid/:bid", component: BoardShowComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
