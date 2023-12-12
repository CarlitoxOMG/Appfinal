import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataBaseService  } from 'src/app/services/data-base.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-correo',
  templateUrl: 'correo.page.html',
  styleUrls: ['correo.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule, 
    // ...
  ],
})
export class CorreoPage {
  correo: string = '';
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(private navCtrl: NavController, private dataBaseService: DataBaseService) {}

  async solicitarPreguntaSecreta() {
    // Validar el correo y comprobar si existe en la base de datos
    const usuario = await this.dataBaseService.leerUsuario(this.correo);

    if (usuario) {
      // Redirigir al usuario a la página de respuesta de pregunta secreta
      this.navCtrl.navigateForward('/pregunta', {
        queryParams: { correo: this.correo },
      });
    } else {
      // Redirigir al usuario a la página "incorrecto" cuando el correo no es válido
      this.navCtrl.navigateForward('/incorrecto');
    }
  }

  volverAlInicio() {
    this.navCtrl.navigateBack('/ingreso');
  }
}