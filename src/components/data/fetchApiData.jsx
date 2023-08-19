

export const getCertificados = async (cpf) => {
    const response = await fetch(`http://localhost:8080/listar?alunoCpf=${cpf}`);
    const data = await response.json();
    return data;
};

export const getAluno = async (cpf) => {
  const response = await fetch(`http://localhost:8080/aluno/${cpf}`);
  const data = await response.json();
  return data;
};

export const getAlunoFromCurso = async (cpfcoord, codcurso) => {
  const response = await fetch(`http://localhost:8080/coordenador/${cpfcoord}/alunos/${codcurso}`);
  const data = await response.json();
  return data;
};

export const getCoord = async (cpf) => {
  const response = await fetch(`http://localhost:8080/coordenador/${cpf}`);
  const data = await response.json();
  return data;
};

export const deleteCertificados = async (id, cpf) => {
    const response = await fetch(`http://localhost:8080/remover/${id}?alunoCpf=${cpf}`, {
        method: 'DELETE'
      });
    const data = await response.json();
    return data;
};

export const changeCertificados = async (cpf) => {
    const response = await fetch(`http://localhost:8080/listar?alunoCpf=${cpf}`);
    const data = await response.json();
    return data;
};

export const sendCertificados = async (certificadoFormData, cpf) => {
  try {
    const response = await fetch(`http://localhost:8080/cadastrar?alunoCpf=${cpf}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(certificadoFormData),
    });

    const data = await response.json();
    return {
      success: response.ok,
      id: data.id, // Adicione esta linha para retornar o código gerado
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const sendCorrection = async (dataCorrection) => {
  try {
    const response = await fetch(`http://localhost:8080/corrigir`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataCorrection),
    });

    const data = await response.json();
    return {
      success: response.ok,
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const sendPdfCertificados = async (file, codigo) => {
  try {
    const formData = new FormData();
    formData.append('arquivoPdf', file);

    const response = await fetch(`http://localhost:8080/certificado/${codigo}/upload-pdf`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message, // Adicione esta linha para retornar a mensagem da resposta
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
