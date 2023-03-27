import {Component} from '@angular/core';
import {Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hideTitleAndPicture: boolean = false;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.hideTitleAndPicture = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.hideTitleAndPicture = false;
      }
    });
  }
}
