import { CommentsResponse } from './../../model/comments-response';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  getCommentsAction,
  getCommentsFailureAction,
  getCommentsSuccessAction,
} from '../actions/getComments.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { CommentsService } from '../../../services/comment.service';

@Injectable()
export class GetCommentsEffect {
  actions$ = inject(Actions);
  commentsService = inject(CommentsService);
  store = inject(Store);

  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommentsAction),
      switchMap(({ articleId }) => {
        return this.commentsService.getComments(articleId).pipe(
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
