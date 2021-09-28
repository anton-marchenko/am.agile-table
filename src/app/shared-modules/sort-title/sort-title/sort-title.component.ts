import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sort-title',
  templateUrl: './sort-title.component.html',
  styleUrls: ['./sort-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortTitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
