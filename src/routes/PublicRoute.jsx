import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    // Se o usuário estiver autenticado, redirecione para a página inicial
    return <Navigate to="/" />;
  } else {
    // Se o usuário não estiver autenticado, renderize os componentes filhos
    return children;
  }
}

export default PublicRoute;
