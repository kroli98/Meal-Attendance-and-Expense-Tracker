import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'konyha';

  constructor() {document.body.style.backgroundColor = "#FFFAF0"
  }

}
