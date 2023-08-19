import React, { useEffect, useState } from 'react';
import { Box, Card, Modal } from '@mantine/core';
import Header from '../components/Header';
import { getAlunoFromCurso, getCertificados } from '../components/data/fetchApiData';
import TabelaCoord from './TabelaCoord';
import CorrectionArea from './CorrectionArea';
import { useNavigate } from 'react-router-dom';

function HomeCoord() {
  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
 // Novo estado para os certificados
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  console.log(selectedAluno);

  const getData = async () => {
    try {
      const data = await getAlunoFromCurso(user.cpf, user.codcurso);
      const alunosMatriculados = data.filter(aluno => aluno.materiaMatricula && aluno.materiaMatricula.id === 1);
      setAlunos(alunosMatriculados);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const openCorrectionArea = async (aluno) => {
    setSelectedAluno(aluno);
    try {
      navigate(`/CorrectionArea/${aluno.cpf}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Header/>
      <Card>
        <TabelaCoord
          alunos={alunos}
          openCorrectionArea={openCorrectionArea}
        />
      </Card>
    </Box>
  );
}

export default HomeCoord;
