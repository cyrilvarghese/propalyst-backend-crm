"use client"

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LoadingSteps, { LoadingStep } from "../ui/loading-steps";
import { motion } from "motion/react";

export default function SearchInput() {
    const [query, setQuery] = useState('');
    const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', query);

        setIsSearching(true);

        // Initialize all steps as pending
        const steps: LoadingStep[] = [
            {
                id: "matches",
                text: `Loading matches for ${query || "Indiranagar"}`,
                completedText: "Found 44 matches for Indiranagar",
                status: "pending"
            },
            {
                id: "pricing",
                text: "Gathering pricing information",
                completedText: "Pricing info gathered",
                status: "pending"
            },
            {
                id: "neighborhoods",
                text: "Checking nearby neighborhoods",
                completedText: "Got information on nearby locations",
                status: "pending"
            },
        ];
        setLoadingSteps(steps);

        // Simulate API calls - Replace with your actual API calls
        try {
            // Step 1: Load matches
            setLoadingSteps(prev => prev.map(s =>
                s.id === "matches" ? { ...s, status: "loading" } : s
            ));
            await simulateApiCall(1500); // Replace with: await fetchMatches(query)
            setLoadingSteps(prev => prev.map(s =>
                s.id === "matches" ? { ...s, status: "complete" } : s
            ));

            // Step 2: Gather pricing
            setLoadingSteps(prev => prev.map(s =>
                s.id === "pricing" ? { ...s, status: "loading" } : s
            ));
            await simulateApiCall(1200); // Replace with: await fetchPricing(query)
            setLoadingSteps(prev => prev.map(s =>
                s.id === "pricing" ? { ...s, status: "complete" } : s
            ));

            // Step 3: Check neighborhoods
            setLoadingSteps(prev => prev.map(s =>
                s.id === "neighborhoods" ? { ...s, status: "loading" } : s
            ));
            await simulateApiCall(1000); // Replace with: await fetchNeighborhoods(query)
            setLoadingSteps(prev => prev.map(s =>
                s.id === "neighborhoods" ? { ...s, status: "complete" } : s
            ));

            // All done - navigate to results or show success
            console.log("All steps complete!");
            // TODO: Navigate to dashboard with results

        } catch (error) {
            console.error("Error during search:", error);
        } finally {
            // setIsSearching(false);
        }
    };

    // Simulate API call - remove this in production
    const simulateApiCall = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <motion.div

            className="flex flex-col items-start ">
            <motion.form
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    mass: 1,
                    velocity: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: "easeInOut"
                }}
                onSubmit={handleSearch} className="sticky bottom-[100px] left-0 right-0 p-2 w-full z-50">
                <div className="flex gap-2 items-center justify-center">
                    <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Describe your requirement..."
                        className="text-lg h-12"
                        disabled={isSearching}
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="bg-primary text-white pr-8"
                        disabled={isSearching}
                    >
                        <Search className="w-5 h-5  " />
                        Search
                    </Button>
                </div>
            </motion.form>
            {/* Quick Suggestions */}
            {!isSearching && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "spring",
                        duration: 1,
                        delay: 1,
                        ease: "easeInOut"
                    }}


                    className="flex pl-4 flex-wrap justify-start gap-2 text-sm text-muted-foreground">
                    <span>Try:</span>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setQuery("3BHK apartment in Indiranagar")}
                        className="h-auto p-0 text-muted-foreground hover:text-blue-400"
                    >
                        "3BHK apartment in Indiranagar"
                    </Button>
                    <span>•</span>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setQuery("Villa in Koramangala for rent")}
                        className="h-auto p-0 text-muted-foreground hover:text-blue-400"
                    >
                        "Villa in Koramangala for rent"
                    </Button>
                </motion.div>
            )}

            {/* Loading Steps */}
            {isSearching && loadingSteps.length > 0 && (

                <LoadingSteps steps={loadingSteps} />

            )}
        </motion.div>
    )
}