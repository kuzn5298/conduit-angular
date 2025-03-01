import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  getCommentsAction,
  getCommentsFailureAction,
  getCommentsSuccessAction,
} from '../actions/getComments.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { CommentService } from '../../../services/comment.service';
import { CommentsResponse } from '../../../../shared/model';

@Injectable()
export class GetCommentsEffect {
  actions$ = inject(Actions);
  commentService = inject(CommentService);
  store = inject(Store);

  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommentsAction),
      switchMap(({ articleId }) => {
        return this.commentService.getComments(articleId).pipe(
          map(({ comments }: CommentsResponse) => {
            return getCommentsSuccessAction({ comments });
          }),
          catchError(() => {
            return of(getCommentsFailureAction());
          })
        );
      })
    )
  );
}
