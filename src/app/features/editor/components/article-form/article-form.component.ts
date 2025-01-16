import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticleForm, ArticleInput } from '../../../../shared/model';

@Component({
  selector: 'app-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
})
export class ArticleFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  initialValue = input<Partial<ArticleInput>>({});
  formSubmit = output<ArticleInput>();
  disabled = input<boolean>(false);

  form!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const initValue = this.initialValue();

    this.form = this.fb.group<ArticleForm>({
      title: initValue.title ?? '',
      description: initValue.description ?? '',
      body: initValue.body ?? '',
      tagList: initValue?.tagList?.join(' ') ?? '',
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.formSubmit.emit({
      ...this.form.value,
      tagList: this.form.value.tagList.split(' '),
    });
  }
}
