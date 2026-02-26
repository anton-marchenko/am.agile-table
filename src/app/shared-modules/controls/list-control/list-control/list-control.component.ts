import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dictionary } from '@shared/models/dictionary';
import { ResponseState } from '@shared/models/response-state';
import { trackByFn } from '@shared/utils/track-by.utils';

@Component({
    selector: 'am-list-control',
    templateUrl: './list-control.component.html',
    styleUrls: ['./list-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ListControlComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class ListControlComponent<T> implements OnInit, ControlValueAccessor {
  @Input() multiple = false;
  @Input() dictionary: ResponseState<Dictionary<T>> | null = null;

  disabled = false;
  selectedItems: unknown | null = null;

  readonly trackByFn = trackByFn;

  private onChange = (v: unknown) => {};
  private onTouched = () => {};

  constructor(private readonly cd: ChangeDetectorRef) {}

  registerOnChange(fn: (v: unknown) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  writeValue(outsideValue: unknown) {
    this.selectedItems = outsideValue;

    this.cd.markForCheck();
  }

  changeValue(selectedItems: unknown) {
    this.selectedItems = selectedItems;
    this.onChange(selectedItems);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
