import { Image } from "@mantine/core";
import React from "react";
import {  HeaderContainer, Logo} from "./StylesPublic";

function HeaderPublic() {
    return (
        <HeaderContainer>
            <Logo>
                <Image
                    src={("https://ufgdnet.ufgd.edu.br/imagens/logo_publico_ufgdnet.png")}
                />
            </Logo>
        </HeaderContainer>
    );
}

export default HeaderPublic;