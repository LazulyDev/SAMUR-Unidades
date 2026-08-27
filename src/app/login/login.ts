import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  readonly loginForm = this.formBuilder.nonNullable.group({
    usuario: '',
    password: '',
  });

  MensajeError = ""

  // FUNCIÓN PARA INICIAR SESIÓN CON FIREBASE AUTH
  async iniciarSesion(){
    if (this.loginForm.invalid){
      return
    }
    
    const { usuario, password } = this.loginForm.getRawValue()

    try{
      await this.authService.login(usuario, password)
      await this.router.navigate(['/dashboard'])
      console.log("Login correcto")
    } catch{
      this.MensajeError = "Usuario o contraseña incorrectos."
    }
  }

  // FUNCION EN CASO DE OLVIDO DE CONTRASEÑA CON FIREBASE AUTH
  async recuperarPassword(){
    const email = this.loginForm.controls.usuario.value

    if (!email){
      this.MensajeError = "debes introducir un correo electrónico"
      return
    }

    try {
      await this.authService.resetPassword(email)
      this.MensajeError = "Te hemos enviado un correo para restablecer la contraseña"
    } catch (error) {
      this.MensajeError = "no se pudo enviar el correo de recuperarción"
    }
  }
}
