
# Guía de Instalación y Uso

## 1. Inicialización de Bases de Datos

### PostgreSQL

1. **Descarga de PostgreSQL:**
   ```bash
   docker pull postgres
   ```

2. **Levantar el Contenedor:**
   ```bash
   docker run --name MypostgreSQL -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
   ```

3. **Conexión a PostgreSQL:**
   - Conéctese a PostgreSQL utilizando su gestor de BD de preferencia.
   - Ejecute el script `ITBA_2023_esquema_facturacion.sql`.

### MongoDB

1. **Descarga de MongoDB:**
   ```bash
   docker pull mongo
   ```

2. **Levantar el Contenedor:**
   ```bash
   docker run --name mongo -p 27017:27017 -d mongo
   ```

3. **Transferencia de Datos JSON:**
   Desde la raíz del repositorio, ejecute:
   ```bash
   docker cp ./tickets.json mongodb:/
   docker cp ./clients.json mongodb:/
   docker cp ./phones.json mongodb:/
   docker cp ./products.json mongodb:/
   ```

4. **Importación de Datos:**
   ```bash
   docker exec -it mongodb bash
   mongosh
   use E01
   db.createUser({user: "username", pwd: "password", roles: [{role: "readWrite", db: "E01"}]})
   db.auth("username", "password")
   exit
   mongoimport --db E01 --collection phones --jsonArray --file phones.json
   mongoimport --db E01 --collection tickets --jsonArray --file tickets.json
   mongoimport --db E01 --collection clients --jsonArray --file clients.json
   mongoimport --db E01 --collection products --jsonArray --file products.json
   exit
   ```

## 2. Configuración del Entorno de la API

- Navegue a `BD2_TPO/api-related/config.json`.
- En `config.json`, ajuste:
  - `port`: Puerto local para la API.
  - `postgres`: Detalles de conexión a la BD PostgreSQL.
  - `mongo`: Detalles de conexión a la BD MongoDB.

## 3. Correr la API

1. **Instalación de npm (si es necesario):**
   ```bash
   cd ./api-related
   npm install
   ```

2. **Ejecución de la API:**
   ```bash
   node api.js
   ```

## Uso de la API

Utilice Postman para interactuar con la API en los siguientes endpoints:

- **GET:**
  - `http://localhost:{puerto}/clients/{bd}`
  - `http://localhost:{puerto}/products/{bd}`

- **POST:**
  - `http://localhost:{puerto}/clients/{bd}`
  - `http://localhost:{puerto}/products/{bd}`
  
    Ejemplo de JSON para cliente:
    ```json
    {
      "nro_cliente": nro_cliente,
      "nombre": "nombre",
      "apellido": "apellido",
      "direccion": "direccion",
      "activo": activo
    }
    ```
    Ejemplo de JSON para producto:
    ```json
    {
      "codigo_producto": codigo_producto,
      "marca": "marca",
      "nombre": "nombre",
      "descripcion": "descripcion",
      "precio": precio,
      "stock": stock
    }
    ```

- **PUT:**
  - `http://localhost:{puerto}/clients/{bd}/:nro_cliente`
  - `http://localhost:{puerto}/products/{bd}/:codigo_producto`

    `nro_cliente` y `codigo_producto` son identificadores para modificar.

- **DELETE:**
  - `http://localhost:{puerto}/clients/{bd}/:nro_cliente`
  - `http://localhost:{puarto}/products/{bd}/:codigo_producto`

    `nro_cliente` y `codigo_producto` son identificadores para eliminar.
