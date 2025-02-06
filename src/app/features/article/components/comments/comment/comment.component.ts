import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Comment } from '../../../../../shared/model/comment.interface';
import { getAvatarPlaceholder } from '../../../../../shared/utils';
import { Profile } from '../../../../../shared/model';
import { select, Store } from '@ngrx/store';
import { userSelector } from '../../../../../core/store';
import { map } from 'rxjs';
import { ProfileComponent } from '../../../../../shared/components/profile/profile.component';

@Component({
  selector: 'app-comment',
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
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

  isAuthor$ = this.store
    .pipe(select(userSelector))
    .pipe(map((user) => this.comment().author.username === user?.username));

  getAvatar(author: Profile): string {
    return getAvatarPlaceholder(author?.image ?? null, author?.username);
  }

  deleteComment(): void {
    this.delete.emit(this.comment().id);
  }
}
