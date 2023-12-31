import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Accordion, AccordionItem, Skeleton, Progress, Chip } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { PickaxeIcon } from "../../components/icons/pickaxe-icon";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

const PlanetMining: NextPage = () => {
    const apiClient = setupAPIClient();
    const router = useRouter();
    const { planetId } = router.query;

    const [planetDetails, setPlanetDetails] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [miningInProgress, setMiningInProgress] = useState(false);
    const [activeResourceIndex, setActiveResourceIndex] = useState<number | null>(null);

    const progressRef = useRef(progress);

    const startMining = (resourceIndex: number) => {
        if (!miningInProgress) {
            setMiningInProgress(true);
            setActiveResourceIndex(resourceIndex);
            mineResource(planetDetails.resources[resourceIndex]._id);
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
            const newProgress = progressRef.current + increment;
            if (newProgress >= 100) {
                finalizeMining(resourceId);
            } else {
                progressRef.current = newProgress;
                setProgress(newProgress);
                const nextUpdateDelay = Math.random() * 700 + 300;
                setTimeout(updateProgress, nextUpdateDelay);
            }
        };

        const finalizeMining = (resourceId: string) => {
            apiClient
                .post(`api/mine/${planetId}/${resourceId}`)
                .then((response) => {
                    progressRef.current = 0;
                    setProgress(0);
                    setMiningInProgress(false);
                    toast.success('Ore mined with success');
                    setActiveResourceIndex(null);
                })
                .catch((error) => {
                    console.error("Erro ao minerar:", error);
                });
        };

        updateProgress();
    };

    useEffect(() => {
        console.log("progresso", progress);
    }, [progress]);

    useEffect(() => {
        if (planetId) {
            const fetchPlanetDetails = () => {
                setTimeout(() => {
                    apiClient.get(`api/planets/${planetId}`)
                        .then((res) => {
                            setPlanetDetails(res.data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error("Erro ao buscar planetas:", error);
                            setLoading(false);
                        });
                }, 1000); // 1 segundo de atraso
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
                            miningInProgress && resourceIndex !== activeResourceIndex ? null : (
                                <AccordionItem key={resourceIndex}>
                                    <Skeleton className="w-full h-6 rounded-lg" />
                                </AccordionItem>
                            )
                        ))}
                    </Accordion>
                </>
            ) : (
                planetDetails && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">{planetDetails.name}</h2>
                        <Accordion variant="splitted">
                            {planetDetails.resources.map((resource: any, resourceIndex: any) => (
                                miningInProgress && resourceIndex !== activeResourceIndex ? null : (
                                    <AccordionItem
                                        key={resourceIndex}
                                        title={resource.name}
                                    >
                                        <Button
                                            isLoading={miningInProgress}
                                            color="warning"
                                            variant="ghost"
                                            className="px-4 py-2 mb-4 rounded-md ml-1"
                                            onClick={() => startMining(resourceIndex)}
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
                                )
                            ))}
                        </Accordion>
                    </>
                )
            )}
        </div>
    );
};

export default PlanetMining;