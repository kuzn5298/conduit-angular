import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { MarkdownEditorControlsComponent } from './markdown-editor-controls/markdown-editor-controls.component';

@Component({
  selector: 'app-markdown-editor',
  imports: [
    MatCardModule,
    ToggleButtonComponent,
    FormsModule,
    MarkdownPipe,
    MarkdownEditorControlsComponent,
  ],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MarkdownEditorComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorComponent
  implements AfterViewChecked, ControlValueAccessor
{
  textarea = viewChild.required<ElementRef<HTMLTextAreaElement>>('textarea');
  placeholder = input<string>('');

  markdownText = signal<string>('');
  isPreview = signal<boolean>(false);
  isFocus = signal<boolean>(false);
  isDisabled = signal<boolean>(false);
  textareaRef = signal<ElementRef<HTMLTextAreaElement> | null>(null);

  ngAfterViewChecked() {
    if (this.isPreview()) {
      this.textareaRef.set(null);
    } else if (!this.textareaRef()) {
      this.textareaRef.set(this.textarea());
    }
  }

  _onChange: any = () => {};

  onChange(text: string) {
    this._onChange(text);
    this.markdownText.set(text);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
  }

  togglePreview() {
    this.isPreview.update((state) => !state);
  }

  writeValue(value: any): void {
    this.markdownText.set(value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(): void {}

  setDisabledState?(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }
}
