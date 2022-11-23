import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  mdl_correo: string = '';
  mdl_pass: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private db: DbService
  ) {}

  ngOnInit() {}

  navegar() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    this.router.navigate(['ingreso'], extras);
  }

  registrarUser() {
    let that = this;
    this.loadingController
      .create({
        message: 'Creando usuario...',
        spinner: 'lines',
      })
      .then(async (data) => {
        data.present();
        if (
          this.mdl_correo !== '' ||
          this.mdl_pass !== '' ||
          this.mdl_nombre !== '' ||
          this.mdl_apellido !== ''
        ) {
          console.log('FSR:   ' + this.mdl_correo);
          console.log('FSR:   ' + this.mdl_pass);
          console.log('FSR:   ' + this.mdl_nombre);
          console.log('FSR:   ' + this.mdl_apellido);

          try {
            this.db.registrarUsuario(
              this.mdl_correo,
              this.mdl_pass,
              this.mdl_nombre,
              this.mdl_apellido
            );
            let respuesta = await this.api.AlmacenarUsuario(
              this.mdl_correo,
              this.mdl_pass,
              this.mdl_nombre,
              this.mdl_apellido
            );
            if (respuesta['result'][0].RESPUESTA == 'OK') {
              that.presentToast('Usuario creado correctamente');
              this.navegar();
            } else {
              that.presentErrorToast('El correo ingresado ya existe');
            }
          } catch (error) {
            console.log(error);
          }

          data.dismiss();
        } else {
          that.presentErrorToast('Debe rellenar todos los campos');
          data.dismiss();
        }
      });
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1700,
      position: 'middle',
      color: 'success',
    });

    await toast.present();
  }

  async presentErrorToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'middle',
      color: 'danger',
    });

    await toast.present();
  }
  back() {
    this.router.navigate(['ingreso']);
  }
}
