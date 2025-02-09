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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  appContainer = viewChild<ElementRef>('appContainer');

  router = inject(Router);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.appContainer()) {
        this.scrollToTop();
      }
    });

    this.destroyRef.onDestroy(() => routerSubscription.unsubscribe());
  }

  private scrollToTop() {
    const container = this.appContainer()?.nativeElement;
    if (container) {
      container.scrollTop = 0;
    }
  }
}
