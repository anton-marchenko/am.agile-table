import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SortDirection } from '@shared/models/common/sort-column.type';
import { Nullish } from '@shared/models/common/nullish';

@Component({
  selector: 'app-sort-title',
  templateUrl: './sort-title.component.html',
  styleUrls: ['./sort-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortTitleComponent implements OnInit {
  @Input() dir: SortDirection = null;
  @Input() sortable: Nullish<boolean> = false;
  @Output() sortChanges = new EventEmitter<{ dir: SortDirection }>();

  constructor() {}

  ngOnInit(): void {}

  sort() {
    this.dir = this.dir === null ? 'asc' : this.dir === 'asc' ? 'desc' : null;

    this.sortChanges.emit({ dir: this.dir });
  }
}
