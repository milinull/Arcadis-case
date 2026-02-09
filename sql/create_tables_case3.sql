CREATE SCHEMA case3;

CREATE TABLE case3.dados_coletados (
	id SERIAL PRIMARY KEY,
	sys_loc_code VARCHAR(100),
	param_code VARCHAR(50),
	param_value JSONB,
	param_unit VARCHAR(50),
	measurement_method VARCHAR(250),
	measurement_date TIMESTAMP,
	remark VARCHAR(150),
	task_code VARCHAR(250)
);

TRUNCATE TABLE case3.dados_coletados;

SELECT * FROM case3.dados_coletados;