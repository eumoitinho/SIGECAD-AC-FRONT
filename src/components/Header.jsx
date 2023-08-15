import { Image, Portal, Text, Avatar, Paper } from "@mantine/core";
import React, { useState } from "react";
import { HeaderContainer, Logo } from "./Styles";
import { useNavigate } from "react-router-dom";

function Header() {
    const [userMenuOpen, setUserMenuOpen] = useState(false); // Estado para controlar o menu do usuário
    const navigate = useNavigate();
    const handleUserClick = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleLogout = () => {
        // Limpe o localStorage e faça outras ações necessárias de logout
        localStorage.removeItem('user');
        navigate("/login")
        // Execute outras ações de logout, como redirecionamento
    };

    const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage

    return (
        <HeaderContainer>
            <Logo>
                <Image
                    src={require("file:///D:/TCC/logo-ufgdnet.png")}
                />
            </Logo>
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
                <div onClick={handleUserClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <i class="ri-user-fill"></i>
                    <Text className="user-text">
                        {user?.nome || 'Nome do Usuário'}
                    </Text>
                    <span style={{ marginLeft: '4px',marginRight: '10px', marginTop: '10px', color: "#FFFF", fontSize: '8px'}}>{userMenuOpen ? '▲' : '▼'}</span>
                </div>
                {userMenuOpen && (
                    <Portal zIndex={1000}>
                        <Paper shadow="xs" withBorder style={{ position: 'absolute', top: '40px', right: 6 }}>
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

export default Header;
