import { Component } from '@angular/core';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.sass']
})
export class AuthorizedComponent {

  sidebar_show:boolean = true;
  close_sidebar(){
    this.sidebar_show=false;
  }

}
