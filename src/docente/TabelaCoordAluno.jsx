// Importa os componentes necessários do Mantine e outros recursos
import React from 'react';
import { Badge, Group, Table, Button, Container } from '@mantine/core'; // Importa os componentes necessários
import { deleteCertificados } from '../components/data/fetchApiData'; // Importa a função deleteCertificados

// Componente Tabela para exibir os detalhes dos certificados
export const Tabela = ({ certificados, handleOpenModal }) => {
  // Pega os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Função para determinar o badge de status baseado no statusAprovado
  const getBadgeStatus = (statusAprovado) => {
    if (statusAprovado === null) {
      return <Badge color="blue" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Enviado</Badge>;
    } else if (statusAprovado) {
      return <Badge color="green" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Aceito</Badge>;
    } else {
      return <Badge color="red" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Rejeitado</Badge>;
    }
  };

  // Mapeia os certificados para as linhas da tabela
  const getCertificadosRow = certificados.map(certificado => (
    <tr key={certificado.id}>
      <td>{certificado.codigo}</td>
      <td style={{ fontSize: 10 }}>{certificado.atividade}</td>
      <td>{certificado.pontuacao}</td>
      <td>{getBadgeStatus(certificado.statusAprovado)}</td>
      <td>
        <Group position="right">
          <Button
            size="xs"
            compact
            uppercase
            onClick={() => handleOpenModal(certificado)} // Chama o handler para abrir o modal de correção
            color="yellow"
          >
            Corrigir
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Container style={{ display: 'flex', padding: '10px' }}>
        <Table verticalSpacing="xs" horizontalSpacing="xs" withColumnBorders striped>
          <thead>
            <tr>
              <th>Código</th>
              <th>Atividade</th>
              <th>Pontuação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {getCertificadosRow} {/* Renderiza as linhas de certificados */}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Tabela; // Exporta o componente Tabela como padrão
