import React, { useState, useRef } from "react";
import { Card, CardHeader, Row, Button, Alert, Table } from "reactstrap";
import axios from "axios";
import "./UploadExcel.css";

const UploadExcelComponent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, msg: "" });
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setFile(selectedFile);
      setStatus({ type: null, msg: "" });
    } else {
      setStatus({ type: "danger", msg: "Apenas arquivos Excel (.xlsx, .xls)" });
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload-excel/",
        formData,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `processado_${file.name}`);
      document.body.appendChild(link);
      link.click();

      setStatus({ type: "success", msg: "Sucesso! Download iniciado." });
      setFile(null);
    } catch (err) {
      setStatus({ type: "danger", msg: "Erro no processamento." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Upload de Excel - Case 3</h3>
          </div>
        </Row>
      </CardHeader>

      <div className="p-4">
        {/* Bloco de Instruções simplificado dentro do Card */}
        <div className="alert alert-secondary mb-4" role="alert">
          <strong>Instrução:</strong> Converta seus arquivos brutos para o
          padrão Arcadis.
        </div>

        {status.msg && <Alert color={status.type}>{status.msg}</Alert>}

        <div
          className={`upload-area ${file ? "has-file" : ""}`}
          onClick={() => !file && fileInputRef.current.click()}
          style={{
            cursor: "pointer",
            border: "2px dashed #ddd",
            padding: "40px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {!file ? (
            <div>
              <i className="fas fa-cloud-upload-alt fa-3x text-orange mb-3"></i>
              <p>Clique ou arraste o arquivo aqui</p>
            </div>
          ) : (
            <div>
              <i className="fas fa-file-excel fa-3x text-success mb-3"></i>
              <p className="font-weight-bold">{file.name}</p>
              <Button color="success" onClick={handleUpload} disabled={loading}>
                {loading ? "Processando..." : "Confirmar Processamento"}
              </Button>
              <Button
                color="danger"
                outline
                size="sm"
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UploadExcelComponent;
