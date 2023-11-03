import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { api } from '../../services/apiClient';
import Router from 'next/router';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { Layout } from '../layout/layout';

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  _id: string;
  userName: string;
  email: string;
  inventoryId: string;
};

type SignInProps = {
  username: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
    Router.reload();
  } catch (error) {
    console.error('Erro ao deslogar:', error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    console.log(token)
    if (token) {
      api.get(`api/users/details/${user?._id}`)
        .then((response) => {
          const { _id, inventoryId, email } = response.data;
          const userName = response.data.username;

          setUser({
            _id,
            userName,
            email,
            inventoryId
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, [user]);

  async function signIn({ username, password }: SignInProps) {
    try {
      const response = await api.post('api/users/login', {
        username,
        password,
      });

      const { _id, email, inventoryId, token } = response.data;
      const userName = response.data.username;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
        path: '/', // Quais rotas terão acesso ao cookie
      });

      setUser({
        _id,
        email,
        userName,
        inventoryId
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/planets');

      toast.success('Logado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      toast.error('username or password is invalid');
      console.error('Erro ao acessar sistema', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {isAuthenticated ? (
        <Layout>{children}</Layout>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
}