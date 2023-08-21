// Função que obtém os certificados de um aluno com base no CPF
export const getCertificados = async (cpf) => {
  const response = await fetch(`http://localhost:8080/listar?alunoCpf=${cpf}`);
  const data = await response.json(); // Converte a resposta para formato JSON
  return data; // Retorna os dados dos certificados
};

// Função que obtém informações de um aluno com base no CPF
export const getAluno = async (cpf) => {
const response = await fetch(`http://localhost:8080/aluno/${cpf}`);
const data = await response.json(); // Converte a resposta para formato JSON
return data; // Retorna os dados do aluno
};

// Função que obtém alunos de um curso específico coordenado por um coordenador
export const getAlunoFromCurso = async (cpfcoord, codcurso) => {
const response = await fetch(`http://localhost:8080/coordenador/${cpfcoord}/alunos/${codcurso}`);
const data = await response.json(); // Converte a resposta para formato JSON
return data; // Retorna os dados dos alunos do curso
};

// Função que obtém informações de um coordenador com base no CPF
export const getCoord = async (cpf) => {
const response = await fetch(`http://localhost:8080/coordenador/${cpf}`);
const data = await response.json(); // Converte a resposta para formato JSON
return data; // Retorna os dados do coordenador
};

// Função que exclui um certificado com base no ID e CPF do aluno
export const deleteCertificados = async (id, cpf) => {
  const response = await fetch(`http://localhost:8080/remover/${id}?alunoCpf=${cpf}`, {
      method: 'DELETE' // Método HTTP DELETE para exclusão
    });
  const data = await response.json(); // Converte a resposta para formato JSON
  return data; // Retorna os dados do certificado excluído
};

// Função que obtém certificados de um aluno com base no CPF (mesmo propósito da primeira função)
export const changeCertificados = async (cpf) => {
  const response = await fetch(`http://localhost:8080/listar?alunoCpf=${cpf}`);
  const data = await response.json(); // Converte a resposta para formato JSON
  return data; // Retorna os dados dos certificados
};

// Função que envia um novo certificado para ser cadastrado
export const sendCertificados = async (certificadoFormData, cpf) => {
try {
  const response = await fetch(`http://localhost:8080/cadastrar?alunoCpf=${cpf}`, {
    method: 'POST', // Método HTTP POST para envio de dados
    headers: {
      'Content-Type': 'application/json', // Tipo de conteúdo JSON
    },
    body: JSON.stringify(certificadoFormData), // Dados do certificado em formato JSON
  });

  const data = await response.json(); // Converte a resposta para formato JSON
  return {
    success: response.ok, // Indica o sucesso da operação
    id: data.id, // Retorna o ID gerado para o novo certificado
  };
} catch (error) {
  console.log(error); // Registra erros no console
  return { success: false }; // Retorna informação de falha
}
};

// Função que envia dados de correção para processamento
export const sendCorrection = async (dataCorrection) => {
try {
  const response = await fetch(`http://localhost:8080/corrigir`, {
    method: 'POST', // Método HTTP POST para envio de dados
    headers: {
      'Content-Type': 'application/json', // Tipo de conteúdo JSON
    },
    body: JSON.stringify(dataCorrection), // Dados de correção em formato JSON
  });

  const data = await response.json(); // Converte a resposta para formato JSON
  return {
    success: response.ok, // Indica o sucesso da operação
  };
} catch (error) {
  console.log(error); // Registra erros no console
  return { success: false }; // Retorna informação de falha
}
};

// Função que envia um arquivo PDF para associação com um código de certificado
export const sendPdfCertificados = async (file, codigo) => {
try {
  const formData = new FormData();
  formData.append('arquivoPdf', file); // Anexa o arquivo ao FormData

  const response = await fetch(`http://localhost:8080/certificado/${codigo}/upload-pdf`, {
    method: 'POST', // Método HTTP POST para envio de arquivo
    body: formData, // Dados do arquivo no FormData
  });

  const data = await response.json(); // Converte a resposta para formato JSON
  return {
    success: response.ok, // Indica o sucesso da operação
    message: data.message, // Retorna a mensagem da resposta
  };
} catch (error) {
  console.log(error); // Registra erros no console
  return { success: false }; // Retorna informação de falha
}
};
