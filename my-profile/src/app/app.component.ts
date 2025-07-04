import { Component } from '@angular/core';
import { LayoutComponent } from '@common/layout/layout.component';

const IMPORTS = [
  LayoutComponent
]

@Component({
  selector: 'app-root',
  imports: [...IMPORTS],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'my-profile';
}
