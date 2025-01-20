import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommentService } from '../../../services/comment.service';
import {
  deleteCommentAction,
  deleteCommentFailureAction,
  deleteCommentSuccessAction,
} from '../actions';
import { commentsSelector } from '../selectors';

@Injectable()
export class DeleteCommentEffect {
  actions$ = inject(Actions);
  commentService = inject(CommentService);
  router = inject(Router);
  store = inject(Store);

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCommentAction),
      withLatestFrom(this.store.pipe(select(commentsSelector))),
      switchMap(([{ articleId, commentId }, comments]) => {
        return this.commentService.deleteComment(articleId, commentId).pipe(
          map(() => {
            const newComments =
              comments?.filter((comment) => comment.id !== commentId) ?? [];
            return deleteCommentSuccessAction({ comments: newComments });
          }),
          catchError(() => {
            return of(deleteCommentFailureAction());
          })
        );
      })
    )
  );
}
