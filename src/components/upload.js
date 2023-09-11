import { getStorage, ref, uploadBytes } from 'firebase/storage';

function upload(navigateTo) {

  const storage = getStorage(); // Obtén una referencia al servicio de almacenamiento de Firebase
  
  const uploadFile = async (file) => {
    try {
      const storageRef = ref(storage, 'nombre-de-tu-archivo'); // Reemplaza 'nombre-de-tu-archivo' por un nombre único para tu archivo
      await uploadBytes(storageRef, file);
  
      // El archivo se ha cargado exitosamente en Firebase Storage
      console.log('Archivo subido exitosamente.');
  
      // Puedes obtener la URL del archivo si necesitas mostrarlo o compartirlo
      const downloadURL = await getDownloadURL(storageRef);
      console.log('URL de descarga del archivo:', downloadURL);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  }

  const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadFile(file);
  }
});

};