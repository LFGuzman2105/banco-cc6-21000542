drop database bancocc6;
use bancocc6;

select * from clientes order by insert_date desc;
select * from clientes where id_cliente = '7f0fef67-6f1c-42f1-8e80-6aab0d142016';
select * from usuarios order by datetime_insert desc;
select * from usuarios where id_cliente = '7f0fef67-6f1c-42f1-8e80-6aab0d142016';
select * from cuentas order by fecha_creacion desc;
select * from cuentas where num_cuenta = "4251407817156" order by fecha_creacion desc;
select * from cuentas where id_cliente = '7f0fef67-6f1c-42f1-8e80-6aab0d142016';
select * from tipo_cuenta;
select * from estado_cuenta;
select * from transacciones order by fecha_transaccion desc;
select * from transacciones where descripcion = "prueba 5 pesos" order by fecha_transaccion desc;
select * from transacciones where id_operacion = 1 or id_operacion = 3 order by fecha_transaccion desc;
select * from transacciones where id_cliente = '5e2d364a-878b-11ef-9452-54bf6402f80c';
select * from transacciones where id_cuenta = '953091c6-9758-11ef-aafb-54bf6402f80c';
select * from tarjetas order by fecha_vencimiento desc;
select * from cuentas;
select * from cuentas where num_cuenta = "9701594829964";
select * from tipo_tarjeta;
select * from categoria_tarjeta;
select * from marca_tarjeta;
select * from operaciones_bancarias;

SELECT t.id_transaccion,
	t.producto, 
	t.id_operacion, 
	t.origen, 
	ob.operacion, 
	t.monto, 
	t.id_cliente, 
	CONCAT(nombre1, ' ', apellido1) AS nombre_cliente, 
	t.id_cuenta, 
	co.num_cuenta AS num_cuenta_origen, 
	t.id_cuenta_destino, 
	cd.num_cuenta AS num_cuenta_destino,
	t.id_tarjeta, 
	tj.no_tarjeta, 
	t.descripcion, 
	t.fecha_transaccion, 
	t.id_servidor_transaccion, 
	t.estado_transaccion 
FROM transacciones t
LEFT JOIN clientes cs 
	ON cs.id_cliente = t.id_cliente
INNER JOIN operaciones_bancarias ob 
	ON ob.id_operacion = t.id_operacion
LEFT JOIN cuentas co
	ON co.id_cuenta = t.id_cuenta
LEFT JOIN cuentas cd
	ON cd.id_cuenta = t.id_cuenta_destino 
LEFT JOIN tarjetas tj
	ON tj.id_tarjeta = t.id_tarjeta
ORDER BY t.fecha_transaccion DESC ;

update cuentas set saldo = 2500.00 where num_cuenta = "9606784668432";

select * from clientes where id_cliente = "5e2d364a-878b-11ef-9452-54bf6402f80c";
select * from usuarios where id_cliente = "5e2d364a-878b-11ef-9452-54bf6402f80c";

select * from cuentas cu, clientes cl where cu.id_cliente = cl.id_cliente and nombre1 = "Cruz";

select num_cuenta, saldo, nombre1, nombre2, apellido1, apellido2, no_tarjeta, limite_credito 
from cuentas cu, clientes cl, tarjetas t 
where cu.id_cliente = cl.id_cliente and cl.id_cliente = t.id_cliente;

select num_cuenta, dpi, saldo, nombre1, nombre2, apellido1, apellido2, no_tarjeta, limite_credito 
from cuentas cu, clientes cl, tarjetas t 
where cu.id_cliente = cl.id_cliente and cl.id_cliente = t.id_cliente and no_tarjeta = "5200004041014764";

select * from tarjetas;

delete from clientes where dpi = '3592859020113';
delete from clientes where id_cliente = '7e4af351-a190-4919-a2bb-a703f363e436';
delete from usuarios where username = "LF";
delete from cuentas where id_cliente = 'c8d12f8f-98a7-4b20-8eb4-e0c50dc44155';
delete from transacciones where id_cuenta_destino = '7e4af351-a190-4919-a2bb-a703f363e436';

delete from cuentas where num_cuenta = "2009609572501";

CREATE USER 'pruebaivan' IDENTIFIED BY '123';
GRANT SELECT ON bancocc6.* TO 'pruebaivan';

SET GLOBAL sql_slave_skip_counter = 1;
STOP SLAVE;
START SLAVE;

drop table roles;
drop table role_user;

show plugins;

SET GLOBAL rpl_semi_sync_master_enabled=ON;
SHOW VARIABLES LIKE 'rpl_semi_sync%';
SET GLOBAL rpl_semi_sync_slave_enabled=ON;
SET GLOBAL rpl_semi_sync_slave_delay_master = ON;

STOP SLAVE IO_THREAD;
START SLAVE IO_THREAD;

CALL manejar_errores_replica();

show slave status;
stop slave;
start slave;