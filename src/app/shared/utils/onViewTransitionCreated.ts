import { ViewTransitionInfo } from '@angular/router';

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
};
