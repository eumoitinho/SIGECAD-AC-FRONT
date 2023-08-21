// Importa React, useState e componentes do Mantine e outras dependências
import React, { useState } from 'react';
import { TextInput, Select, Button, Group, Badge } from '@mantine/core';
import { useForm } from '@mantine/form';
import data from './data/AcEngCompData.json'; // Importa dados de um arquivo JSON
import { sendCertificados, sendPdfCertificados } from './data/fetchApiData'; // Importa funções para enviar certificados e PDFs

// Componente de formulário para atividades acadêmicas
export const Formulario = ({
  formMode,
  setFormMode,
  setShowForm,
  getData,
}) => {
  // Estado para controlar seleções e dados do formulário
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedAtividade, setSelectedAtividade] = useState(null);
  const [atividadesOptions, setAtividadesOptions] = useState([]);
  const [selectedPontuacao, setSelectedPontuacao] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')); // Obtém dados do usuário do localStorage
  console.log(selectedAtividade);

  // Configuração do formulário usando o hook useForm do Mantine
  const form = useForm({
    initialValues: {
      grupo: '',
      atividade: '',
      pdf: null,
    },
    validationRules: {
      grupo: (value) => (value ? null : 'Selecione um grupo'),
      atividade: (value) => (value ? null : 'Selecione uma atividade'),
      pdf: (value) => (value ? null : 'Envie um PDF'),
    },
  });

  // Função chamada quando o formulário é enviado
  const onSubmit = async (event) => {
    event.preventDefault();
    if (form.isValid()) {
      try {
        const certificadoFormData = {
          codigo: selectedAtividade ? selectedAtividade.value : null,
          atividade: selectedAtividade ? selectedAtividade.label : null,
          pontuacao: selectedAtividade ? selectedAtividade.pontuacao : null,
        };

        // Envia o certificado de atividade para a API
        const response = await sendCertificados(certificadoFormData, user.cpf);

        if (response.success && selectedPdf) {
          // Envia o arquivo PDF associado ao certificado
          const pdfResponse = await sendPdfCertificados(selectedPdf, response.id);
          if (pdfResponse.success) {
            console.log('Certificado e PDF enviados com sucesso!');
          } else {
            console.log('Erro ao enviar o PDF');
          }
        } else {
          console.log('Erro ao enviar o certificado');
        }
        getData(); // Atualiza os dados após o envio
        setShowForm(false); // Fecha o formulário
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Função chamada quando o grupo é selecionado
  const handleGrupoChange = (selectedGroup) => {
    setSelectedGrupo(selectedGroup);
    form.setFieldValue('grupo', selectedGroup);
    form.setFieldValue('atividade', '');

    // Gera opções de atividades com base no grupo selecionado
    const atividades = selectedGroup && data.grupos[selectedGroup]
      ? Object.keys(data.grupos[selectedGroup]).map((atividadeKey) => ({
        value: atividadeKey,
        label: data.grupos[selectedGroup][atividadeKey].atividade,
        pontuacao: data.grupos[selectedGroup][atividadeKey].pontuacao || 0,
      }))
      : [];

    setAtividadesOptions(atividades);
  };

  // Função chamada quando a atividade é selecionada
  const handleAtividadeChange = (selectedValue) => {
    const selectedAtividadeObj = atividadesOptions.find(option => option.value === selectedValue);
    if (selectedAtividadeObj) {
      setSelectedAtividade(selectedAtividadeObj);
      setSelectedPontuacao(selectedAtividadeObj.pontuacao);
      form.setFieldValue('atividade', selectedAtividadeObj.label);
    }
  };

  // Renderiza o componente de formulário
  return (
    <div>
      <h2>Formulário de Atividades Acadêmicas</h2>
      <form onSubmit={onSubmit}>
        {/* Select para escolher o grupo */}
        <Select
          name="Grupo"
          label="Grupo"
          withAsterisk
          placeholder="Selecione o grupo"
          data={[
            { value: '', label: 'Selecione o grupo' },
            ...Object.keys(data.grupos).map((grupoKey) => ({
              value: grupoKey,
              label: grupoKey,
            })),
          ]}
          value={selectedGrupo}
          onChange={(value) => {
            handleGrupoChange(value);
          }}
          error={form.errors.grupo}
          disabled={form.isSubmitting}
        />
        <br />
        {/* Select para escolher a atividade */}
        <Select
          name="Atividade"
          label="Atividade"
          withAsterisk
          placeholder="Selecione a atividade"
          data={[
            { value: '', label: 'Selecione a atividade' },
            ...atividadesOptions,
          ]}
          value={selectedAtividade ? selectedAtividade.value : ''}
          onChange={(value) => {
            handleAtividadeChange(value);
          }}
          disabled={!selectedGrupo}
        />
        <br />
        {/* Mostra a pontuação da atividade selecionada */}
        {selectedAtividade && selectedPontuacao !== null && (
          <Badge color="blue">{`Pontuação: ${selectedPontuacao}`}</Badge>
        )}
        <br />
        {/* Input para enviar um arquivo PDF */}
        <TextInput
          label="Enviar PDF:"
          type="file"
          id="pdf"
          name="pdf"
          accept=".pdf"
          onChange={(event) => setSelectedPdf(event.target.files[0])}
          disabled={!selectedAtividade}
        />
        <br />
        {/* Botão de envio */}
        <Group position="right">
          <Button type="submit">Enviar</Button>
        </Group>
      </form>
    </div>
  );
}

// Exporta o componente Formulario como padrão
export default Formulario;
