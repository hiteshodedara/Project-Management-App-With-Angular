import { Component, Input } from '@angular/core';
import { Todolist } from 'src/app/models/todolist';

@Component({
  selector: 'app-boardtodolist',
  templateUrl: './boardtodolist.component.html',
  styleUrls: ['./boardtodolist.component.sass']
})
export class BoardtodolistComponent {
  @Input() todolist!:Todolist;
}
