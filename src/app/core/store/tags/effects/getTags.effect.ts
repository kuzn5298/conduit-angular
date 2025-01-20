import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  getTagsAction,
  getTagsFailureAction,
  getTagsSuccessAction,
} from '../actions/getTags.action';
import { TagsService } from '../../../services/tags.service';

@Injectable()
export class GetTagsEffect {
  private tagsService = inject(TagsService);
  private actions$ = inject(Actions);

  tags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTagsAction),
      mergeMap(() =>
        this.tagsService.getTags().pipe(
          map(({ tags }) => {
            return getTagsSuccessAction({ tags });
          }),
          catchError(() => {
            return of(getTagsFailureAction());
          })
        )
      )
    )
  );
}
