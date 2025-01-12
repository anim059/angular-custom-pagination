import { Component } from '@angular/core';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaginatorV2Component } from './components/paginator-v2/paginator-v2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaginatorComponent, PaginatorV2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'customize-paginator';

  onPageChange(page: number) {

  }
}
