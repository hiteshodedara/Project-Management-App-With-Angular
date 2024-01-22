import { Component } from '@angular/core';

@Component({
  selector: 'app-authorized',
  styleUrls: ['./authorized.component.sass'],

  template: `
            <div class="row ">
            <div class="col">
                <app-topmenubar></app-topmenubar>
            </div>
        </div>
        <div class="row mainbody"> 
            <div class="col dashboard">
                <router-outlet></router-outlet>
            </div>
        </div>
  `
  
  , styles: []
})
export class AuthorizedComponent {

  sidebar_show: boolean = true;
  close_sidebar() {
    this.sidebar_show = false;
  }


  for_openSidebar() {
    this.sidebar_show = true;
  }

}
