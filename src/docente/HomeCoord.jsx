import React, { useEffect, useState } from 'react';
import { Box, Card, Modal } from '@mantine/core';
import Header from '../components/Header';
import { getAlunoFromCurso, getCertificados } from '../components/data/fetchApiData';
import TabelaCoord from './TabelaCoord';
import TabelaCoordAluno from './TabelaCoordAluno'; 

function HomeCoord() {
  const [alunos, setAlunos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [certificados, setCertificados] = useState([]); // Novo estado para os certificados
  const user = JSON.parse(localStorage.getItem('user'));

  const getData = async () => {
    try {
      const data = await getAlunoFromCurso(user.cpf, user.codcurso);
      setAlunos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const openCertificadoModal = async (aluno) => {
    setSelectedAluno(aluno);
    setShowForm(true);

    try {
      const datacertificados = await getCertificados(aluno.cpf);
      setCertificados(datacertificados); // Atualizar o estado de certificados
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
          openCertificadoModal={openCertificadoModal}
        />
          {selectedAluno && (
            <TabelaCoordAluno
              certificados={certificados} // Usar o estado certificados
              onClose={() => setShowForm(false)}
            />
          )}
      </Card>
    </Box>
  );
}

export default HomeCoord;
