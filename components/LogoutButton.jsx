import React from "react";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();
  function logout() {
    localStorage.clear();
    router.reload();
  }
  return (
    <button
      onClick={logout}
      className="hidden rounded-lg p-2 font-light hover:bg-blue-600/10 hover:text-blue-600 hover:underline md:block"
    >
      Logout
    </button>
  );
}

/*

import React from 'react';
import { useRouter } from 'next/router';

export default function MiComponente() {
    const router = useRouter();

    const logout = () => {
        localStorage.clear();
        router.push('/');
    };

    return (
        <button onClick={logout}>Cerrar sesión</button>
    );
}

*/
