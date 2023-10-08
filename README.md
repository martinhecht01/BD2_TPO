# BD2_TPO
Setup de los datos de la BD:
Descargar y correr el archivo de campus llamado "ITBA_2023_esquema_facturacion.sql (PostgreSQL)".
Recordar que tipicamente creamos una imagen de docker para correr postgresql.

Configuracion de entorno de API:
1- navegar a BD2_TPO/api-related/confij.json
2- settear datos donde: 
        port es el puerto local donde correra la api
        database contiene los datos de la imagen de docker
        obs: en database el "port" es donde esta corriendo la imagen de docker != puerto de la api
