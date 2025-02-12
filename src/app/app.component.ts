import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ViewTransitionDirective } from './shared/directives/view-transition/view-transition.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ViewTransitionDirective,
    MatProgressBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  scrollContainer = viewChild<ElementRef>('scrollContainer');

  router = inject(Router);
  destroyRef = inject(DestroyRef);

  loading = signal(true);

  ngOnInit(): void {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.scrollContainer()) {
        this.scrollToTop();
      }

      if (event instanceof NavigationStart) {
        this.loading.set(true);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel
      ) {
        this.loading.set(false);
      }

      if (event instanceof NavigationError) {
        this.router.navigate(['/']);
      }
    });

    this.destroyRef.onDestroy(() => routerSubscription.unsubscribe());
  }

  private scrollToTop() {
    const container = this.scrollContainer()?.nativeElement;
    if (container) {
      container.scrollTop = 0;
    }
  }
}
