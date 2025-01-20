import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArticleResponse, CommentResponse } from '../../../../shared/model';
import { CommentService } from '../../../services/comment.service';
import {
  addCommentAction,
  addCommentFailureAction,
  addCommentSuccessAction,
} from '../actions';
import { select, Store } from '@ngrx/store';
import { commentsSelector } from '../selectors';

@Injectable()
export class AddCommentEffect {
  actions$ = inject(Actions);
  commentService = inject(CommentService);
  router = inject(Router);
  store = inject(Store);

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCommentAction),
      withLatestFrom(this.store.pipe(select(commentsSelector))),
      switchMap(([{ articleId, text }, comments]) => {
        return this.commentService.addComment(articleId, text).pipe(
          map(({ comment }: CommentResponse) => {
            const newComments = [comment, ...(comments ?? [])];
            return addCommentSuccessAction({ comments: newComments });
          }),
          catchError(() => {
            return of(addCommentFailureAction());
          })
        );
      })
    )
  );
}
