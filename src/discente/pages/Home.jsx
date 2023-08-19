import React, { useEffect, useState } from "react";
import { Box, Card, Button, Modal, Group} from "@mantine/core";
import { getCertificados } from "../../components/data/fetchApiData";
import Header from "../../components/Header";
import Tabela from "../../components/Tabela";
import Formulario from "../../components/Formulario";



function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [certificados, setCertificados] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const getData = async () => {
    try {
      const data = await getCertificados(user.cpf);
      setCertificados(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleAddCertificados = () => {
    setShowForm(true);
    setFormMode('add');
  };

  return (
    <Box>
      <Header />
      <Card>
      <Group position="right" style={{ marginBottom: '10px' }}>
        <Button onClick={handleAddCertificados}>Adicionar</Button>
        </Group>
        <Tabela
          getData={getData}
          certificados={certificados}
          setFormMode={setFormMode}
        />
        <Modal title={formMode === 'add' ? 'Adicione sua atividade' : formMode === 'view' ? 'Detalhes' : 'Edite sua atividade'} opened={showForm} onClose={() => setShowForm(false)}>
          <div style={{ padding: "20px" }}>
            <Formulario
              setFormMode={setFormMode}
              setShowForm={setShowForm}
              getData={getData}
              formMode={formMode} // Ajuste a ordem dos argumentos aqui
            />
          </div>
        </Modal>
      </Card>
    </Box>
  );
}

export default Home;
