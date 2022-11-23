import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  mdl_correo: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (localStorage.getItem('idUsuario') === null) {
      this.presentToast('Debes ingresar a tu sesión', 'warning');
      this.router.navigate(['ingreso']);
    } else if (localStorage.getItem('idUsuario') === '') {
      this.mdl_correo = this.router.getCurrentNavigation().extras.state.correo;
    } else {
      this.mdl_correo = localStorage.getItem('idUsuario');
    }

    this.loadingController
      .create({
        message: 'Obteniendo Información...',
        spinner: 'lines',
      })
      .then((data) => {
        data.dismiss();
      });

    this.listar();
  }

  registrarAsistencia() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    this.router.navigate(['scanner'], extras);
  }

  editar() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    this.router.navigate(['editar'], extras);
  }

  async listar() {
    this.loadingController
      .create({
        message: 'Obteniendo Información...',
        spinner: 'lines',
      })
      .then(async (res) => {
        try {
          res.present();
          let data = await this.api.obtenerPersona(
            this.mdl_correo.slice(1, -1)
          );
          this.nombre = this.capitalize(data['result'][0].NOMBRE);
          this.apellido = this.capitalize(data['result'][0].APELLIDO);
          console.log(this.nombre, this.apellido);

          res.dismiss();
        } catch (error) {
          this.presentToast(
            'ocurrio un error tratando de acceder a su usuario, por favor vuelva a iniciar sesión',
            'danger'
          );
          localStorage.removeItem('idUsuario');
          res.dismiss();
          this.router.navigate(['ingreso']);
        }
      });
  }

  cerrarSesion() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    localStorage.removeItem('idUsuario');
    this.router.navigate(['ingreso'], extras);
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'middle',
      color: color,
    });

    await toast.present();
  }

  capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }
}
