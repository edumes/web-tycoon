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
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
  username: string;
  email: string;
  password: string;
}

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
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token && !user) {
      api.get(`api/users/details`)
        .then((response) => {
          const { _id, inventoryId, email } = response.data.user;
          const userName = response.data.user.username;

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

      Router.push('/planets');
    } catch (error) {
      toast.error('username or password is invalid');
      console.error('Erro ao acessar sistema', error);
    }
  }

  async function signUp({ username, email, password }: SignUpProps) {
    try {
      const response = await api.post('api/users/register', {
        username,
        email,
        password
      })

      toast.success("Account created successfully!");

      Router.push('/');

    } catch (err) {
      toast.error("Erro ao cadastrar");
      console.log('error on register', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {isAuthenticated ? (
        <Layout>{children}</Layout>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
}