import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  mdl_correo: string = localStorage.getItem('idUsuario').slice(1, -1);
  mdl_new_pass: string = '';
  mdl_passActual: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (localStorage.getItem('idUsuario') === null) {
      this.router.navigate(['ingreso']);
    }
  }

  editarPass() {
    let that = this;
    this.loadingController
      .create({
        message: 'Editando Contraseña...',
        spinner: 'lines',
      })
      .then(async (data) => {
        data.present();
        try {
          let respuesta = await this.api.modificarPass(
            this.mdl_correo,
            this.mdl_new_pass,
            this.mdl_passActual
          );
          console.log(respuesta['result'][0].RESPUESTA);
          if (respuesta['result'][0].RESPUESTA == 'OK') {
            localStorage.removeItem('idUsuario');
            that.presentToast(
              'Se cambio la contraseña exitosamente, Porfavor vuelva a Iniciar Sesion',
              'success'
            );
            that.router.navigate(['ingreso']);
          } else {
            that.presentToast('Uno de los campos esta mal ingresado', 'danger');
          }
        } catch (error) {
          console.log(error);
        }

        data.dismiss();
      });
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'middle',
      color: 'success',
    });

    await toast.present();
  }

  back() {
    this.router.navigate(['principal']);
  }
}
