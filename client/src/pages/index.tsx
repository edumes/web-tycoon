import type { NextPage } from "next";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react"; // Importe useState e useEffect

const Home: NextPage = () => {
  const [planets, setPlanets] = useState<any>([]); // Estado para armazenar os planetas

  const apiUrl = process.env.VERCEL_URL;
  useEffect(() => {
    // Faça a solicitação GET para a rota de planetas e atualize o estado com os dados recebidos
    fetch(`${apiUrl}/api/planets`)
      .then((response) => response.json())
      .then((data) => setPlanets(data))
      .catch((error) => console.error("Erro ao buscar planetas:", error));
  }, []);

  return (
    <div className=" h-full">
      <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6  gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Home</h3>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;