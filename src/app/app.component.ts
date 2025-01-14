import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { getCurrentUserAction } from './core/store/user/actions/getCurrentUser.action';
import { isLoadingUserSelector } from './core/store/user/selectors';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  isUserLoading$: Observable<boolean> = EMPTY;

  ngOnInit() {
    this.isUserLoading$ = this.store.select(isLoadingUserSelector);
    this.store.dispatch(getCurrentUserAction());
  }
}
