import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ArticleInput } from '../../../../shared/model';
import { MarkdownEditorComponent } from '../../../../shared/components/markdown-editor/markdown-editor.component';
import { TagsInputComponent } from './tags-input/tags-input.component';

@Component({
  selector: 'app-article-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MarkdownEditorComponent,
    TagsInputComponent,
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);

  initialValue = input<Partial<ArticleInput>>({});
  formSubmit = output<ArticleInput>();
  disabled = input<boolean>(false);

  form!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.toggleForm();
    }
  }

  toggleForm() {
    if (this.disabled()) {
      this.form?.disable();
    } else {
      this.form?.enable();
    }
  }

  initializeForm() {
    const initValue = this.initialValue();

    this.form = this.fb.group({
      title: initValue.title ?? '',
      description: initValue.description ?? '',
      body: initValue.body ?? '',
      tagList: new FormControl<string[]>(initValue?.tagList ?? []),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.formSubmit.emit({
      ...this.form.value,
    });
  }
}
