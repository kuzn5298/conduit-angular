import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Comment } from '../../../../../shared/model/comment.interface';
import { getAvatarPlaceholder } from '../../../../../shared/utils';
import { Profile } from '../../../../../shared/model';
import { select, Store } from '@ngrx/store';
import { userSelector } from '../../../../../core/store';
import { map } from 'rxjs';
import { AvatarComponent } from '../../../../../shared/components/avatar/avatar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comment',
  imports: [
    RouterLink,
    DatePipe,
    AvatarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
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
