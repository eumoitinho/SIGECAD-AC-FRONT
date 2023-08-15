import React, { useEffect, useState } from 'react';
import { Badge, Group, Table, Button, Container } from '@mantine/core'; // Importe o componente Button
import { deleteCertificados } from '../components/data/fetchApiData';

export const Tabela = ({ certificados, getData }) => {

  const user = JSON.parse(localStorage.getItem('user'));

  const handleDeleteCertificado = async (id) => {
    // Chama a função para deletar o certificado
    await deleteCertificados(id, user.cpf);
    getData();
  };

  const getCertificadosRow = certificados.map(certificado => (
    <tr key={certificado.id}>
      <td>{certificado.codigo}</td>
      <td style={{ fontSize: 10 }}>{certificado.atividade}</td>
      <td>{certificado.pontuacao}</td>
      <td>
        <Badge color="blue" variant="light" radius='xs' size="xs" style={{ marginLeft: 4 }}>
          Enviado
        </Badge>
      </td>
      <td>
        <Group position="right">
          <Button
          size="xs"
          compact uppercase
            onClick={() => handleDeleteCertificado(certificado.id)} // Chama o handler de deleção
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
