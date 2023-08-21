// Importa os componentes necessários do Mantine e de outras bibliotecas
import { Modal, Textarea, Button, Paper, Checkbox, Group, Badge, Card, Text } from '@mantine/core';
import { useState } from 'react';
import { sendCorrection } from '../components/data/fetchApiData'; // Importa a função sendCorrection para enviar correções à API
import { pdfjs } from 'react-pdf'; // Importa a biblioteca react-pdf para renderizar arquivos PDF

// Componente CorrectionModal para exibir o modal de correção
function CorrectionModal({ certificado, onClose }) {
  const [correcao, setCorrecao] = useState(''); // Estado para armazenar a correção digitada
  const [aprovar, setAprovar] = useState(false); // Estado para indicar se a correção foi aprovada
  const [showPDF, setShowPDF] = useState(false); // Estado para indicar se o PDF deve ser exibido

  // Configuração global para o worker da biblioteca react-pdf
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  // Função para marcar a correção como aprovada
  const handleAprovar = () => {
    setAprovar(true);
  };

  // Função para marcar a correção como rejeitada
  const handleRejeitar = () => {
    setAprovar(false);
  };

  // Função para enviar a correção à API
  const handleEnviar = async () => {
    try {
      const data = {
        certificadoId: certificado.id,
        aprovado: aprovar,
        correcao: correcao,
      };
      await sendCorrection(data); // Chama a função sendCorrection para enviar a correção
      onClose(); // Fecha o modal após o envio
    } catch (error) {
      console.error(error);
    }
  };

  // Função para obter o caminho relativo do arquivo PDF no servidor
  function getRelativePath(fullPath) {
    const serverUrl = "http://localhost:8081"; // Defina o URL do servidor aqui
    const ultimaBarraIndex = fullPath.lastIndexOf('\\');
    const penultimaBarraIndex = fullPath.lastIndexOf('\\', ultimaBarraIndex - 1);
    const relativePath = fullPath.substring(penultimaBarraIndex);
    return serverUrl + relativePath;
  }

  return (
    <Modal opened={true} onClose={onClose}>
      <Paper padding="xl">
        {!showPDF ? (
          <>
            {/* Renderiza os detalhes do certificado */}
            <p>Código: <Badge color="ciano" variant="light" radius="xs" size="md" style={{ marginLeft: 4 }}>{certificado.codigo}</Badge></p>
            <p>Descrição:<Text size='sm'> {certificado.atividade}</Text></p>
            <p>Pontuação:<Badge color="ciano" variant="light" radius="xs" size="md" style={{ marginLeft: 4 }}> {certificado.pontuacao}</Badge></p>
            <p>{certificado.descricao}</p>
            {/* Botão para exibir o PDF */}
            <Button
              onClick={() => setShowPDF(true)}
              style={{ padding: "8px 16px", marginBottom: "5px" }}
            >
              Ver PDF
            </Button>
            {/* Área de correção */}
            <Textarea
              value={correcao}
              onChange={(event) => setCorrecao(event.target.value)}
              placeholder="Digite sua correção aqui..."
            />
            {/* Opções de aprovação/rejeição */}
            <Checkbox.Group
              defaultValue={['']}
              label="Ação"
              description="Clique abaixo..."
              withAsterisk
            >
              <Group mt="xs">
                <Checkbox value="Aprovar" label="Aprovar" onClick={handleAprovar} />
                <Checkbox value="Rejeitar" label="Rejeitar" onClick={handleRejeitar} />
              </Group>
            </Checkbox.Group>
            {/* Botão para enviar a correção */}
            <Button
              onClick={handleEnviar}
              style={{ padding: "8px 16px", marginTop: "5px" }}
            >
              Enviar
            </Button>
          </>
        ) : (
          <>
            {/* Renderiza o arquivo PDF */}
            <iframe src={getRelativePath(certificado.caminhoArquivo)} width="100%" height="500px" />
            {/* Botão para voltar às informações */}
            <Button
              onClick={() => setShowPDF(false)}
              style={{ padding: "8px 16px", marginTop: "5px" }}
            >
              Voltar para as informações
            </Button>
          </>
        )}
      </Paper>
    </Modal>
  );
}

export default CorrectionModal; // Exporta o componente CorrectionModal como padrão
