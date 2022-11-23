import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  mdl_correo: string = '';
  respuesta: Array<string>;
  texto: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private api: ApiService
  ) {}

  ngOnInit() {}

  async startScanner() {
    document.querySelector('ion-content').classList.remove('scanner-magnolia');
    document.querySelector('body').classList.add('scanner-active');
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      this.respuesta = result.content.split('|'); // log the raw scanned content

      console.log('RAFCE: ' + this.respuesta);
      const response = await this.api.registrarAsistencia(
        this.mdl_correo,
        this.respuesta[0]
      );

      if (response['result'][0].RESPUESTA === 'OK') {
        this.presentToast('REGISTRADO EXITOSAMENTE', 'success');
      } else {
        this.presentToast('USTED YA SE ENCUENTRA PRESENTE', 'warning');
      }
    }
    document.querySelector('ion-content').classList.add('scanner-magnolia');
    document.querySelector('body').classList.remove('scanner-active');
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1700,
      position: 'middle',
      color: color,
    });

    await toast.present();
  }

  back() {
    document.querySelector('ion-content').classList.add('scanner-magnolia');
    this.router.navigate(['principal']);
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
}
