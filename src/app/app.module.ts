import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { WorkspaceEffects } from './ngRxStore/workspaces/workspace.effects';
import { BoardEffects } from './ngRxStore/boards/board.effects';
import { TodolistEffects } from './ngRxStore/todolists/todolist.effects';
import { TodoEffects } from './ngRxStore/todos/todo.effects';
import { appReducers } from './ngRxStore/app.state';
import { UnauthorizedModule } from './layouts/unauthorized/unauthorized.module';
import { AuthorizedModule } from './layouts/authorized/authorized.module';
import { WorkspaceModule } from './layouts/workspace/workspace.module';
import { BoardModule } from './layouts/board/board.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    UnauthorizedModule,
    AuthorizedModule,
    WorkspaceModule,
    BoardModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([WorkspaceEffects, BoardEffects, TodolistEffects, TodoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
