// Importa os componentes necessários do Mantine e outras bibliotecas
import React from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, TextInput, Button, Image, Box, Group } from '@mantine/core';
import HeaderPublic from '../components/HeaderPublic'; // Importa o componente HeaderPublic
import { getCoord } from '../components/data/fetchApiData'; // Importa a função para obter informações do coordenador

// Componente LoginCoord para a página de login do coordenador
function LoginCoord() {
    const loginform = useForm({
        initialValues: {
            cpf: '',
            password: '',
        },
    });
    const navigate = useNavigate(); // Obtém a função navigate para navegação
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const coordData = await getCoord(loginform.values.cpf); // Chama a função para obter informações do coordenador

            if (coordData && coordData.password === loginform.values.password) {
                // Autenticação bem-sucedida
                const dataPutInLocalStorage = {
                    cpfcoord: coordData.cpf,
                    nome: coordData.nome,
                    codcurso: coordData.curso.codigo 
                };
                localStorage.setItem('user', JSON.stringify(dataPutInLocalStorage)); // Armazena as informações do coordenador no localStorage
                navigate("/HomeCoord"); // Navega para a página HomeCoord após o login bem-sucedido
            } 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <HeaderPublic /> {/* Renderiza o cabeçalho público */}
            <div className="flex h-screen justify-center items-center">
                <Card xs={{ width: 400, padding: 'sm' }} shadow="lg">
                    <Group className="flex-container">
                        <Image
                            src={require('file:///D:/TCC/download.png')} // Define a imagem do logo
                            height={40}
                            width={50}
                        />
                        <span className="title-text">SIGECAD Coord. Atividades Complementares</span>
                    </Group>
                    <form action="" onSubmit={onSubmit}>
                        <Stack>
                            <TextInput
                                label="Nome de usuário"
                                placeholder="Digite seu nome de usuário"
                                name="cpf"
                                {...loginform.getInputProps('cpf')}
                            />
                            <TextInput
                                label="Senha"
                                placeholder="Digite sua senha"
                                type="password"
                                name="password"
                                {...loginform.getInputProps('password')}
                            />
                        </Stack>
                        <Group position="center" style={{ marginTop: '10px' }} spacing="24rem">
                            <a href="https://login.ufgd.edu.br/recuperar_senha" style={{ color: 'blue' }}>
                                Não consigo acessar a conta
                            </a>
                            <Button type="submit" color="green">
                                Entrar
                            </Button>
                        </Group>
                    </form>
                </Card>
            </div>
        </Box>
    );
}

export default LoginCoord; // Exporta o componente LoginCoord como padrão
