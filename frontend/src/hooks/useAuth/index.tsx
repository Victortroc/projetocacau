import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api, { openApi } from "../../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  balance?: number;
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  loading: boolean;
  amountCurrent: number;
  handleLogin: (userData: Record<string, any>) => Promise<void>;
  handleSignup: (userData: Record<string, any>) => Promise<void>;
  handleLogout: () => Promise<void>;
  setAmountCurrent: (term: any) => void;
}

const useAuth = (): AuthContextProps => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [_, setSearchParams] = useSearchParams("");
  const [amountCurrent, setAmountCurrent] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  const handleLogin = async (userData: Record<string, any>) => {
    try {
      const response = await openApi.post('/login', userData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logado com sucesso!");
      if (user.admin) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard-client");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error.default);
      } else {
        toast.error("Erro ao registrar");
      }
    }
  };

  const handleSignup = async (userData: Record<string, any>) => {
    try {
      await openApi.post('/signup', userData);

      toast.success("Registro bem-sucedido!");
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error.default);
      } else {
        toast.error("Erro ao registrar");
      }
    }
  };

  const handleLogout = async () => {

    setSearchParams("");

    try {
      await api.delete("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);

      delete api.defaults.headers.common["Authorization"];
      toast.success("Deslogado com sucesso!");
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error.default);
      } else {
        toast.error("Erro encerrar sessão");
      }
    }
    
  };

  return {
    token,
    user,
    loading,
    handleLogin,
    handleSignup,
    handleLogout,
    amountCurrent, 
    setAmountCurrent
  };
};

export default useAuth;
