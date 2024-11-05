import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentData } from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile: DocumentData | null = null; // Permite DocumentData o null

  constructor(
    private avatarService: AvatarService,  // Servicio para manejar el perfil del usuario
    private authService: AuthService,      // Servicio de autenticación
    private router: Router,                // Router para la navegación
    private loadingController: LoadingController, // Controlador de loading
    private alertController: AlertController // Controlador de alertas
  ) {
    // Suscribirse a los cambios en el perfil del usuario
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data ?? null; // Asigna null si data es undefined
    });
  }

  // Cierra la sesión del usuario y redirige a la página de inicio
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  // Cambia la imagen de perfil del usuario
  async changeImage() {
    // Obtiene la foto de la galería o la cámara
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Opciones: Camera, Photos o Prompt
    });

    console.log(image);
    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      // Sube la imagen obtenida a Firebase
      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if(!result){
        
          const alert = await this.alertController.create({
            header: 'Upload failed',
            message: 'Theres is a problem uploading your avatar',
            buttons: ['OK']
          });
        
          await alert.present();
        }
      }
    }
  }

