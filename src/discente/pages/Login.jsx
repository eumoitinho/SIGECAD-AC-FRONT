import React from 'react';
import { useForm } from '@mantine/form';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, Stack, TextInput, Button, Image, Box, Group } from '@mantine/core';
import { getAluno } from '../../components/data/fetchApiData';
import HeaderPublic from '../../components/HeaderPublic';

function Login() {
    const loginform = useForm({
        initialValues: {
            cpf: '',
            password: '',
        },
    });
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
        const alunoData = await getAluno(loginform.values.cpf);
            
        if (alunoData && alunoData.password === loginform.values.password) {
            // Autenticação bem-sucedida
            const dataPutInLocalStorage = {
                cpf: alunoData.cpf,
                nome: alunoData.nome
            };
            localStorage.setItem('user',JSON.stringify(dataPutInLocalStorage));
            navigate("/");
        } 
        } catch (error) {
         console.log(error);
        }
    };

    return (
        <Box>
            <HeaderPublic />
            <div className="flex h-screen justify-center items-center">
                <Card xs={{ width: 400, padding: 'sm' }} shadow="lg">
                    <Group className="flex-container">
                        <Image
                            src={require('file:///D:/TCC/download.png')}
                            height={40}
                            width={50}
                        />
                        <span className="title-text">SIGECAD Atividades Complementares</span>
                    </Group>
                    <form action="" onSubmit={onSubmit}>
                        <Stack>
                            <TextInput
                                label="Nome de usuario"
                                placeholder="Digite seu nome de usuario"
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

export default Login;
