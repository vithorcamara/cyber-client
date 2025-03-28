import React, { useEffect } from "react";

export default function SplashScreen(){
  useEffect(() => {
    setTimeout(()=>{
      window.location.href='/login'
    },2000); // Exibe a splash por 2s
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500 text-white text-2xl font-bold">
      Sistema Seguro
    </div>
  );
};