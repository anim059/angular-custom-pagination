import { Component } from '@angular/core';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaginatorV2Component } from './components/paginator-v2/paginator-v2.component';
import { PaginatorV3Component } from './components/paginator-v3/paginator-v3.component';
import { PaginatorV4Component } from './components/paginator-v4/paginator-v4.component';
import { PaginatorV5Component } from './components/paginator-v5/paginator-v5.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaginatorComponent, PaginatorV2Component, PaginatorV3Component, PaginatorV4Component, PaginatorV5Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'customize-paginator';

  onPageChange(page: number) {

  }
}
