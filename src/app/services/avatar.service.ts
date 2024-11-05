import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { setDoc } from 'firebase/firestore';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,          // Servicio de autenticación para obtener el usuario actual
    private firestor: Firestore,  // Servicio de Firestore para acceder a la base de datos
    private storage: Storage      // Servicio de almacenamiento para subir imágenes
  ) { }

  /**
   * Obtiene el perfil del usuario actual desde Firestore
   * @returns Un observable con los datos del documento del usuario
   */
  getUserProfile() {
    const user = this.auth.currentUser; // Obtiene el usuario autenticado actual
    const userDocRef = doc(this.firestor, `users/${user?.uid}`); // Referencia al documento del usuario en Firestore
    return docData(userDocRef); // Devuelve un observable con los datos del documento del usuario
  }

  /**
   * Sube la imagen del usuario a Firebase Storage y guarda la URL en Firestore
   * @param cameraFile La imagen capturada a través de la cámara
   * @returns Un booleano indicando éxito o null si ocurre un error
   */
  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser; // Obtiene el usuario autenticado actual
    const path = `uploads/${user?.uid}/profile.png`; // Define la ruta de almacenamiento en Firebase Storage
    const storageRef = ref(this.storage, path); // Crea una referencia de almacenamiento con la ruta definida

    // Verifica que la imagen contiene datos en formato base64
    if (!cameraFile.base64String) {
      throw new Error("Image data is missing"); // Lanza un error si la imagen no tiene datos base64
    }

    try {
      // Sube la imagen a Firebase Storage usando el formato base64
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      
      // Obtiene la URL de descarga de la imagen subida
      const imageUrl = await getDownloadURL(storageRef);

      // Guarda la URL de la imagen en el documento del usuario en Firestore
      const userDocRef = doc(this.firestor, `users/${user?.uid}`);
      await setDoc(userDocRef, { imageUrl });

      return true; // Retorna true si la imagen fue subida y guardada exitosamente

    } catch (e) {
      console.error("Error uploading image:", e); // Muestra el error en la consola si ocurre uno
      return null; // Retorna null en caso de error
    }
  }
}
