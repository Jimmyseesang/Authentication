'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="px-8 py-4 bg-black text-white rounded-lg font-bold hover:scale-105 transition-all cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
