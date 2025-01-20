import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Comment } from '../../../../../shared/model/comment.interface';
import { getAvatarPlaceholder } from '../../../../../shared/utils';
import { Profile } from '../../../../../shared/model';

@Component({
  selector: 'app-comment',
  imports: [RouterLink, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  comment = input.required<Comment>();

  getAvatar(author: Profile): string {
    return getAvatarPlaceholder(author?.image ?? null, author?.username);
  }
}
