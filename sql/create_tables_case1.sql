CREATE SCHEMA case1;

CREATE TABLE case1.resultados_amostras (
	id SERIAL PRIMARY KEY,
	id_interna VARCHAR(100),
	nome_amostra VARCHAR(50),
	data_coleta DATE,
	horario_coleta TIME,
	param_quimi VARCHAR(100),
	resultado VARCHAR(50),
	unidade VARCHAR(50),
	limite_quant INTEGER
);

TRUNCATE TABLE case1.resultados_amostras;

SELECT * FROM case1.resultados_amostras;