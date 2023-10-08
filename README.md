# BD2_TPO

## Configuración de Entorno de API

### Paso 1: Descargar y Correr la Base de Datos

1. Descargar el archivo de esquema de facturación llamado "ITBA_2023_esquema_facturacion.sql (PostgreSQL)".

2. Crear una imagen de Docker para ejecutar PostgreSQL. Esto lo hicimos en la primera clase.

3. Correr el archivo descargado en el punto 1 en el entorno postgres.

### Paso 2: Configuración del Entorno de la API

1. Navegar a la ubicación `BD2_TPO/api-related/config.json`.

   > **Nota**: El archivo `config.json` está incluido en el archivo `.gitignore` y no se va a subir al repositorio.

2. En el archivo `config.json`, ajustar los siguientes datos:

   - `port`: Este es el puerto local en el que se va a ejecutar la API, elegir a gusto.

   - `database`: Aquí hay que poner los detalles de la imagen de Docker en la que se encuentra PostgreSQL.

   > **Nota**: Tener en cuenta que el "port" en la sección `database` se refiere al puerto donde se ejecuta la imagen de Docker de PostgreSQL, y no al puerto de la API.

   Ejemplo de configuración:

   ```json
   {
     "port": 3000,
     "database": {
       "user": "nombre_de_usuario",
       "password": "contraseña",
       "host": "localhost",
       "port": 5432,
       "database": "nombre_de_base_de_datos"
     }
   }

## Correr la API

1. Descargar los node modules:
``` bash
cd ./bd2/api-related
npm install
```
2. Correr la api:
```bash
node api.js
```

3. Consultar en Postman. Ejemplos (rellenar puerto):


Get all clients: seleccionar get en postman y correr
```bash
http://localhost:_mi_puerto_/clients
```
Create client: seleccionar post y agregar un json en el body


Delete client: seleccionar delete y pasarle 

```bash
http://localhost:_mi_puerto_/clients/nro_cliente
```

Modify client: seleccionar put, pasarle lo mismo que el delete y agregarle un body sin el nro_cliente






