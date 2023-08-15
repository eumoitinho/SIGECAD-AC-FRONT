import React, { useState } from 'react';
import { TextInput, Select, Button, Group, Badge } from '@mantine/core';
import { useForm } from '@mantine/form';
import data from './data/AcEngCompData.json';
import { sendCertificados, sendPdfCertificados } from './data/fetchApiData';

export const Formulario = ({
  formMode,
  setFormMode,
  setShowForm,
  getData,
}) =>
  {
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedAtividade, setSelectedAtividade] = useState(null);
  const [atividadesOptions, setAtividadesOptions] = useState([]);
  const [selectedPontuacao, setSelectedPontuacao] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(selectedAtividade);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (form.isValid()) {
      try {
        const certificadoFormData = {
          codigo: selectedAtividade ? selectedAtividade.value : null,
          atividade: selectedAtividade ? selectedAtividade.label : null,
          pontuacao: selectedAtividade ? selectedAtividade.pontuacao : null,
        };
  
        // Envia o certificado de atividade
        const response = await sendCertificados(certificadoFormData, user.cpf);
  
        if (response.success && selectedPdf) {
          const pdfResponse = await sendPdfCertificados(selectedPdf, response.id);
          if (pdfResponse.success) {
            console.log('Certificado e PDF enviados com sucesso!');
          } else {
            console.log('Erro ao enviar o PDF');
          }
        } else {
          console.log('Erro ao enviar o certificado');
        }
        getData();
        setShowForm(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  const handleGrupoChange = (selectedGroup) => {
    setSelectedGrupo(selectedGroup);
    form.setFieldValue('grupo', selectedGroup);
    form.setFieldValue('atividade', '');

    const atividades = selectedGroup && data.grupos[selectedGroup]
      ? Object.keys(data.grupos[selectedGroup]).map((atividadeKey) => ({
        value: atividadeKey,
        label: data.grupos[selectedGroup][atividadeKey].atividade,
        pontuacao: data.grupos[selectedGroup][atividadeKey].pontuacao || 0,
      }))
      : [];

    setAtividadesOptions(atividades);
  };

  const handleAtividadeChange = (selectedValue) => {
    const selectedAtividadeObj = atividadesOptions.find(option => option.value === selectedValue);
    if (selectedAtividadeObj) {
      setSelectedAtividade(selectedAtividadeObj);
      setSelectedPontuacao(selectedAtividadeObj.pontuacao);
      form.setFieldValue('atividade', selectedAtividadeObj.label);
    }

  };



  return (
    <div>
      <h2>Formulário de Atividades Acadêmicas</h2>
      <form onSubmit={onSubmit}>
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
        {selectedAtividade && selectedPontuacao !== null && (
          <Badge color="blue">{`Pontuação: ${selectedPontuacao}`}</Badge>
        )}
        <br />
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

        <Group position="right">
          <Button type="submit">Enviar</Button>
        </Group>
      </form>
    </div>
  );
}

export default Formulario;