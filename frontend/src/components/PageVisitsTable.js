import React, { useState } from "react";
import { Button, Card, CardHeader, Table, Row } from "reactstrap";
import api from "../services/api";
import "./AnaliseEntryTable.css";

const AnaliseEntryTable = () => {
  // const das linhas da tabela
  const [rows, setRows] = useState([
    {
      cas: "",
      nome: "",
      efeito: "C",
      ambiente: "Aberto",
      vor: "",
      valor_vor: "",
      concentracao_max: "",
      solu_concentracao: 500,
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Função para adicionar uma nova linha vazia
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        cas: "",
        nome: "",
        efeito: "C",
        ambiente: "Aberto",
        vor: "",
        valor_vor: "",
        concentracao_max: "",
        solu_concentracao: 500,
      },
    ]);
  };

  // Função para remover uma linha específica pelo index
  const handleRemoveRow = (index) => {
    const novasLinhas = [...rows];
    novasLinhas.splice(index, 1);
    setRows(novasLinhas);
  };

  // Função para atualizar o valor do campo quando digita
  const handleChange = (index, field, value) => {
    const novasLinhas = [...rows];
    novasLinhas[index][field] = value;
    setRows(novasLinhas);
  };

  // Salva no banco e depois baixa o Excel
  const handleSalvarEBaixar = async () => {
    setLoading(true);
    try {
      const responseSave = await api.post("/", rows);
      const dadosSalvos = responseSave.data;
      const ids = dadosSalvos.map((item) => item.id);

      if (!ids || ids.length === 0) {
        throw new Error("Nenhum ID retornado.");
      }
      const idsQuery = ids.join(",");
      const urlExcel = `exportar-excel/?ids=${idsQuery}`;

      // Faz a requisição do arquivo
      const responseExcel = await api.get(urlExcel, {
        responseType: "blob",
      });

      // Download
      const blobUrl = window.URL.createObjectURL(
        new Blob([responseExcel.data]),
      );
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "Relatorio_Novos_Dados.xlsx");
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      alert("Sucesso! Dados salvos e relatório baixado.");
    } catch (error) {
      console.error(error);
      alert(
        "Erro ao processar. Verifique se os campos numéricos estão corretos.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow mb-5">
      <CardHeader className="border-0 py-2">
        <Row className="align-items-center">
          <div className="col">
            <h5 className="mb-0">Entrada de Dados</h5>
          </div>
          <div className="col text-right">
            {/* Botão Único (Usa a classe verde do Excel) */}
            <Button
              className="btn-mini btn-excel"
              onClick={handleSalvarEBaixar}
              size="sm"
              disabled={loading}
              style={{
                backgroundColor: "#28a745",
                color: "#FFFFFF",
                fontSize: "11px",
                padding: "6px 12px",
                fontWeight: "bold",
              }}
            >
              <i
                className={`fas ${
                  loading ? "fa-spinner fa-spin" : "fa-save"
                } mr-1`}
              />
              {loading ? "Processando..." : "Salvar e Baixar Relatório"}
            </Button>
          </div>
        </Row>
      </CardHeader>

      <div style={{ overflowX: "auto" }}>
        <Table
          className="align-items-center table-bordered mb-0"
          responsive
          style={{ margin: 0 }}
        >
          <thead>
            {/* Cabeçalho */}
            <tr>
              <th className="header-laranja" style={{ width: "10%" }}>
                CAS Nº
              </th>
              <th className="header-laranja" style={{ width: "25%" }}>
                CONTAMINANTE
              </th>
              <th className="header-laranja" style={{ width: "6%" }}>
                EFEITO
              </th>
              <th className="header-laranja" style={{ width: "10%" }}>
                AMBIENTE
              </th>
              <th className="header-laranja" style={{ width: "10%" }}>
                FONTE VOR
              </th>
              <th className="header-laranja" style={{ width: "10%" }}>
                VALOR VOR
              </th>
              <th className="header-laranja" style={{ width: "10%" }}>
                CONC. MÁX
              </th>
              <th className="header-laranja" style={{ width: "10%" }}>
                SOLUBILIDADE
              </th>
              <th className="header-laranja" style={{ width: "5%" }}>
                #
              </th>
            </tr>
          </thead>
          {/* Inputs */}
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="celula-input">
                  <input
                    className="input-tabela"
                    value={row.cas}
                    onChange={(e) => handleChange(index, "cas", e.target.value)}
                    placeholder="00-00-0"
                  />
                </td>
                <td className="celula-input">
                  <input
                    className="input-tabela"
                    style={{ textAlign: "left" }}
                    value={row.nome}
                    onChange={(e) =>
                      handleChange(index, "nome", e.target.value)
                    }
                    placeholder="Nome..."
                  />
                </td>
                <td className="celula-input">
                  <select
                    className="select-tabela"
                    value={row.efeito}
                    onChange={(e) =>
                      handleChange(index, "efeito", e.target.value)
                    }
                  >
                    <option value="C">C</option>
                    <option value="NC">NC</option>
                  </select>
                </td>
                <td className="celula-input">
                  <select
                    className="select-tabela"
                    value={row.ambiente}
                    onChange={(e) =>
                      handleChange(index, "ambiente", e.target.value)
                    }
                  >
                    <option value="Aberto">Aberto</option>
                    <option value="Fechado">Fechado</option>
                  </select>
                </td>
                <td className="celula-input">
                  <input
                    className="input-tabela"
                    value={row.vor}
                    onChange={(e) => handleChange(index, "vor", e.target.value)}
                  />
                </td>
                <td className="celula-input">
                  <input
                    type="number"
                    step="any"
                    className="input-tabela"
                    value={row.valor_vor}
                    onChange={(e) =>
                      handleChange(index, "valor_vor", e.target.value)
                    }
                  />
                </td>
                <td className="celula-input">
                  <input
                    type="number"
                    step="any"
                    className="input-tabela"
                    value={row.concentracao_max}
                    onChange={(e) =>
                      handleChange(index, "concentracao_max", e.target.value)
                    }
                  />
                </td>
                <td className="celula-input">
                  <input
                    type="number"
                    className="input-tabela"
                    value={row.solu_concentracao}
                    onChange={(e) =>
                      handleChange(index, "solu_concentracao", e.target.value)
                    }
                  />
                </td>
                <td className="celula-input text-center">
                  {rows.length > 1 && (
                    <Button
                      color="danger"
                      className="btn-mini"
                      onClick={() => handleRemoveRow(index)}
                      style={{
                        borderRadius: "50%",
                        width: "18px",
                        height: "18px",
                        padding: 0,
                        lineHeight: "18px",
                      }}
                    >
                      <i className="fas fa-times" style={{ fontSize: "9px" }} />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Botão de adicionar linha no final */}
        <div
          className="text-center p-2 border-top btn-add-row"
          onClick={handleAddRow}
        >
          <i className="fas fa-plus-circle mr-1"></i> ADICIONAR LINHA
        </div>
      </div>
    </Card>
  );
};

export default AnaliseEntryTable;
