// Importa o React, useEffect e useState para o gerenciamento de estado
import React, { useEffect, useState } from 'react';
import { Badge, Group, Table, Button } from '@mantine/core'; // Importa os componentes do Mantine, incluindo Button
import { Container } from './Styles'; // Importa estilos do componente
import { deleteCertificados } from './data/fetchApiData'; // Importa a função para deletar certificados da API

// Componente Tabela para exibir uma tabela de certificados
export const Tabela = ({ certificados, getData, aluno }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage

  // Função para lidar com a exclusão de um certificado
  const handleDeleteCertificado = async (id) => {
    await deleteCertificados(id, user.cpf); // Chama a função para deletar o certificado da API
    getData(); // Atualiza os dados após a exclusão
  };

  // Função para determinar o status do badge com base no statusAprovado
  const getBadgeStatus = (statusAprovado) => {
    if (statusAprovado === null) {
      return <Badge color="blue" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Enviado</Badge>;
    } else if (statusAprovado) {
      return <Badge color="green" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Aceito</Badge>;
    } else {
      return <Badge color="red" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Rejeitado</Badge>;
    }
  };

  // Gera as linhas da tabela com base nos certificados
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
            onClick={() => handleDeleteCertificado(certificado.id)} // Chama a função de exclusão ao clicar no botão
            color="red"
            disabled={certificado.statusAprovado === true || certificado.statusAprovado === false} // Desativa o botão se o certificado estiver aceito ou rejeitado
          >
            Deletar
          </Button>
        </Group>
      </td>
    </tr>
  ));

  // Renderiza o componente de tabela
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
            {getCertificadosRow} {/* Renderiza as linhas da tabela geradas pela função */}
          </tbody>
          <tfoot> {/* Adiciona o rodapé da tabela */}
            <tr>
              <td colSpan="2">Pontuação Total: <Badge color="blue" variant="light" radius="sm" size="md" style={{ marginLeft: 4 }}>{aluno.pontuacaoAcumulada}</Badge></td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </>
  );
};

export default Tabela; // Exporta o componente Tabela como padrão
