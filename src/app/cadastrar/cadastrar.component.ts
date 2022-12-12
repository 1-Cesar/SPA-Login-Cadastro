import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  
  userLogin: UserLogin = new UserLogin();
  user: User = new User

  nome: string
  email: string
  areaAtuacao: string
  cpfCnpj: string
  foto: string
  confirmarSenha: string
  tipoUsuario: string
  genero: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  tipoGenero(event: any){
    this.genero = event.target.value
  }

  cadastrar() {  
    
    this.userLogin.tipoUsuario = this.tipoUsuario
    this.userLogin.genero = this.genero

    if(this.userLogin.senha != this.confirmarSenha){
      alert('As senhas não estão iguais !!')
    } else if (this.userLogin.tipoUsuario == null || this.userLogin.genero == null) {
      alert('Preencha os dados corretamente')
    } else{
      this.authService.cadastrar(this.userLogin).subscribe((resp: UserLogin) => {
        this.userLogin = resp
        //this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

}
