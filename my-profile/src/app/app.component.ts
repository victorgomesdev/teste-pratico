import { Component } from '@angular/core';
import { LayoutComponent } from '@components/layout/layout.component';
import { ButtonModule } from 'primeng/button'

import { Card } from '@components/card/card.component';

const IMPORTS = [
  LayoutComponent,
  ButtonModule,
  Card
]

@Component({
  selector: 'app-root',
  imports: [...IMPORTS],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Usuários';
}
