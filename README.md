# Arcadis Data Processing Platform

<div align="center">

![Python](https://img.shields.io/badge/python-3.12-blue)
![Django](https://img.shields.io/badge/Django-5.2-092E20)
![Django REST](https://img.shields.io/badge/Django%20REST-3.15-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Pandas](https://img.shields.io/badge/Pandas-2.2-150458)
![Camelot](https://img.shields.io/badge/Camelot-0.11-orange)
![XlsxWriter](https://img.shields.io/badge/XlsxWriter-3.2-green)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4)
![Docker](https://img.shields.io/badge/Docker-24-2496ED)

**Plataforma integrada de processamento de dados ambientais e químicos**

[Deploy Online](#-deploy-online) • [Visão Geral](#-visão-geral) • [Arquitetura](#️-arquitetura) • [Instalação](#-instalação) • [Casos de Uso](#-casos-de-uso) • [API](#-documentação-da-api) • [Tecnologias](#-stack-tecnológico)

</div>

---

## Deploy Online

A aplicação está disponível online para testes:

| Aplicação      | URL                                    | Descrição                 |
| -------------- | -------------------------------------- | ------------------------- |
| **Frontend**   | http://35.175.150.159:3001/case1/index | Frontend React            |
| **PgAdmin**    | http://35.175.150.159:5050/            | Banco de dados PostgreSQL |
| **API Django** | http://35.175.150.159:8000/api/case1   | Backend REST              |
| **API Django** | http://35.175.150.159:8000/api/case2   | Backend REST              |
| **API Django** | http://35.175.150.159:8000/api/case3   | Backend REST              |
| **Swagger UI** | http://35.175.150.159:8000/swagger     | Documentação interativa   |
| **ReDoc**      | http://35.175.150.159:8000/redoc       | Documentação alternativa  |

> **Nota**: Por questões de praticidade para demonstração, o arquivo `.env` foi incluído no repositório e a autenticação JWT está desabilitada. O código de autenticação JWT está presente no projeto, mas comentado. Além do mais, arquivos `.sql` também foram disponibilizados para compreensão da estrutura do banco de dados.

---

## Visão Geral

Sistema fullstack desenvolvido para automatizar o processamento de dados ambientais e químicos, oferecendo três módulos integrados para diferentes tipos de análise e conversão de dados.

### Principais Funcionalidades

- **Extração de dados de PDF** - Processamento automático de relatórios químicos
- **Análise de risco ambiental** - Cálculo e formatação de indicadores de risco
- **Conversão de dados** - Padronização para formato Arcadis
- **API RESTful** - Backend escalável com Django
- **Interface interativa** - Dashboard React com drag-and-drop
- **Banco de dados relacional** - PostgreSQL com schemas separados

---

## Fluxo de Dados

1. **Upload** - Usuário faz upload do arquivo (PDF ou Excel)
2. **Processamento** - Backend processa e transforma os dados
3. **Persistência** - Dados são salvos no PostgreSQL
4. **Geração** - Sistema gera arquivo Excel formatado
5. **Download** - Arquivo processado é retornado ao usuário

---

## Instalação

### Pré-requisitos

- Python 3.12+
- Node.js 18+
- PostgreSQL 14+
- Docker

### Opção 1: Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/milinull/Arcadis-case.git
cd Arcadis-case

# Suba os containers
docker-compose up --build
```

### Opção 2: Instalação Manual

#### Backend (Django)

```bash
# Clone o repositório
git clone https://github.com/milinull/Arcadis-case.git
cd Arcadis-case

# Crie e ative ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instale as dependências
pip install -r requirements.txt

# Configure o banco de dados PostgreSQL
createdb Job_case

# Execute as migrations
python manage.py migrate

# Crie os schemas e tabelas
psql -d Job_case -f create_tables_case1.sql
psql -d Job_case -f create_tables_case2.sql
psql -d Job_case -f create_tables_case3.sql

# Inicie o servidor
python manage.py runserver
```

#### Frontend (React)

```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### Acesso ao pgAdmin

#### Credenciais de Acesso

Entre com as seguintes credenciais:

**Email**: `admin@admin.com`  
**Senha**: `admin`

#### Registrar Servidor PostgreSQL

1. Vá em **Servers** e clique com o botão direito
2. Selecione **Register** > **Server**
3. Adicione um nome à conexão, exemplo: `conexao`

**Aba Connection**:

| Campo                    | Valor      |
| ------------------------ | ---------- |
| **Host name/address**    | `db`       |
| **Port**                 | `5432`     |
| **Username**             | `postgres` |
| **Password**             | `1750`     |
| **Maintenance database** | `Job_case` |

> **Importante**: Todas as informações precisam ser as mesmas do `docker-compose.yml` e do arquivo `.env`

> Após a criação dos Schemas e Tabelas é necessário rodar o seguinte comando dentro do banco: `ALTER ROLE postgres SET search_path = case1,case2,case3,public;`

#### Ambiente Local

| Aplicação      | URL                             | Descrição                 |
| -------------- | ------------------------------- | ------------------------- |
| **Frontend**   | http://localhost:3001           | Dashboard React           |
| **API Django** | http://localhost:8000/api/case1 | Backend REST              |
| **API Django** | http://localhost:8000/api/case2 | Backend REST              |
| **API Django** | http://localhost:8000/api/case3 | Backend REST              |
| **PgAdmin**    | http://localhost:5050/          | Banco de dados PostgreSQL |
| **Swagger UI** | http://localhost:8000/swagger   | Documentação interativa   |
| **ReDoc**      | http://localhost:8000/redoc     | Documentação alternativa  |

---

## Cases

### Case 1: Extração de Dados de PDF

**Objetivo**: Extrair dados químicos de relatórios em PDF e gerar planilha Excel estruturada.

**Processo**:

1. Upload de arquivo PDF contendo resultados de análises químicas
2. Sistema extrai tabelas usando Camelot (OCR/Stream)
3. Dados são limpos, normalizados e salvos no banco
4. Excel formatado é gerado com formatação condicional (< LQ em cinza) e números em negrito

**Endpoint**: `POST /api/upload-pdf/`

**Banco de Dados**:

```sql
-- Schema: case1
-- Tabela: resultados_amostras
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
```

**Exemplo de Uso**:

```javascript
const formData = new FormData();
formData.append("file", pdfFile);

const response = await axios.post(
  "http://localhost:8000/api/upload-pdf/",
  formData,
  { responseType: "blob" },
);

// Download automático do Excel processado
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement("a");
link.href = url;
link.setAttribute("download", "processado.xlsx");
link.click();
```

---

### Case 2: Análise de Risco Ambiental

**Objetivo**: Calcular indicadores de risco ambiental e gerar relatório com formatação condicional.

**Processo**:

1. Upload de planilha Excel com dados de contaminantes
2. Sistema calcula menor valor entre ambientes (aberto/fechado)
3. Compara com VOR (Valores Orientadores) e solubilidade
4. Aplica formatação condicional:
   - **Laranja**: Valor considerado < VOR
   - **Cinza**: Valor considerado > Solubilidade (500 mg/L)
5. Gera relatório consolidado em Excel

**Endpoint**: `POST /api/upload-risk/`

**Banco de Dados**:

```sql
-- Schema: case2
-- Tabela: avaliacao_risco
CREATE TABLE case2.avaliacao_risco (
    id SERIAL PRIMARY KEY,
    cas VARCHAR(50),
    contaminante VARCHAR(255),
    efeito VARCHAR(2) CHECK (efeito IN ('C', 'NC')),
    ambientes_abertos NUMERIC,
    ambientes_fechados NUMERIC,
    vor_nome VARCHAR(150),
    valor_vor NUMERIC,
    solubilidade INTEGER DEFAULT 500,
    menor_valor_final NUMERIC,
    is_cinza BOOLEAN,
    is_laranja BOOLEAN
);
```

**Regras de Cálculo**:

```python
# Menor valor entre ambientes
menor_valor = min(ambientes_abertos, ambientes_fechados)

# Menor valor por grupo CAS
menor_grupo = df.groupby("CAS")["menor_valor"].transform("min")

# Valor final considerado
if menor_grupo < valor_vor:
    valor_final = valor_vor
else:
    valor_final = menor_grupo

# Formatação condicional
cinza = valor_final > 500  # Solubilidade
laranja = menor_grupo < valor_vor
```

---

### Case 3: Conversão de Dados Arcadis

**Objetivo**: Converter dados brutos para formato padronizado Arcadis.

**Processo**:

1. Upload de planilha Excel com dados de medições
2. Sistema reestrutura dados (pivot/melt)
3. Separa códigos de parâmetros e unidades
4. Normaliza formatação e nomenclatura
5. Gera Excel padronizado para Arcadis

**Endpoint**: `POST /api/upload-excel/`

**Banco de Dados**:

```sql
-- Schema: case3
-- Tabela: dados_coletados
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
```

**Transformações Aplicadas**:

- Junção de data + hora em timestamp único
- Reestruturação de colunas para linhas (melt)
- Extração de unidades entre parênteses
- Separação de códigos de parâmetros
- Normalização de nomes (Cond → Cond elet/clim)

---

## Documentação da API

### Endpoints Disponíveis

#### Case 1: Upload de PDF

```http
POST /api/upload-pdf/
Content-Type: multipart/form-data

file: [arquivo.pdf]
```

**Resposta**: Arquivo Excel (binary/octet-stream)

#### Case 2: Upload de Análise de Risco

```http
POST /api/upload-risk/
Content-Type: multipart/form-data

file: [arquivo.xlsx]
```

**Resposta**: Relatório Excel formatado (binary/octet-stream)

#### Case 3: Upload de Dados para Conversão

```http
POST /api/upload-excel/
Content-Type: multipart/form-data

file: [arquivo.xlsx]
```

**Resposta**: Excel padronizado Arcadis (binary/octet-stream)

### ViewSets (CRUD Completo)

Cada caso possui um ViewSet para operações CRUD:

```http
# Case 1 - Resultados de Amostras
GET    /api/resultados-amostras/
POST   /api/resultados-amostras/
GET    /api/resultados-amostras/{id}/
PUT    /api/resultados-amostras/{id}/
DELETE /api/resultados-amostras/{id}/

# Case 2 - Avaliação de Risco
GET    /api/avaliacao-risco/
POST   /api/avaliacao-risco/
GET    /api/avaliacao-risco/{id}/
PUT    /api/avaliacao-risco/{id}/
DELETE /api/avaliacao-risco/{id}/

# Case 3 - Dados Coletados
GET    /api/dados-coletados/
POST   /api/dados-coletados/
GET    /api/dados-coletados/{id}/
PUT    /api/dados-coletados/{id}/
DELETE /api/dados-coletados/{id}/
```

### Exemplo de Requisição (Python)

```python
import requests

# URL base (produção)
BASE_URL = 'http://35.175.150.159:8000/api'

# Upload de PDF (Case 1)
with open('relatorio.pdf', 'rb') as f:
    files = {'file': f}
    response = requests.post(
        f'{BASE_URL}/upload-pdf/',
        files=files
    )

    # Salvar Excel retornado
    with open('resultado.xlsx', 'wb') as output:
        output.write(response.content)
```

### Exemplo de Requisição (JavaScript/Axios)

```javascript
// URL base (produção)
const BASE_URL = "http://35.175.150.159:8000/api";

const uploadFile = async (file, endpoint) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: "blob",
    });

    // Download automático
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `processado_${file.name}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Erro no upload:", error);
  }
};

// Uso
uploadFile(pdfFile, "upload-pdf");
uploadFile(excelFile, "upload-risk");
uploadFile(excelFile, "upload-excel");
```

---

## Interface do Usuário

### Componentes React

O frontend possui três componentes principais, um para cada caso de uso:

#### UploadPDF.js (Case 1)

- Tema: Vermelho (`#dc3545`)
- Ícone: `fa-file-pdf`
- Aceita: `.pdf`
- Descrição: Extração de dados químicos de relatórios PDF

#### UploadRisk.js (Case 2)

- Tema: Laranja (`#e76a25`)
- Ícone: `fa-exclamation-triangle`
- Aceita: `.xlsx`, `.xls`
- Descrição: Análise automática de risco ambiental

#### UploadExcel.js (Case 3)

- Tema: Verde (`#28a745`)
- Ícone: `fa-cloud-upload-alt`
- Aceita: `.xlsx`, `.xls`
- Descrição: Conversão para padrão Arcadis

### Recursos da Interface

- **Drag and Drop** - Arraste e solte arquivos
- **Preview de arquivo** - Visualização do arquivo selecionado
- **Indicador de progresso** - Feedback visual durante upload
- **Download automático** - Arquivo processado baixado automaticamente
- **Validação de formato** - Rejeita formatos inválidos
- **Instruções claras** - Guia passo a passo para cada caso
- **Arquivos de exemplo** - Links para download de templates

---

## Stack Tecnológico

### Backend

| Tecnologia                | Versão | Uso                     |
| ------------------------- | ------ | ----------------------- |
| **Python**                | 3.12+  | Linguagem principal     |
| **Django**                | 5.2+   | Framework web           |
| **Django REST Framework** | 3.15+  | API RESTful             |
| **PostgreSQL**            | 14+    | Banco de dados          |
| **Camelot-py**            | 0.11+  | Extração de tabelas PDF |
| **Pandas**                | 2.2+   | Manipulação de dados    |
| **XlsxWriter**            | 3.2+   | Geração de Excel        |
| **NumPy**                 | 1.26+  | Computação numérica     |

### Frontend

| Tecnologia       | Versão | Uso                   |
| ---------------- | ------ | --------------------- |
| **React**        | 18+    | Framework UI          |
| **Reactstrap**   | 9+     | Componentes Bootstrap |
| **Axios**        | 1.7+   | Cliente HTTP          |
| **Font Awesome** | 6+     | Ícones                |

### Documentação API

| Tecnologia     | Uso                      |
| -------------- | ------------------------ |
| **drf-yasg**   | Geração Swagger/OpenAPI  |
| **Swagger UI** | Interface interativa     |
| **ReDoc**      | Documentação alternativa |

### DevOps

| Tecnologia         | Uso             |
| ------------------ | --------------- |
| **Docker**         | Containerização |
| **Docker Compose** | Orquestração    |
| **Gunicorn**       | WSGI server     |
| **Nginx**          | Reverse proxy   |

---

## Estrutura do Projeto

```
arcadis-platform/
├── backend/
│   ├── case1/                    # Módulo Case 1 (PDF)
│   │   ├── models.py             # Model ResultadosAmostras
│   │   ├── views.py              # UploadPDFView
│   │   ├── serializers.py        # Serializers
│   │   ├── utils.py              # Processamento PDF
│   │   └── urls.py               # Rotas
│   ├── case2/                    # Módulo Case 2 (Risco)
│   │   ├── models.py             # Model AvaliacaoRisco
│   │   ├── views.py              # UploadRiskView
│   │   ├── serializers.py        # Serializers
│   │   ├── utils.py              # Cálculo de risco
│   │   └── urls.py               # Rotas
│   ├── case3/                    # Módulo Case 3 (Conversão)
│   │   ├── models.py             # Model DadosColetados
│   │   ├── views.py              # UploadExcelView
│   │   ├── serializers.py        # Serializers
│   │   ├── utils.py              # Transformação
│   │   └── urls.py               # Rotas
│   ├── setup/                    # Configurações Django
│   │   ├── settings.py
│   │   └── urls.py               # Rotas principais
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadPDF.js      # Componente Case 1
│   │   │   ├── UploadRisk.js     # Componente Case 2
│   │   │   └── UploadExcel.js    # Componente Case 3
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── public/
├── sql/
│   ├── create_tables_case1.sql   # Schema Case 1
│   ├── create_tables_case2.sql   # Schema Case 2
│   └── create_tables_case3.sql   # Schema Case 3
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## Contato

**Desenvolvedor**: Raphael Nakamura  
**LinkedIn**: [LinkedIn](https://www.linkedin.com/in/raphael-nakamura017/)

---
