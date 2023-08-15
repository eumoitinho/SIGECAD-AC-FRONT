import React from 'react';
import { Modal, Card, Text } from '@mantine/core';

export const AlunoCertificado = ({ certificados, onClose }) => {
    console.log(certificados);
    return (
      <Modal opened onClose={onClose}>
        <Card shadow="xs" padding="md">
          <Text size="xl" weight={700} align="center" style={{ marginBottom: '20px' }}>
            Certificados do Aluno
          </Text>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {certificados.map(certificado => (
              <Card key={certificado.id} shadow="sm" style={{ marginBottom: '15px' }}>
                <Text size="sm">{certificado.codigo}</Text>
                <Text size="xs">{certificado.atividade}</Text>
                <Text size="xs">{certificado.pontuacao}</Text>
                {/* Display other certificate information here */}
              </Card>
            ))}
          </div>
        </Card>
      </Modal>
    );
  };

export default AlunoCertificado;
