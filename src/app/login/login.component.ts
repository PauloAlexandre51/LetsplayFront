import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  signIn() {

    console.log('Sign in clicked');

    this.router.navigate(['/home']);
  }

  register() {
    console.log('Register clicked'); // Verifique se a função é chamada
    this.router.navigate(['/cadastrousuario']);
  }
}
