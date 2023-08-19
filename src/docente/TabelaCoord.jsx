import React, { useEffect, useState } from 'react';
import { Badge, Group, Table, Button } from '@mantine/core'; // Importe o componente Button
import { Container } from '../components/Styles';

export const TabelaCoord = ({ alunos, openCorrectionArea }) => {


  const getAlunosRow = alunos.map(aluno => (
    <tr key={aluno.cpf}>
      <td>{aluno.nome}</td>
      <td >{aluno.cpf}</td>
      <td>{aluno.email}</td>
      <td>
      {aluno.curso.nome}
      </td>
      <td>
        <Group position="center">
          <Button
          size="xs"
          compact uppercase // Chama o handler de deleção
            color="blue"
            onClick={() => openCorrectionArea(aluno)}
          >
            Ver Certificados
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
              <th>Nome</th>
              <th>Cpf</th>
              <th>Email</th>
              <th>Curso</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {getAlunosRow}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TabelaCoord;
