import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'am-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true,
    },
  ],
})
export class DateControlComponent implements OnInit {
  @Input() type: 'time' | 'datetime-local' | 'date' = 'datetime-local';

  disabled = false;
  value: unknown | null = null;

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
    this.value = outsideValue;

    this.cd.markForCheck();
  }

  changeValue(selectedItems: unknown) {
    this.value = selectedItems;
    this.onChange(selectedItems);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
