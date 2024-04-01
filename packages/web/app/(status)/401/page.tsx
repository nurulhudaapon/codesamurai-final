'use client';

import { signOut } from "next-auth/react";
import React from "react";

const Index: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Unauthorised Page</h1>
      <p className="text-gray-600">
        You are not authorized to access this page.
      </p>
      <u><p onClick={() => signOut()} className="mt-4 cursor-pointer">logout</p></u>
    </div>
  );
};

export default Index;
