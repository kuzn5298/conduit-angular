import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ViewTransitionDirective } from './shared/directives/view-transition/view-transition.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ViewTransitionDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  scrollContainer = viewChild<ElementRef>('scrollContainer');

  router = inject(Router);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.scrollContainer()) {
        this.scrollToTop();
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
