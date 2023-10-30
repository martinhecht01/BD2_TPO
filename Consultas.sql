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

--- 4 ---
select codigo_producto, marca, nombre, descripcion, precio, stock
from e01_producto
where codigo_producto in (select codigo_producto
                          from e01_detalle_factura);
-- devuelve 100 tuplas --
-- esta bien porque hay 100 productos distintos en total y todos fueron facturados--

--- 5 ---
select distinct nro_cliente, nombre, apellido, direccion, activo, nro_telefono
from e01_cliente natural join e01_telefono;

--- 198 tuplas porque el cliente tiene mas de un telefono y mas de un activo ---


--- 6 ---
select e01c.nro_cliente, count(distinct nro_factura) as facturas
from e01_factura full outer join e01_cliente e01c on e01c.nro_cliente = e01_factura.nro_cliente
group by e01c.nro_cliente;

--- 100 tuplas porque hay 100 clientes distintos ---


--- FALTA TESTEAR ESTA SECCION ---

--- 7 ---
--- Listar todas las Facturas que hayan sido compradas por el cliente de nombre "Pandora" y apellido "Tate" ---
select * from e01_factura
where nro_cliente = (select nro_cliente
                     from e01_cliente
                     where nombre = 'Pandora' and apellido = 'Tate');

--- 8 ---
--- Listar todas las Facturas que contengan productos de la marca “In Faucibus Inc.” ---
select *
from e01_factura
where nro_factura in (select nro_factura
                      from e01_detalle_factura natural join e01_producto
                      where marca = 'In Faucibus Inc.');

--- 9 ---
--- Mostrar cada teléfono junto con los datos del cliente ---
select nro_cliente, codigo_area, nro_telefono, nombre, apellido, direccion, activo
from e01_telefono natural join e01_cliente;

--- HASTA ACA ---

--- 10 ---
select c.nombre, c.apellido, SUM(f.total_con_iva) as total
from e01_cliente c join e01_factura f on c.nro_cliente = f.nro_cliente
group by c.nro_cliente, c.nombre, c.apellido

---vistas ---
-- 1 --
declare view facturas_ordenadas_por_fecha as
    select *
    from e01_factura
    order by fecha;
--2--
declare view productos_no_facturados as
    select *
    from e01_producto
    where codigo_producto not in (select codigo_producto
                                  from e01_detalle_factura);
