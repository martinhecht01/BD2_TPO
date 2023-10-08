--- 1 ---
select nro_telefono, nro_cliente
from e01_telefono natural join e01_cliente
where nombre = 'Wanda' and apellido = 'Baker';
-- devuelve 2 tuplas --

--- 2 ---
select distinct nombre, apellido, direccion, activo, nro_cliente
from e01_cliente natural join e01_factura;
-- devuelve 98 tuplas --

--- 3 ---
select distinct *
from e01_cliente cli
where cli.nro_cliente not in (select nro_cliente
                          from e01_cliente natural join e01_factura);
--- devuelve 2 tuplas ---
--- esta bien porque hay 100 clientes distintos en total ---
