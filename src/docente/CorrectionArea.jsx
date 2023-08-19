import { Box, Card } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import TabelaCoordAluno from './TabelaCoordAluno';
import { useParams } from 'react-router-dom';
import { getCertificados } from '../components/data/fetchApiData';
import CorrectionModal from './CorrectionModal';

function CorrectionArea() {
    const [certificados, setCertificados] = useState([]);
    const { cpf } = useParams();
    const [modalAberto, setModalAberto] = useState(false); // Adicione o estado modalAberto
    const [certificadoSelecionado, setCertificadoSelecionado] = useState(null); // Adicione o estado certificadoSelecionado

    const handleOpenModal = (certificado) => {
        setCertificadoSelecionado(certificado);
        setModalAberto(true);
      };

    const fetchData = async () => {
        try {
            const datacertificados = await getCertificados(cpf);
            setCertificados(datacertificados);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(cpf);
    }, [cpf]);

    return (
        <Box>
            <Header />
            <Card>
                <TabelaCoordAluno
                    certificados={certificados}
                    handleOpenModal={handleOpenModal} // Usar o estado certificados
                />
                {modalAberto && (
                    <CorrectionModal
                        certificado={certificadoSelecionado}
                        onClose={() => setModalAberto(false)} // Fecha o modal
                    />
                )}
            </Card>
        </Box>
    );
}

export default CorrectionArea