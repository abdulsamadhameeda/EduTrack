import { Component, inject, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('EduTrack');
  // router: any;
  router = inject(Router); 

  constructor( private route:Router){}
    
//    
    auth = inject(AuthService);

shownavBar() : boolean{
  return this.router.url !=='/login'
}
logout() {
  this.auth.logout();
    this.router.navigateByUrl('/login'); // استخدم navigateByUrl بدل navigate
}

}
