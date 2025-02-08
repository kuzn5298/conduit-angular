import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonGroupComponent } from '../../button-group/button-group.component';
import {
  formatText,
  getSelectPosition,
  getSelectText,
} from './markdown-editor-controls.helpers';
import { FORMAT_BUTTONS } from './markdown-editor-controls.constants';

@Component({
  selector: 'app-markdown-editor-controls',
  imports: [ButtonGroupComponent, MatButtonModule, MatIconModule],
  templateUrl: './markdown-editor-controls.component.html',
  styleUrl: './markdown-editor-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorControlsComponent {
  elementRef = input<ElementRef<HTMLTextAreaElement> | null>(null);
  disabled = input<boolean>(false);
  value = input.required<string>();
  change = output<string>();

  formatButtons = FORMAT_BUTTONS;

  actionControl(action: string) {
    const element = this.elementRef()?.nativeElement;
    if (!element) {
      return;
    }

    const [start, end] = getSelectPosition(element);
    const [selectedText, beforeText, afterText] = getSelectText(
      this.value(),
      start,
      end
    );
    const formattedText = formatText(selectedText, action);
    const newText = `${beforeText}${formattedText}${afterText}`;
    this.change.emit(newText);

    setTimeout(() => {
      element.selectionStart = element.selectionEnd = start + newText.length;
      element.focus();
    }, 50);
  }
}
