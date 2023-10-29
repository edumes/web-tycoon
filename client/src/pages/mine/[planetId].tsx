import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Accordion, AccordionItem, Skeleton, Progress, Chip } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { DotsIcon } from "../../components/icons/accounts/dots-icon";
import { PickaxeIcon } from "../../components/icons/pickaxe-icon";

const PlanetMining: NextPage = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { planetId } = router.query;

    const [planetDetails, setPlanetDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [miningInProgress, setMiningInProgress] = useState(false);

    const progressRef = useRef(progress); // Utilize uma referência para manter o valor de progress

    const startMining = (resourceId: string) => {
        if (!miningInProgress) {
            setMiningInProgress(true);
            mineResource(resourceId);
        }
    };

    const mineResource = (resourceId: string) => {
        if (miningInProgress) {
            return;
        }

        setMiningInProgress(true);
        mineResourceInternal(resourceId);
    };

    const mineResourceInternal = (resourceId: string) => {
        const updateProgress = () => {
            const increment = Math.random() * 15 + 5;
            const newProgress = progressRef.current + increment; // Use o valor da referência
            if (newProgress >= 100) {
                // Se atingir 100%, finalize a mineração
                finalizeMining(resourceId);
            } else {
                progressRef.current = newProgress; // Atualize o valor da referência
                setProgress(newProgress); // Atualize o estado para re-renderizar o componente
                const nextUpdateDelay = Math.random() * 700 + 300;
                setTimeout(updateProgress, nextUpdateDelay);
            }
        };

        const finalizeMining = (resourceId: string) => {
            // Quando o progresso estiver completo, finalize a mineração
            fetch(`${apiUrl}/api/mine/${planetId}/${resourceId}`, {
                method: "POST",
            })
                .then((response) => response.json())
                .then((data) => {
                    // setPlanetDetails(data.planetDetails);
                    progressRef.current = 0; // Redefina o valor da referência para 0
                    setProgress(0); // Redefina o estado para 0
                    setMiningInProgress(false);
                })
                .catch((error) => {
                    console.error("Erro ao minerar:", error);
                });
        };

        updateProgress();
    };

    // Use useEffect para observar mudanças no progresso
    useEffect(() => {
        console.log("progresso", progress);
    }, [progress]);

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
        <div className="h-full p-4">
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
                                    <Button
                                        isLoading={miningInProgress}
                                        // endContent={<PickaxeIcon />}
                                        color="warning"
                                        variant="ghost"
                                        className="px-4 py-2 mb-4 rounded-md ml-1"
                                        onClick={() => startMining(resource._id)}
                                    >
                                        Iniciar Mineração
                                    </Button>
                                    <br />
                                    <Chip
                                        variant="shadow"
                                        classNames={{
                                            base: "bg-gradient-to-br from-green-500 to-green-900 border-small border-white/50 shadow-green-500/30",
                                            content: "drop-shadow shadow-black text-white",
                                        }}
                                    >
                                        $ {resource.value}
                                    </Chip> por unidade

                                    <Progress
                                        aria-label="Mining..."
                                        size="lg"
                                        value={progress}
                                        color="warning"
                                        className="max-w mt-4 mb-2"
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