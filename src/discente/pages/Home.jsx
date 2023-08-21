// Importa os componentes do Mantine e outras dependências
import React, { useEffect, useState } from "react";
import { Box, Card, Button, Modal, Group, Text, Stack, Badge} from "@mantine/core";

// Importa as funções para buscar dados da API e os componentes personalizados
import { getAluno, getCertificados } from "../../components/data/fetchApiData";
import Header from "../../components/Header";
import Tabela from "../../components/Tabela";
import Formulario from "../../components/Formulario";

// Componente Home para a página principal
function Home() {
  // Estados para controlar a exibição do formulário, modo do formulário, certificados e dados do aluno
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [certificados, setCertificados] = useState([]);
  const [aluno, setAluno] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage

  // Função para buscar dados da API e atualizar os estados
  const getData = async () => {
    try {
      const data = await getCertificados(user.cpf); // Obtém certificados do usuário
      const alunoData = await getAluno(user.cpf); // Obtém dados do aluno
      setAluno(alunoData);
      setCertificados(data);
      console.log(data);
      console.log(alunoData);
    } catch (error) {
      console.log(error);
    }
  }

  // Chama getData() quando o componente é montado
  useEffect(() => {
    getData();
  }, []);

  // Função para determinar o status do badge com base no aprovadoAtividadesComplementares
  const getBadgeStatus = (statusAprovado) => {
    if (statusAprovado === false) {
      return <Badge color="yellow" variant="light" radius="xs" size="md" style={{ marginLeft: 4 }}>Matriculado</Badge>;
    } else if (statusAprovado === true) {
      return <Badge color="green" variant="light" radius="xs" size="md" style={{ marginLeft: 4 }}>Aprovado</Badge>;
    } else {
      return <Badge color="red" variant="light" radius="xs" size="md" style={{ marginLeft: 4 }}>Reprovado</Badge>;
    }
  };

  // Função para lidar com a adição de certificados
  const handleAddCertificados = () => {
    setShowForm(true);
    setFormMode('add');
  };

  // Renderiza a página principal
  return (
    <Box>
      {/* Renderiza o cabeçalho */}
      <Header />
      <Card>
        {/* Grupo de elementos, incluindo o status e botão de adicionar */}
        <Group position="apart" style={{ marginBottom: '10px' }}>
          <Text>
            Status {getBadgeStatus(aluno.aprovadoAtividadesComplementares)}
          </Text>
          <Button
            onClick={handleAddCertificados}
            disabled={aluno.aprovadoAtividadesComplementares === true}
          >
            Adicionar
          </Button>
        </Group>
        {/* Renderiza a tabela de certificados */}
        <Tabela
          getData={getData}
          certificados={certificados}
          aluno={aluno}
          setFormMode={setFormMode}
        />
        {/* Modal para o formulário */}
        <Modal
          title={
            formMode === 'add'
              ? 'Adicione sua atividade'
              : formMode === 'view'
              ? 'Detalhes'
              : 'Edite sua atividade'
          }
          opened={showForm}
          onClose={() => setShowForm(false)}
        >
          <div style={{ padding: "20px" }}>
            {/* Renderiza o formulário */}
            <Formulario
              setFormMode={setFormMode}
              setShowForm={setShowForm}
              getData={getData}
              formMode={formMode} // Ajusta a ordem dos argumentos aqui
            />
          </div>
        </Modal>
      </Card>
    </Box>
  );
}

export default Home; // Exporta o componente Home como padrão
