// Importa os componentes necessários do Mantine e outros recursos
import React from 'react';
import { Badge, Group, Table, Button } from '@mantine/core'; // Importa o componente Button
import { Container } from '../components/Styles'; // Importa o componente Container

// Componente TabelaCoord para exibir os detalhes dos alunos
export const TabelaCoord = ({ alunos, openCorrectionArea }) => {
  // Mapeia os alunos para as linhas da tabela
  const getAlunosRow = alunos.map(aluno => (
    <tr key={aluno.cpf}>
      <td>{aluno.nome}</td>
      <td>{aluno.cpf}</td>
      <td>{aluno.email}</td>
      <td>{aluno.curso.nome}</td>
      <td>
        <Group position="center">
          <Button
            size="xs"
            compact
            uppercase
            color="blue"
            onClick={() => openCorrectionArea(aluno)} // Chama o handler para abrir a área de correção
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
            {getAlunosRow} {/* Renderiza as linhas de alunos */}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TabelaCoord; // Exporta o componente TabelaCoord como padrão
