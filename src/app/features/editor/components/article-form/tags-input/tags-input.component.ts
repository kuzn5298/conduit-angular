import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tags-input',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './tags-input.component.html',
  styleUrl: './tags-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagsInputComponent,
      multi: true,
    },
  ],
})
export class TagsInputComponent implements ControlValueAccessor {
  separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  tags = signal<string[]>([]);
  disabled = signal<boolean>(false);

  _onChange: any = () => {};

  onChange(tags: string[]) {
    this._onChange(tags);
    this.tags.set(tags);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value ?? '').trim();

    if (value) {
      const newTags = [...this.tags(), value];
      this.onChange(newTags);
    }

    event.chipInput.clear();
  }

  remove(tag: string): void {
    const newTags = this.tags().filter((t) => t !== tag);
    this.onChange(newTags);
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    const newTags = this.tags().map((t) => (t === tag ? value : t));
    this.onChange(newTags);
  }

  writeValue(tags: string[]): void {
    this.tags.set(tags);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
