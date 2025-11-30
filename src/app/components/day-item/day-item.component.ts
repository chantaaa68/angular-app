import { Component, Input } from '@angular/core';
import { DayItem } from '../../../model/weekItem';

@Component({
  selector: 'app-day-item',
  imports: [],
  templateUrl: './day-item.component.html',
  styleUrl: './day-item.component.css',
})
export class DayItemComponent {
  @Input() item!: DayItem;
}
