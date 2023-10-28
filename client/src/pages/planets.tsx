import Link from "next/link"; // Importe o Link do Next.js
import type { NextPage } from "next";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Planets: NextPage = () => {
  const [planets, setPlanets] = useState<any>([]);

  const apiUrl = process.env.API_URL;
  useEffect(() => {
    fetch(`${apiUrl}/api/planets`)
      .then((response) => response.json())
      .then((data) => setPlanets(data))
      .catch((error) => console.error("Erro ao buscar planetas:", error));
  }, []);

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-semibold mb-4">Exploring Planets</h3>
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
                src={planet.img_url}
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
              <Link href={`/mine/${planet._id}`}>
                <Button color="primary" variant="ghost" className="px-4 py-2 mt-4 rounded-md">
                  Minerar
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planets;