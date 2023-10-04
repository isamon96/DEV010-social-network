# Red social: re+
Red social para compartir información y recursos relacionados a la protección y conservación del medio ambiente.
![](https://raw.githubusercontent.com/RocioLV/DEV010-social-network/testing/src/assets/logo.png)

### 1.	RESUMEN DE PROYECTO

##### 💡 Idea de producto

Crear una red social enfocada en el medio ambiente, donde los usuarios puedan conectarse, compartir información y recursos, participar en actividades y proyectos relacionados con la protección y conservación del medio ambiente.

##### 🚀 MVP

El MVP (Minimum Viable Product) sería una plataforma de red social que permita a los usuarios crear perfiles, publicar contenido, conectarse con otros usuarios y participar en grupos y actividades relacionadas con el medio ambiente.

##### 🎯 Marcado objetivo

Cualquier persona interesada en el medio ambiente y la sostenibilidad. Esto podría incluir a activistas ambientales, profesionales dedicados al sector medioambiental, estudiantes, organizaciones y empresas relacionadas con el medio ambiente, así como a aquellos que buscan aprender más y contribuir a la protección del medio ambiente.

### 2.	OBJETIVOS GENERALES DE ESTE PROYECTO
Los objetivos generales de nuestra red social **re+** son os siguientes:

- Desarrollar una Single-page Application (SPA) con temática de red social.
- Aplicar los conceptos de responsividad en el desarrollo de las vistas.
- Implementar un router para la navegación entre las diferentes vistas de la aplicación.
- Emplear un servicio externo para la persistencia de datos de la aplicación, como Firebase.
- Crear una suite de pruebas unitarias que permitan testear código asíncrono.

### 3.	HISTORIAS DE USUARIO  - TRELLO

Para organizar y estructurar el proyecto fue utilizada la herramienta Trello. Se establecieron objetivos y tareas para construir paso a paso el proyecto.

Establecimos la temática de la app. Ideamos el objetivo, nombre y logo de la app y diseñamos las siguientes historias de usuario:

#### **Historia de Usuario 1 (HU1)**: 
Creación y autenticación de cuenta como usuario, quiero poder crear una cuenta utilizando mi dirección de correo y una contraseña, o mediante mi cuenta de Google, para acceder de manera segura a la red social.

**Criterios de aceptación:**
-  	Debe haber un formulario de registro que solicite correo y contraseña.
-  	Se debe proporcionar la opción de registro con la cuenta de Google.
-  	Después del registro exitoso, debo recibir un correo de confirmación si se utilizó una dirección de correo.
	
#### **Historia de Usuario 2 (HU2):** 
Iniciar sesión como usuario registrado, quiero poder iniciar sesión en mi cuenta para acceder a las funciones completas de la red social.

**Criterios de aceptación:**
-  	Debe haber un formulario de inicio de sesión que solicite correo y contraseña.
-  	Debe haber una opción para iniciar sesión con la cuenta de Google.
-  	Después de iniciar sesión, debo ser redirigido a la página principal de la red social.
	
#### **Historia de Usuario 3 (HU3)**: 
Publicar contenido como usuario autenticado, quiero poder crear y publicar un nuevo post en la red social para compartir contenido con otros usuarios.

**Criterios de aceptación:**
-  	Debe haber un campo de texto donde pueda escribir mi post.
-  	Puedo agregar imágenes o enlaces a mi publicación.
-  	Después de publicar, mi post debe aparecer en el feed de la red social.

#### **Historia de Usuario 4 (HU4)**: 
Eliminar un post como usuario autenticado, quiero tener la capacidad de eliminar una publicación que he creado, en caso de que ya no desee que esté visible.

**Criterios de aceptación:**
-  	Junto a cada publicación, debe haber una opción clara para eliminarla.
-  	Después de confirmar, la publicación debe ser eliminada de forma permanente.
	
#### **Historia de Usuario 5 (HU5):** 
Interacción con Publicaciones (Likes) Como usuario autenticado, quiero poder dar y quitar "me gusta" a las publicaciones de otros usuarios, limitado a un solo "me gusta" por publicación.

**Criterios de aceptación:**
-  	Se debe restringir el “me gusta” a uno por usuario por publicación. 
-  	Junto a cada publicación, debe haber un botón de "me gusta" (corazón).
-  	Si ya he dado "me gusta" a una publicación, debo poder retirar mi "me gusta".
-  	Debe haber un contador de "me gusta" en cada publicación.

#### **Historia de Usuario 6 (HU6):**
Conteo de Likes Como usuario, quiero ver cuántos "me gusta" ha recibido una publicación para entender su popularidad.

**Criterios de aceptación:**
-  	Junto al botón de "me gusta" en cada publicación, debe haber un contador que muestre la cantidad de "me gusta".

#### **Historia de Usuario 7 (HU7): ** 
Editar publicaciones como usuario autenticado, deseo tener la opción de editar mis publicaciones existentes en caso de que quiera corregir errores o actualizar el contenido.

**Criterios de aceptación:**
-  	Junto a cada publicación, debe haber una opción clara para editarla.
-  	Después de confirmar la edición, la publicación debe actualizarse con el nuevo contenido.

### 4.	PROTOTIPO BAJA FIDELIDAD -  FIGMA
![](https://raw.githubusercontent.com/RocioLV/DEV010-social-network/testing/src/assets/bajaFidelidad.png)

### 5.	PROTOTIPO ALTA FIDELIDAD – FIGMA/ZEPLIN
![](https://raw.githubusercontent.com/RocioLV/DEV010-social-network/testing/src/assets/altaFidelidad.png)

![](https://raw.githubusercontent.com/RocioLV/DEV010-social-network/testing/src/assets/paletaDeColores.png)

![](https://raw.githubusercontent.com/RocioLV/DEV010-social-network/testing/src/assets/prototipoFigma.png)

Aplicamos test de usabilidad a usuarios.

### 6.	PRESENTACIÓN FINAL DEL PROYECTO

![](https://raw.githubusercontent.com/RocioLV/DEV010-social-network/testing/src/assets/mobile.gif)

### 7.	RECURSOS ÚTILES
[Responsive Design](https://mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobil
e-first/ "Responsive Design")
[Navegar entre estas vistas](https://developer.mozilla.org/es/docs/Web/API/History_API "Navegar entre estas vistas")
[Mobile First](https://www.ionos.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/ "Mobile First")
[Jest deo asíncrono  códig· Jest](https://jestjs.io/es-ES/docs/asynchronous "Jest deo asíncrono  códig· Jest")
[Append VS appendChild](https://dev-to.translate.goog/ibn_abubakre/append-vs-appendchild-a4m?_x_tr_sl=auto&_x_tr_tl=es&_x_tr_hl=es-419 "Append VS appendChild")
[Sobre Read.me](https://docs.github.com/es/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes "Sobre Read.me")
[Repositorio de Github ](https://github.com/RocioLV/DEV010-social-network.git "Repositorio de Github ")