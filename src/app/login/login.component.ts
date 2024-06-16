import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async signIn() {
    console.log('Sign in clicked');

    try {
      const result = await this.authService.signIn(this.email, this.password);
      if (result) {
        console.log('User signed in successfully');
        this.router.navigate(['/home']);
      } else {
        console.error('Sign in failed');
        alert('Falha no login. Verifique suas credenciais e tente novamente.');
      }
    } catch (err) {
      console.error('Error during sign in:', err);
      alert('Ocorreu um erro durante o login. Tente novamente mais tarde.');
    }
  }

  register() {
    this.router.navigate(['/cadastrousuario']);
  }
}