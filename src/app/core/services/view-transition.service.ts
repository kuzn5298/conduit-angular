import { Injectable, signal } from '@angular/core';

type TransitionType = 'route' | 'theme' | 'none';

@Injectable({
  providedIn: 'root',
})
export class ViewTransitionService {
  transitionType = signal<TransitionType>('none');
}
