// Importa o componente Image do Mantine e o React
import { Image } from "@mantine/core";
import React from "react";
import { HeaderContainer, Logo } from "./StylesPublic"; // Importa estilos do cabeçalho público

// Componente HeaderPublic para exibir o cabeçalho da parte pública da aplicação
function HeaderPublic() {
    return (
        <HeaderContainer>
            <Logo>
                <Image
                    src={"https://ufgdnet.ufgd.edu.br/imagens/logo_publico_ufgdnet.png"} // Exibe uma imagem do logo público
                />
            </Logo>
        </HeaderContainer>
    );
}

export default HeaderPublic; // Exporta o componente HeaderPublic como padrão
