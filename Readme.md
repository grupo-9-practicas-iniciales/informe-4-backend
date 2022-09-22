# informe-4-backend

Bienvenido al repositorio de YOUSAC-backend 🐱‍🏍

## Documentación

POSTMAN: [Postman](https://documenter.getpostman.com/view/19336675/VVJ3zvmc)

ENDPOINTS: [pdf](https://github.com/grupo-9-practicas-iniciales/informe-4-backend/blob/main/Api%20Structure.pdf)


## Inicio

Para empezar, puedes clonar el repositorio.

```bash
git clone https://github.com/grupo-9-practicas-iniciales/informe-4-backend.git
```

Vamos a trabajar con npm, por lo que el siguiente paso es instalar las dependencias

```bash
npm install
```

Despues de eso puedes correr la aplicación con:

```bash
npm run dev
```

Al estar utilizando typescript tambien es posible compilar los archivos 


```bash
npm run build
npm run start
```

### Variables de entorno

Para que la aplicación funcione se debe crear un archivo `.env` en la raiz del proyecto. Tiene que tener el formato del archivo `.template.env`, consulta con un miembro del equipo para facilitarte las claves.

## Tecnologias utilizadas

- bcryptjs
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mysql2
- nodemailer
- sequelize

adicionalmente se utilizan algunos paquetes para el desarollo:

- nodemon
- ts-node
- typescript

## Endpoints

Puedes revisar la documentación en [Postman](https://documenter.getpostman.com/view/19336675/VVJ3zvmc)


## Convenciones

### Branches

Trabajaremos con gitflow, por lo que para trabajar en alguna nueva funcionalidad utilizaremos ramas.

Puedes tomar alguno de los issues del repositorio siempre que alguien no esté trabajando en el y crear una rama para esa funcionalidad. Para mantener el orden se tiene que crear la branch de la siguiente manera:

```
feature/nombre-issue-<numero-issue>
```

* Recuerda crear la nueva rama apartir de la rama `develop` 

* Cuando termines la funcionalidad puedes crear una pull request, selecciona que haga merge con `develop` y en la descripción puedes escribir `closes #<numero-issue>` 

* Puedes ver el [Projecto](https://github.com/grupo-9-practicas-iniciales/informe-4-backend/projects) del repositorio para saber en que se está trabajando actualmente.

* Antes de hacer push al el repositorio es recomendable hacer el build para verificar que nada falle, se hace de la siguente manera `npm run build`

* Verifica siempre la rama en la que estas trajando 😔


### Commits

El nombre de los commits se debe hacer de esta manera

```
[ ADD/FIX/UPDATE ] <breve descripción de lo hecho>
```

* Puedes escoger entre `ADD`, `UPDATE` o `FIX` en función de qué estes haciendo


## Producción

Cuando se considere oportuno se hará el merge de la rama `develop` con la rama `main` para que esta pase a 'producción'.
