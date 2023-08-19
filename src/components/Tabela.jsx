import React, { useEffect, useState } from 'react';
import { Badge, Group, Table, Button } from '@mantine/core'; // Importe o componente Button
import { Container } from './Styles';
import {deleteCertificados } from './data/fetchApiData'; // Importa as funções de chamada da API

export const Tabela = ({ certificados, getData }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDeleteCertificado = async (id) => {
    await deleteCertificados(id, user.cpf);
    getData();
  };

  const getBadgeStatus = (statusAprovado) => {
    if (statusAprovado === null) {
      return <Badge color="blue" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Enviado</Badge>;
    } else if (statusAprovado) {
      return <Badge color="green" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Aceito</Badge>;
    } else {
      return <Badge color="red" variant="light" radius="xs" size="xs" style={{ marginLeft: 4 }}>Rejeitado</Badge>;
    }
  };

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
            onClick={() => handleDeleteCertificado(certificado.id)}
            color="red"
            disabled={certificado.statusAprovado === true || certificado.statusAprovado === false}
          >
            Deletar
          </Button>
        </Group>
      </td>
      <tfoot>
      <td>{(certificado.pontuacaoAcumulada)}</td>
      </tfoot>
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
            {getCertificadosRow}
          </tbody>
          <tfoot> {/* Adicione o tfoot para a linha de rodapé da tabela */}
            <tr>
              <td colSpan="2">Pontuação Total:</td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </>
  );
};

export default Tabela;
