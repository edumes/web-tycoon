import type { NextPage } from "next";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react"; // Importe useState e useEffect

const Home: NextPage = () => {
  const [planets, setPlanets] = useState<any>([]); // Estado para armazenar os planetas

  useEffect(() => {
    // Faça a solicitação GET para a rota de planetas e atualize o estado com os dados recebidos
    fetch("http://localhost:3333/api/planets")
      .then((response) => response.json())
      .then((data) => setPlanets(data))
      .catch((error) => console.error("Erro ao buscar planetas:", error));
  }, []);

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Explorar Planetas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planets.map((planet: any, index: any) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105"
          >
            <Image
              isZoomed
              className="w-full h-22 object-cover rounded-md"
              alt={planet.name}
              src={planet.img_url} // Use a URL da imagem do planeta da resposta da API
            />
            <h3 className="text-xl font-semibold mt-2">{planet.name}</h3>
            <p className="text-gray-600">
              Recursos:
              <ul>
                {planet.resources.map((resource: any, resourceIndex: any) => (
                  <li key={resourceIndex}>
                    {resource.name} ({resource.value} por unidade)
                  </li>
                ))}
              </ul>
            </p>
            <Button color="primary" variant="ghost" className="px-4 py-2 mt-4 rounded-md">
              Minerar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;