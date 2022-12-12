import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Logar } from '../model/Logar';
import { UserLogin } from '../model/UserLogin';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  logar: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.auth.entrar(this.logar).subscribe((resp: UserLogin) => {
      this.logar = resp

      environment.token = this.logar.token
      environment.nome = this.logar.nome
      environment.foto = this.logar.foto
      environment.id = this.logar.idUsuario  
      
      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)

      this.router.navigate(['/inicio'])      
    }, erro => {
      if(erro.status == 500) {
        alert('Usuário ou senha estão incorretos!')
      }
    })
    }
}