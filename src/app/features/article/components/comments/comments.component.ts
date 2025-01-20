import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { userSelector } from '../../../../core/store/user/selectors';
import { User } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { CommentComponent } from './comment/comment.component';
import {
  commentsSelector,
  getCommentsAction,
  isLoadingCommentsSelector,
} from '../../../../core/store';

@Component({
  selector: 'app-comments',
  imports: [AsyncPipe, CommentComponent, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  user$ = this.store.pipe(select(userSelector));
  isLoading$ = this.store.pipe(select(isLoadingCommentsSelector));
  comments$ = this.store.pipe(select(commentsSelector));

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(getCommentsAction({ articleId: id }));
  }

  addComment(form: HTMLFormElement): void {
    const comment = (form[0] as HTMLInputElement)?.value;
    form.reset();
    console.log('Add comment:', comment);
  }

  getAvatar(user: User | null): string {
    return getAvatarPlaceholder(user?.image ?? null, user?.username);
  }
}
