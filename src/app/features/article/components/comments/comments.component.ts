import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { toSignal } from '@angular/core/rxjs-interop';
import { userSelector } from '../../../../core/store/user/selectors';
import { CommentComponent } from './comment/comment.component';
import {
  addCommentAction,
  commentsSelector,
  deleteCommentAction,
  deletingCommentIdSelector,
  getCommentsAction,
  isLoadingCommentsSelector,
  isSubmittingCommentsSelector,
} from '../../../../core/store';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-comments',
  imports: [
    CommentComponent,
    FormsModule,
    AvatarComponent,
    MatButtonModule,
    MatCardModule,
    LoadingComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  user = toSignal(this.store.select(userSelector));
  isLoading = toSignal(this.store.select(isLoadingCommentsSelector));
  isSubmitting = toSignal(this.store.select(isSubmittingCommentsSelector));
  comments = toSignal(this.store.select(commentsSelector));
  deletingCommentId = toSignal(this.store.select(deletingCommentIdSelector));

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    const articleId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(getCommentsAction({ articleId }));
  }

  addComment(form: HTMLFormElement): void {
    const articleId = this.route.snapshot.paramMap.get('id') ?? '';
    const text = (form[0] as HTMLInputElement)?.value;
    form.reset();
    this.store.dispatch(addCommentAction({ articleId, text }));
  }

  deleteComment(commentId: number): void {
    const articleId = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(deleteCommentAction({ commentId, articleId }));
  }
}
