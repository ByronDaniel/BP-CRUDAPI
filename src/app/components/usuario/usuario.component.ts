import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  URL_API : string = "https://localhost:7111/api/usuario";
  usuarios : Usuario[] = []
  saludo = "Hola!!";
  constructor() { }

  ngOnInit(): void {
    this.obtenerUsuarios().then(res=>{
      this.usuarios = res;
      console.log(this.usuarios);
    });
  }

  //Get to Api
  async obtenerUsuarios() : Promise <any>{
    let response = await fetch(`${this.URL_API}`);
    let json = await response.json();
    return json;
  }
}
