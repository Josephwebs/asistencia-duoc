import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private sqlite: SQLite) {
    // SE CREA LA BASE DE DATOS

    this.sqlite
      .create({
        name: 'datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql(
          'CREATE TABLE IF NOT EXISTS ESTUDIANTE(CORREO VARCHAR(30),' +
            'CONTRASENA VARCHAR(30),' +
            'NOMBRE VARCHAR(30),' +
            'APELLIDO VARCHAR(30))',
          []
        ).then(() => {
          console.log('Base de Datos OK');
        });
        //SE CREA LA TABLA
      });
  }

  registrarUsuario(correo, contrasena, nombre, apellido) {
    this.sqlite
      .create({
        name: 'datos.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO ESTUDIANTE VALUES(?, ?, ?, ?)', [
          correo,
          contrasena,
          nombre,
          apellido,
        ]).then(() => {
          console.log('Base de Datos OK');
        });
        //SE CREA LA TABLA
      });
  }
}
