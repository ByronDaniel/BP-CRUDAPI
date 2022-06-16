import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  URL_API : string = "https://localhost:7111/api/Usuario";
  usuarios : Usuario[] = []

  //form vars
  cedula : string = "";
  nombre : string = "";
  apellido : string = "";
  fechaNacimiento : string = "";
  salario : number = 0;


  constructor() { }

  ngOnInit(): void {
    this.obtenerUsuarios().then(res=>{
      this.usuarios = res;
    });
  }

  //Get to Api
  async obtenerUsuarios() : Promise <any>{
    let response = await fetch(`${this.URL_API}`);
    let json = await response.json();
    return json;
  }
  
  //Delete User
  async eliminarUsuario(cedula : string){
    let response;
    Swal.fire({
      title: '',
      text: "Estás seguro que deseas eliminar al Usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#ffc107',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async(result)=> {
      if (result.isConfirmed) {
        response = await fetch(`${this.URL_API}/${cedula}`,{method:"DELETE"})
        .then(res => {
          res.text();
          this.obtenerUsuarios().then(res=>{
            this.usuarios = res;
          });
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminado con Exito!',
            showConfirmButton: false,
            timer: 1000
          })
        })
      }
    })
  }

  //Add User
  async agregarUsuario(){
    let usuario : Usuario = { 
      ci: this.cedula,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fechaNacimiento,
      salarioPromedio: this.salario
    }
    await fetch(`${this.URL_API}`, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    }).then(res => {
      console.log(res.json());
      this.obtenerUsuarios().then(res=>{
        this.usuarios = res;
      });
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Heroe guardado',
        showConfirmButton: false,
        timer: 1000
      });
      
      
    })
  }

}
