// Importa os componentes necessários do Mantine e outras bibliotecas
import React, { useEffect, useState } from 'react';
import { Box, Card, Modal } from '@mantine/core';
import Header from '../components/Header'; // Importa o componente Header
import { getAlunoFromCurso, getCertificados } from '../components/data/fetchApiData'; // Importa as funções de chamada da API
import TabelaCoord from './TabelaCoord'; // Importa o componente TabelaCoord para exibir a tabela de alunos
import CorrectionArea from './CorrectionArea'; // Importa o componente CorrectionArea para a correção de alunos
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegar para outras páginas

// Componente HomeCoord para a área do coordenador
function HomeCoord() {
  const [alunos, setAlunos] = useState([]); // Estado para armazenar os alunos matriculados
  const [selectedAluno, setSelectedAluno] = useState(null); // Estado para armazenar o aluno selecionado
  const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage
  const navigate = useNavigate(); // Obtém a função navigate para navegação
  console.log(selectedAluno);

  // Função para obter os alunos matriculados
  const getData = async () => {
    try {
      const data = await getAlunoFromCurso(user.cpf, user.codcurso); // Chama a função para obter os alunos
      const alunosMatriculados = data.filter(aluno => aluno.materiaMatricula && aluno.materiaMatricula.id === 1); // Filtra apenas os alunos matriculados na matéria de atividades complementares
      setAlunos(alunosMatriculados); // Atualiza o estado com os alunos matriculados
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Função para abrir a área de correção para um aluno específico
  const openCorrectionArea = async (aluno) => {
    setSelectedAluno(aluno); // Atualiza o estado com o aluno selecionado
    try {
      navigate(`/CorrectionArea/${aluno.cpf}`); // Navega para a área de correção para o aluno específico
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Header /> {/* Renderiza o cabeçalho */}
      <Card>
        <TabelaCoord
          alunos={alunos}
          openCorrectionArea={openCorrectionArea} // Passa a função de abertura da área de correção para o componente TabelaCoord
        />
      </Card>
    </Box>
  );
}

export default HomeCoord; // Exporta o componente HomeCoord como padrão
