import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidemenubar',
  templateUrl: './sidemenubar.component.html',
  styleUrls: ['./sidemenubar.component.sass']
})
export class SidemenubarComponent {
 

  @Output() sidebar_close=new EventEmitter();

  on_sidebar_close(){
    this.sidebar_close.emit()
  }
}
