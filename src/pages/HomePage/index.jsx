import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function HomePage(){
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const username = useLocation();

  async function verificarUsuario() {
    try {
      const response = await axios.get("https://cyber-api-7lpa.onrender.com/perfil",
        {withCredentials: true});
      setUser(response.data.usuario)
      console.log(response.data);
  } catch (error) {
      console.error("Erro ao buscar perfil:", error.response?.data || error);
      navigate("/login"); // Redireciona se o usuário não estiver autenticado
    }
  }

  useEffect(() => {
      verificarUsuario();
    }, []);
  
  const handleLogout = () => {
    axios.get("https://cyber-api-7lpa.onrender.com/logout", { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((error) => console.error("Erro ao deslogar", error));
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Perfil do Usuário</h2>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Usuário:</strong> {user.usuario}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>Sair</button>
    </div>
  );
};
