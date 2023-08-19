import React, { useEffect, useState } from 'react';
import { Badge, Group, Table, Button, Container } from '@mantine/core'; // Importe o componente Button
import { deleteCertificados } from '../components/data/fetchApiData';

export const Tabela = ({ certificados, handleOpenModal }) => {

  const user = JSON.parse(localStorage.getItem('user'));

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
          compact uppercase
            onClick={() => handleOpenModal(certificado)} // Chama o handler de deleção
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
            {getCertificadosRow}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Tabela;
