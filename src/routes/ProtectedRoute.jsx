import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    // Se o usuário estiver autenticado, renderize os componentes filhos
    return children;
  } else {
    // Se o usuário não estiver autenticado, redirecione para a rota de login
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
