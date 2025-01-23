import { Component, computed, input } from '@angular/core';

const getPlaceholderURL = (username: string = '') =>
  `https://avatar.iran.liara.run/public/boy?username=${username}`;

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  name = input.required<string>();
  image = input<string | null>();

  src = computed(() => {
    return this.image() || getPlaceholderURL(this.name());
  });
}
