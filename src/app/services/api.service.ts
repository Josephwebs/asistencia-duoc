import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  ruta: string = 'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php';

  constructor(private http: HttpClient) {}

  loginPersona(correo, contrasena) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .post(that.ruta, {
            nombreFuncion: 'UsuarioLogin',
            parametros: [correo, contrasena],
          })
          .toPromise()
      );
    });
  }

  AlmacenarUsuario(correo, contrasena, nombre, apellido) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .post(that.ruta, {
            nombreFuncion: 'UsuarioAlmacenar',
            parametros: [correo, contrasena, nombre, apellido],
          })
          .toPromise()
      );
    });
  }

  modificarPass(correo, contrasenaNueva, contrasenaActual) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .patch(that.ruta, {
            nombreFuncion: 'UsuarioModificarContrasena',
            parametros: [correo, contrasenaNueva, contrasenaActual],
          })
          .toPromise()
      );
    });
  }

  obtenerPersona(correo: string) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .get(
            that.ruta + '?nombreFuncion=UsuarioObtenerNombre&correo=' + correo
          )
          .toPromise()
      );
    });
  }

  registrarAsistencia(CORREO: string, ID_CLASE: string) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .post(that.ruta, {
            nombreFuncion: 'AsistenciaAlmacenar',
            parametros: [CORREO, ID_CLASE],
          })
          .toPromise()
      );
    });
  }
}
