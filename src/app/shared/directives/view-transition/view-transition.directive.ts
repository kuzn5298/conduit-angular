import { computed, Directive, input } from '@angular/core';

@Directive({
  selector: '[appViewTransition]',
  standalone: true,
  host: { '[style.view-transition-name]': 'viewTransitionName()' },
})
export class ViewTransitionDirective {
  name = input.required<string>({ alias: 'appViewTransition' });

  transitionId = input<string>();
  transitionActive = input<boolean>(true);

  viewTransitionName = computed(() => {
    const uniqueName = [this.name(), this.transitionId()]
      .filter(Boolean)
      .join('-');
    return this.transitionActive() ? uniqueName : 'none';
  });
}
