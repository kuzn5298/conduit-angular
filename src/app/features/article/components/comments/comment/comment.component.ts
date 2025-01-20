import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Comment } from '../../../../../shared/model/comment.interface';
import { getAvatarPlaceholder } from '../../../../../shared/utils';
import { Profile } from '../../../../../shared/model';
import { select, Store } from '@ngrx/store';
import { userSelector } from '../../../../../core/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-comment',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
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
