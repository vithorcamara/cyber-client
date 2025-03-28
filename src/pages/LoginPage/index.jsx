import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css'

export default function SplashScreen(){
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false)
  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      console.log({
        nome,
        email,
        usuario,
        password,
      })
      const response = await axios.post("https://cyber-api-7lpa.onrender.com/registrar", {
        usuario,
        senha: password,
        email,
        nome
      });
      setMessage(response.data.mensagem);
      setIsRegistering(false);
    } catch (error) {
      setMessage(error.response?.data?.erro || "Erro no registro");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://cyber-api-7lpa.onrender.com/login", { usuario, senha: password }, { withCredentials: true });
      setMessage(response.data.mensagem);
      console.log(response)
      setShowMfa(true);
    } catch (error) {
      setMessage(error.response?.data?.erro || "Erro no login");
    }
  };

  const handleVerifyMfa = async () => {
    try {
      const response = await axios.post("https://cyber-api-7lpa.onrender.com/verificarmfa", { 
        usuario, 
        codigo_mfa: mfaCode 
      }, { withCredentials: true });

      setMessage(response.data.mensagem);
      navigate('/home', {usuario: usuario})
    } catch (error) {
      setMessage(error.response?.data?.erro || "Código inválido");
      console.log(error)
    }
};

  return (
    <div className="group">
      <h1 className="text-2xl font-bold mb-4">Sistema Seguro</h1>
      
      <div className="mb-4">
        <button
          onClick={() => setIsRegistering(false)}
          className={`p-2 mx-2 ${!isRegistering ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsRegistering(true)}
          className={`p-2 mx-2 ${isRegistering ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Registrar
        </button>
      </div>

      {isRegistering && (
        <>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
        </>
      )}

      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="block w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-2 border rounded"
      />

      {isRegistering ? (
        <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded">
          Registrar
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      )}

      {showMfa && (
        <div className="mt-4">
          <input type="text" placeholder="Código MFA" value={mfaCode} onChange={(e) => setMfaCode(e.target.value)}
            className="w-64 p-2 mb-2 border rounded" />
          <button onClick={handleVerifyMfa} className="bg-green-500 text-white p-2 rounded">Verificar</button>
        </div>
      )}

      <p className="mt-4 text-red-500">{message}</p>
    </div>
  );
};
