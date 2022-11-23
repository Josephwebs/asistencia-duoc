import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  Animation,
  AnimationController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  mdl_correo: string = '';
  mdl_pass: string = '';
  response: any;
  quote: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadingController
      .create({
        message: 'Obteniendo Información...',
        spinner: 'lines',
      })
      .then((data) => {
        data.dismiss();
      });

    try {
      JSON.parse(localStorage.getItem('idUsuario'));
      if (JSON.parse(localStorage.getItem('idUsuario')) != null) {
        console.log('FSR: ' + JSON.parse(localStorage.getItem('idUsuario')));
        this.mdl_correo = JSON.parse(localStorage.getItem('idUsuario'));
        this.router.navigate(['principal']);
      } else {
        console.log(
          'FSR: else: ' + JSON.parse(localStorage.getItem('idUsuario'))
        );
      }
    } catch (error) {
      console.log('FSR: ' + error);
    }
  }

  registrar() {
    this.router.navigate(['registrar']);
  }

  login() {
    let that = this;
    let parametros: NavigationExtras = {
      replaceUrl: true,
      state: { correo: this.mdl_correo, contrasena: this.mdl_pass },
    };
    //this.router.navigate(['editar'], parametros);

    this.loadingController
      .create({
        message: 'Ingresando...',
      })
      .then(async (data) => {
        data.present();
        try {
          let respuesta = await this.api.loginPersona(
            this.mdl_correo,
            this.mdl_pass
          );
          if (respuesta['result'] === 'LOGIN OK') {
            localStorage.setItem('idUsuario', JSON.stringify(this.mdl_correo));
            that.presentToast('inicio de sesion correcto', 'success');
            this.router.navigate(['principal'], parametros);
          } else {
            that.presentToast('Nombre o contraseña incorrecto', 'danger');
          }
        } catch (error) {
          console.log(error);
        }

        data.dismiss();
      });
  }

  async presentToast(mensaje, color) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1700,
      position: 'middle',
      color: color,
    });

    await toast.present();
  }
}
