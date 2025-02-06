import { createReducer, on } from '@ngrx/store';
import { CommentsState } from './comments-state.interface';
import {
  getCommentsAction,
  getCommentsFailureAction,
  getCommentsSuccessAction,
} from './actions/getComments.action';
import { clearCommentsStateAction } from './actions/comments.action';
import {
  addCommentAction,
  addCommentFailureAction,
  addCommentSuccessAction,
  deleteCommentAction,
  deleteCommentFailureAction,
  deleteCommentSuccessAction,
} from './actions';

const initialState: CommentsState = {
  isSubmitting: false,
  isLoading: false,
  comments: null,
  deletingCommentId: null,
};

export const commentsReducer = createReducer(
  initialState,
  on(
    getCommentsAction,
    (state): CommentsState => ({
      ...state,
      isLoading: true,
      comments: null,
    })
  ),
  on(
    getCommentsSuccessAction,
    (state, { comments }): CommentsState => ({
      ...state,
      isLoading: false,
      comments,
    })
  ),
  on(
    getCommentsFailureAction,
    (state): CommentsState => ({
      ...state,
      isLoading: false,
      comments: null,
    })
  ),
  on(
    addCommentAction,
    (state): CommentsState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    addCommentSuccessAction,
    (state, { comments }): CommentsState => ({
      ...state,
      isSubmitting: false,
      comments,
    })
  ),
  on(
    addCommentFailureAction,
    (state): CommentsState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    deleteCommentAction,
    (state, { commentId }): CommentsState => ({
      ...state,
      deletingCommentId: commentId,
    })
  ),
  on(
    deleteCommentSuccessAction,
    (state, { comments }): CommentsState => ({
      ...state,
      comments,
      deletingCommentId: null,
    })
  ),
  on(
    deleteCommentFailureAction,
    (state): CommentsState => ({
      ...state,
      deletingCommentId: null,
    })
  ),
  on(clearCommentsStateAction, (): CommentsState => ({ ...initialState }))
);
