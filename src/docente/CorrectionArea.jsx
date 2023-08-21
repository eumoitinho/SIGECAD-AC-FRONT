// Importa os componentes necessários do Mantine e do React
import { Box, Card, Group, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import TabelaCoordAluno from './TabelaCoordAluno';
import { useParams } from 'react-router-dom'; // Importa o hook useParams para obter os parâmetros da URL
import { getAluno, getCertificados } from '../components/data/fetchApiData'; // Importa funções para buscar dados da API
import CorrectionModal from './CorrectionModal'; // Importa o componente CorrectionModal

// Componente CorrectionArea para a área de correção de certificados
function CorrectionArea() {
    const [certificados, setCertificados] = useState([]); // Estado para armazenar os certificados
    const { cpf } = useParams(); // Obtém o parâmetro 'cpf' da URL
    const [modalAberto, setModalAberto] = useState(false); // Estado para controlar a abertura do modal
    const [certificadoSelecionado, setCertificadoSelecionado] = useState(null); // Estado para armazenar o certificado selecionado
    const [aluno, setAluno] = useState([]); // Estado para armazenar os dados do aluno

    // Função para abrir o modal com o certificado selecionado
    const handleOpenModal = (certificado) => {
        setCertificadoSelecionado(certificado);
        setModalAberto(true);
    };

    // Função para buscar os dados do aluno e certificados da API
    const fetchData = async () => {
        try {
            const datacertificados = await getCertificados(cpf);
            setCertificados(datacertificados);
            const alunoData = await getAluno(cpf);
            setAluno(alunoData);
            console.log(certificados);
        } catch (error) {
            console.error(error);
        }
    };

    // Efeito para buscar os dados quando o parâmetro 'cpf' na URL muda
    useEffect(() => {
        fetchData(cpf);
    }, [cpf]);

    return (
        <Box>
            <Header /> {/* Renderiza o cabeçalho */}
            <Card>
                {/* Grupo de elementos para exibir o nome do aluno */}
                <Group position="left" style={{ marginBottom: '10px' }}>
                    <Text>
                        {aluno.nome}
                    </Text>
                </Group>
                {/* Renderiza a tabela de certificados com a função para abrir o modal */}
                <TabelaCoordAluno
                    certificados={certificados}
                    handleOpenModal={handleOpenModal}
                />
                {/* Renderiza o modal de correção se estiver aberto */}
                {modalAberto && (
                    <CorrectionModal
                        certificado={certificadoSelecionado}
                        onClose={() => setModalAberto(false)} // Função para fechar o modal
                    />
                )}
            </Card>
        </Box>
    );
}

export default CorrectionArea; // Exporta o componente CorrectionArea como padrão
