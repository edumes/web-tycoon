import Link from "next/link";
import type { NextPage } from "next";
import { Button, Chip, Image, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";

type Planet = {
  _id: string;
  name: string;
  img_url: string;
  resources: {
    name: string;
    value: number;
    quantity: number;
  }[];
};

type PlanetsProps = {
  planets: Planet[];
};

const Planets: NextPage<PlanetsProps> = (PlanetsProps) => {
  const [planets, setPlanets] = useState<Planet[]>(PlanetsProps.planets);
  console.log(planets)

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
                isBlurred
                className="w-full h-22 object-cover rounded-md"
                alt={planet.name}
                src={planet.img_url}
              />
              <h3 className="text-xl font-semibold mt-2">{planet.name}</h3>
              <p className="text-gray-600">
                <ul>
                  {planet.resources.map((resource: any, resourceIndex: any) => (
                    <li key={resourceIndex}>
                      {resource.name} &nbsp;
                      <Tooltip
                        showArrow={true}
                        delay={0}
                        closeDelay={0}
                        content={
                          <div className="px-1 py-2">
                            <div className="text-small font-bold">
                              Quantidade disponível:&nbsp;
                              <Chip size="sm" variant="bordered" radius="lg" color="warning">
                                {resource.quantity.toLocaleString('pt-BR')}
                              </Chip>
                            </div>
                          </div>
                        }>
                        <Chip
                          size="sm"
                          variant="shadow"
                          radius="sm"
                          classNames={{
                            base: "bg-gradient-to-br from-green-500 to-green-900 border-small border-white/50 shadow-green-500/30",
                            content: "drop-shadow shadow-black text-white",
                          }}
                        >
                          $ {resource.value}
                        </Chip>
                      </Tooltip>
                      &nbsp;x1 
                    </li>
                  ))}
                </ul>
              </p>
              <Link href={`/mine/${planet._id}`}>
                <Button color="warning" variant="ghost" className="px-4 py-2 mt-4 rounded-md">
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

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/api/planets");

  return {
    props: {
      planets: response.data,
    }
  };
});