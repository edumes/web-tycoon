import type { NextPage } from "next";
import { Button, Card, CardBody, CardHeader, Image, Input } from "@nextui-org/react";
import { useEffect, useState } from "react"; // Importe useState e useEffect
import { EyeIcon } from "../components/icons/table/eye-icon";
import { EyeSlashedIcon } from "../components/icons/table/eye-slashed-icon";

const Login: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aqui você pode fazer uma solicitação para autenticar o usuário no seu backend
    // Se a autenticação for bem-sucedida, você pode redirecionar o usuário para a página protegida

    if (email === "user@example.com" && password === "password") {
      // Simulando uma autenticação bem-sucedida (substitua com sua lógica real)
      // toasts.show({ text: "Login bem-sucedido!", preset: "success" });
      // Redirecione o usuário após o login
      // Router.push("/dashboard"); // Certifique-se de importar Router do Next.js
    } else {
      // toasts.show({ text: "Credenciais inválidas. Tente novamente.", preset: "error" });
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4 mx-auto w-full sm:w-[500px]">
        <Card>
          <CardHeader>
            <Image
              className="m-20"
              width={380}
              isBlurred
              src={'https://i.imgur.com/sl8yi6n.png'}
              alt="StarMine Logo"
            />
            {/* <h1 className="text-3xl font-semibold">Login</h1> */}
          </CardHeader>
          <CardBody>
            <Input
              size="lg"
              variant="faded"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 mt-2"
            />
            <Input
              size="lg"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              variant="faded"
              // endContent={
              //   <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              //     {isVisible ? (
              //       <EyeIcon />
              //     ) : (
              //       <EyeSlashedIcon />
              //     )}
              //   </button>
              // }
              type={isVisible ? "text" : "password"}
              className="mb-8"
            />
            <Button color="warning" variant="bordered" onClick={handleLogin} fullWidth>
              Login
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;