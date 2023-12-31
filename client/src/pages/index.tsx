import type { NextPage } from "next";
import { Button, Card, CardBody, CardHeader, Checkbox, Image, Input, Spacer } from "@nextui-org/react";
import { useContext, useState } from "react";
import { AuthContext } from "../components/contexts/AuthContext";
import { EyeIcon } from "../components/icons/table/eye-icon";
import { EyeSlashedIcon } from "../components/icons/table/eye-slashed-icon";
import { PasswordIcon } from "../components/icons/password-icon";
import { AtIcon } from "../components/icons/at-icon";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSSRGuest";
import Link from "next/link";

const Login: NextPage = () => {
  const { signIn } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin() {
    if (userEmail === "" || password === "") {
      toast.warning("Please fill in all fields!");
      return;
    }

    setLoading(true);

    const lowercaseEmail = userEmail.toLowerCase();
    const lowercasePassword = password.toLowerCase();

    const userData = {
      username: lowercaseEmail,
      password: lowercasePassword,
    }

    await signIn(userData);
    setLoading(false);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4 mx-auto w-full sm:w-[500px]">
        <Card>
          <CardHeader className="justify-center">
            <h4 className="font-bold text-2xl">StarMine</h4>
          </CardHeader>
          <CardBody>
            <Input
              size="lg"
              variant="faded"
              label="User"
              labelPlacement="outside"
              placeholder="Enter your username"
              startContent={<AtIcon />}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mb-4 mt-2"
            />
            <Input
              size="lg"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="faded"
              startContent={<PasswordIcon />}
              type="password"
              className="mb-4"
            />
            <div className="flex py-2 px-2 justify-between">
              <Checkbox
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
              <Link href="/register">
                Create Account
              </Link>
            </div>
            <Button color="warning" variant="bordered" onClick={handleLogin} fullWidth isLoading={loading}>
              Login
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps = canSSRGuest(async (ctx: any) => {
  return {
    props: {}
  }
});