import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Comment } from '../../../../../shared/model/comment.interface';
import { userSelector } from '../../../../../core/store';
import { ProfileComponent } from '../../../../../shared/components/profile/profile.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-comment',
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ProfileComponent,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  isDeleting = input<boolean>(false);
  comment = input.required<Comment>();
  delete = output<number>();

  private store = inject(Store);

  user = toSignal(this.store.select(userSelector));

  isAuthor = computed(
    () => this.comment().author.username === this.user()?.username
  );

  deleteComment(): void {
    this.delete.emit(this.comment().id);
  }
}
