// Importa os componentes necessários do Mantine
import React from 'react';
import { Modal, Card, Text } from '@mantine/core';

// Componente funcional AlunoCertificado para exibir os certificados do aluno em um modal
export const AlunoCertificado = ({ certificados, onClose }) => {
    console.log(certificados); // Exibe os certificados no console para depuração
    return (
        // Renderiza o modal com os certificados do aluno
        <Modal opened onClose={onClose}>
            {/* Card no modal para exibir os certificados */}
            <Card shadow="xs" padding="md">
                {/* Título do modal */}
                <Text size="xl" weight={700} align="center" style={{ marginBottom: '20px' }}>
                    Certificados do Aluno
                </Text>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {/* Mapeia e exibe cada certificado em um Card separado */}
                    {certificados.map(certificado => (
                        <Card key={certificado.id} shadow="sm" style={{ marginBottom: '15px' }}>
                            <Text size="sm">{certificado.codigo}</Text> {/* Exibe o código do certificado */}
                            <Text size="xs">{certificado.atividade}</Text> {/* Exibe a atividade do certificado */}
                            <Text size="xs">{certificado.pontuacao}</Text> {/* Exibe a pontuação do certificado */}
                            {/* Você pode adicionar mais informações sobre o certificado aqui */}
                        </Card>
                    ))}
                </div>
            </Card>
        </Modal>
    );
};

export default AlunoCertificado; // Exporta o componente AlunoCertificado como padrão
