import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Accordion, AccordionItem, Skeleton, Progress, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DotsIcon } from "../../components/icons/accounts/dots-icon";

const PlanetMining: NextPage = () => {
    const router = useRouter();
    const apiUrl = process.env.VERCEL_URL;
    const { planetId } = router.query;

    const [planetDetails, setPlanetDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const mineResource = async (resource: any) => {
        if (planetId) {
            // Defina uma taxa de preenchimento mais variável
            let progress = 0;
            const updateProgress = () => {
                if (progress < 100) {
                    // Gere um incremento de preenchimento variável entre 5 e 20
                    const increment = Math.random() * 15 + 5;
                    progress += increment;

                    // Limitar o progresso a 100
                    if (progress > 100) {
                        progress = 100;
                    }

                    setProgress(progress);

                    // Se o progresso não estiver completo, continue a atualização
                    if (progress < 100) {
                        // Defina o próximo intervalo de atualização entre 300 e 1000 milissegundos (0,3 - 1 segundo)
                        const nextUpdateDelay = Math.random() * 700 + 300;
                        setTimeout(updateProgress, nextUpdateDelay);
                    } else {
                        // Quando o progresso estiver completo, finalize a mineração
                        completeMining();
                    }
                }
            };

            // Inicie a atualização do progresso
            updateProgress();
        }
    };

    const completeMining = () => {
        // Simule a resposta do servidor após a mineração
        fetch(`${apiUrl}/api/mining/mine/${planetId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: "653d4ca0bb3b87f5e4497f33" }), // Substitua pelo ID do jogador autenticado
        })
            .then((response) => response.json())
            .then((data) => {
                // Atualize os detalhes do planeta após a mineração
                setPlanetDetails(data.planetDetails);
            })
            .catch((error) => {
                console.error("Erro ao minerar:", error);
            });
    };

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (planetId) {
            // Simule um atraso de 2 segundos
            const fetchPlanetDetails = () => {
                setTimeout(() => {
                    fetch(`${apiUrl}/api/planets/${planetId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setPlanetDetails(data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Erro ao buscar planetas:", error);
                            setLoading(false);
                        });
                }, 1000); // 2 segundos de atraso
            };

            fetchPlanetDetails();
        }
    }, [planetId]);

    return (
        <div className="h-full p-16">
            {loading ? (
                <>
                    <Skeleton className="w-16 h-6 mb-4 rounded-lg" />
                    <Accordion variant="splitted">
                        {[1, 2, 3].map((resourceIndex) => (
                            <AccordionItem key={resourceIndex} indicator={<DotsIcon />}>
                                <Skeleton className="w-full h-6 rounded-lg" />
                            </AccordionItem>
                        ))}
                    </Accordion>
                </>
            ) : (
                planetDetails && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">{planetDetails.name}</h2>
                        <Accordion variant="splitted">
                            {planetDetails.resources.map((resource: any, resourceIndex: any) => (
                                <AccordionItem
                                    key={resourceIndex}
                                    indicator={<DotsIcon />}
                                    title={resource.name}
                                >
                                    {/* <p> */}
                                    <Chip
                                        variant="shadow"
                                        classNames={{
                                            base: "bg-gradient-to-br from-green-500 to-green-900 border-small border-white/50 shadow-green-500/30",
                                            content: "drop-shadow shadow-black text-white",
                                        }}
                                    >
                                        {resource.value}
                                    </Chip> por unidade
                                    {/* </p> */}

                                    <Button
                                        color="primary"
                                        variant="ghost"
                                        className="px-4 py-2 mt-4 rounded-md ml-1"
                                        onClick={() => mineResource(resource)}
                                    >
                                        Iniciar Mineração
                                    </Button>
                                    <Progress
                                        aria-label="Mining..."
                                        isStriped
                                        size="lg"
                                        value={progress} // Use o valor de progresso
                                        color="warning"
                                        className="max-w mt-2 mb-2"
                                    />
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </>
                )
            )}
        </div>
    );
};

export default PlanetMining;