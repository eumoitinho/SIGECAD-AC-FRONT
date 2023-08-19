import { Modal, Textarea, Button, Paper } from '@mantine/core';
import { useState } from 'react';
import { sendCorrection } from '../components/data/fetchApiData';
import { Document, Page } from 'react-pdf'; // Importe o componente Document e Page do react-pdf
import { pdfjs } from 'react-pdf';

function CorrectionModal({ certificado, onClose }) {
  const [correcao, setCorrecao] = useState('');
  const [aprovar, setAprovar] = useState(false);
  const [showPDF, setShowPDF] = useState(false); // Estado para controlar a exibição do PDF

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const handleAprovar = () => {
    setAprovar(true);
  };

  const handleRejeitar = () => {
    setAprovar(false);
  };

  const handleEnviar = async () => {
    try {
      const data = {
        certificadoId: certificado.id,
        aprovado: aprovar,
        correcao: correcao,
      };
      await sendCorrection(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  function getRelativePath(fullPath) {
  const serverUrl = "http://192.168.100.182:8081"; // Defina o URL do servidor aqui
  const ultimaBarraIndex = fullPath.lastIndexOf('\\'); // Encontra a última barra
  const penultimaBarraIndex = fullPath.lastIndexOf('\\', ultimaBarraIndex - 1); // Encontra a penúltima barra
  const relativePath = fullPath.substring(penultimaBarraIndex);
  console.log(relativePath);
  return serverUrl + relativePath; // Concatena o URL do servidor com o caminho relativo
}
  console.log(getRelativePath);

  return (
    <Modal opened={true} onClose={onClose}>
      <Paper padding="md">
        {showPDF ? (
          <iframe src={getRelativePath(certificado.caminhoArquivo)} width="100%" height="500px" />
        ) : (
          <>
            <p>{certificado.codigo}</p>
            <p>{certificado.atividade}</p>
            <p>Pontuação: {certificado.pontuacao}</p>
            <p>{certificado.descricao}</p>
            <Button
              onClick={() => setShowPDF(!showPDF)}
              style={{ padding: "8px 16px", marginRight: "8px", marginBottom: "5px"}} // Adicione padding e margem direita
            >
              {showPDF ? 'Voltar para as informações' : 'Ver PDF'}
            </Button>
            <Textarea
              value={correcao}
              onChange={(event) => setCorrecao(event.target.value)}
              placeholder="Digite sua correção aqui..."
            />
            <Button
              onClick={handleAprovar}
              style={{ padding: "8px 16px", marginRight: "8px", marginTop: "5px" }} // Adicione padding e margem direita
            >
              Aprovar
            </Button>
            <Button
              onClick={handleRejeitar}
              style={{ padding: "8px 16px", marginRight: "8px", marginTop: "5px"}} // Adicione padding e margem direita
            >
              Rejeitar
            </Button>
            <Button
              onClick={handleEnviar}
              style={{ padding: "8px 16px",marginTop: "5px" }} // Adicione padding
            >
              Enviar
            </Button>
          </>
        )}
      </Paper>
    </Modal>
  );
  
}

export default CorrectionModal;
