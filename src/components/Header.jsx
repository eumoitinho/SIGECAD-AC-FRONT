// Importa componentes do Mantine e outras dependências
import { Image, Portal, Text, Avatar, Paper } from "@mantine/core";
import React, { useState } from "react";
import { HeaderContainer, Logo } from "./Styles"; // Importa estilos do cabeçalho
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento

// Componente Header para exibir o cabeçalho da aplicação
function Header() {
    const [userMenuOpen, setUserMenuOpen] = useState(false); // Estado para controlar o menu do usuário
    const navigate = useNavigate(); // Função de navegação do React Router
    const handleUserClick = () => {
        setUserMenuOpen(!userMenuOpen); // Altera o estado do menu do usuário ao ser clicado
    };

    // Função para realizar o logout
    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove os dados do usuário do localStorage
        navigate("/login"); // Redireciona para a página de login
        // Poderiam ser adicionadas outras ações de logout aqui
    };

    const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage

    return (
        <HeaderContainer>
            <Logo>
                <Image
                    src={require("file:///D:/TCC/logo-ufgdnet.png")} // Exibe uma imagem do logo
                />
            </Logo>
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
                {/* Ícone do usuário e nome do usuário */}
                <div onClick={handleUserClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <i class="ri-user-fill"></i> {/* Ícone do usuário */}
                    <Text className="user-text">
                        {user?.nome || 'Nome do Usuário'} {/* Exibe o nome do usuário ou "Nome do Usuário" se não houver dados */}
                    </Text>
                    <span style={{ marginLeft: '4px',marginRight: '10px', marginTop: '10px', color: "#FFFF", fontSize: '8px'}}>{userMenuOpen ? '▲' : '▼'}</span>
                </div>
                {/* Menu suspenso do usuário */}
                {userMenuOpen && (
                    <Portal zIndex={1000}>
                        {/* Painel do menu suspenso */}
                        <Paper shadow="xs" withBorder style={{ position: 'absolute', top: '40px', right: 6 }}>
                            {/* Opção para sair/logoff */}
                            <div onClick={handleLogout} style={{ padding: '8px', cursor: 'pointer' }}>
                                Sair
                            </div>
                        </Paper>
                    </Portal>
                )}
            </div>
        </HeaderContainer>
    );
}

export default Header; // Exporta o componente Header como padrão
