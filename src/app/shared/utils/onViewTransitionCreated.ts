import { inject } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';
import { ViewTransitionService } from '../../core/services/view-transition.service';

export const onViewTransitionCreated = ({
  transition,
  from,
  to,
}: ViewTransitionInfo): void => {
  const prevPath = from.firstChild?.url?.[0]?.path;
  const nextPath = to.firstChild?.url?.[0]?.path;
  if (prevPath === nextPath) {
    transition.skipTransition();
  }

  const viewTransitionService = inject(ViewTransitionService);
  viewTransitionService.transitionType.set('route');

  transition.finished.finally(() => {
    viewTransitionService.transitionType.set('none');
  });
};
