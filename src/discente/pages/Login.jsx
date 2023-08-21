// Importa as dependências necessárias do React e do Mantine
import React from 'react';
import { useForm } from '@mantine/form';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, Stack, TextInput, Button, Image, Box, Group } from '@mantine/core';
import { getAluno } from '../../components/data/fetchApiData'; // Importa a função para buscar dados do aluno
import HeaderPublic from '../../components/HeaderPublic'; // Importa o cabeçalho público

// Componente de Login
function Login() {
    // Cria um formulário usando o useForm do Mantine
    const loginform = useForm({
        initialValues: {
            cpf: '',
            password: '',
        },
    });
    const navigate = useNavigate(); // Cria uma função de navegação
    const onSubmit = async (event) => {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página
        try {
            const alunoData = await getAluno(loginform.values.cpf); // Busca os dados do aluno pelo CPF
            console.log(alunoData);
            if (alunoData && alunoData.password === loginform.values.password) {
                // Verifica a senha do aluno e se está matriculado na matéria com ID 1
                if (alunoData.materiaMatricula && alunoData.materiaMatricula.id === 1) {
                    // Autenticação bem-sucedida
                    const dataPutInLocalStorage = {
                        cpf: alunoData.cpf,
                        nome: alunoData.nome
                    };
                    localStorage.setItem('user', JSON.stringify(dataPutInLocalStorage)); // Armazena os dados do usuário no localStorage
                    navigate("/"); // Navega para a página principal
                } else {
                    console.log("Aluno não está matriculado na matéria de atividades complementares.");
                    alert("Você não está matriculado na matéria de atividades complementares.");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Renderiza a página de login
    return (
        <Box>
            {/* Renderiza o cabeçalho público */}
            <HeaderPublic />
            {/* Cria uma seção de login */}
            <div className="flex h-screen justify-center items-center">
                <Card xs={{ width: 400, padding: 'sm' }} shadow="lg">
                    {/* Grupo de elementos que inclui o logotipo e o título */}
                    <Group className="flex-container">
                        <Image
                            src={require('file:///D:/TCC/download.png')}
                            height={40}
                            width={50}
                        />
                        <span className="title-text">SIGECAD Atividades Complementares</span>
                    </Group>
                    {/* Formulário de login */}
                    <form action="" onSubmit={onSubmit}>
                        <Stack>
                            {/* Campo para o nome de usuário (CPF) */}
                            <TextInput
                                label="Nome de usuario"
                                placeholder="Digite seu nome de usuario"
                                name="cpf"
                                {...loginform.getInputProps('cpf')}
                            />
                            {/* Campo para a senha */}
                            <TextInput
                                label="Senha"
                                placeholder="Digite sua senha"
                                type="password"
                                name="password"
                                {...loginform.getInputProps('password')}
                            />
                        </Stack>
                        {/* Grupo de elementos de link e botão */}
                        <Group position="center" style={{ marginTop: '10px' }} spacing="24rem">
                            {/* Link para recuperação de senha */}
                            <a href="https://login.ufgd.edu.br/recuperar_senha" style={{ color: 'blue' }}>
                                Não consigo acessar a conta
                            </a>
                            {/* Botão de envio do formulário */}
                            <Button type="submit" color="blue">
                                Entrar
                            </Button>
                        </Group>
                    </form>
                </Card>
            </div>
        </Box>
    );
}

export default Login; // Exporta o componente de Login como padrão
