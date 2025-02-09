import { computed, Injectable, signal } from '@angular/core';

export type TransitionType = 'route' | 'theme';

@Injectable({
  providedIn: 'root',
})
export class ViewTransitionService {
  private type = signal<TransitionType>('route');

  transitionType = computed(() => this.type());

  setTransitionType(type: TransitionType) {
    this.type.set(type);
  }

  resetTransitionType() {
    this.type.set('route');
  }
}
