import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorState } from './editor-state.interface';

export const editorSelector = createFeatureSelector<EditorState>('editor');

export const isSubmittingEditorSelector = createSelector(
  editorSelector,
  (editorState: EditorState) => editorState.isSubmitting
);

export const isLoadingEditorSelector = createSelector(
  editorSelector,
  (editorState: EditorState) => editorState.isLoading
);

export const errorsEditorSelector = createSelector(
  editorSelector,
  (editorState: EditorState) => editorState.errors
);

export const articleEditorSelector = createSelector(
  editorSelector,
  (editorState: EditorState) => editorState.article
);
