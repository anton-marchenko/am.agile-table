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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'am-sort-title',
  templateUrl: './sort-title.component.html',
  styleUrls: ['./sort-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortTitleComponent implements OnInit {
  @Input() set dir(dir: SortDirection) {
    this.dir$.next(dir);
  }
  @Input() sortable: Nullish<boolean> = false;
  @Output() sortChanges = new EventEmitter<{ dir: SortDirection }>();

  readonly dir$ = new BehaviorSubject<SortDirection>(null);

  constructor() {}

  ngOnInit(): void {}

  sort() {
    const oldDir = this.dir$.getValue();
    const dir = oldDir === null ? 'asc' : oldDir === 'asc' ? 'desc' : null;

    this.dir$.next(dir);

    this.sortChanges.emit({ dir });
  }
}
