"use client"

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LoadingSteps, { LoadingStep } from "../ui/loading-steps";
import { motion } from "motion/react";
import { HARDCODED_MISSING_QUESTIONS, getMissingQuestions } from "@/data/question-templates";
import { QuestionStep } from "./question-step";

interface SearchInputProps {
    onMissingQuestions?: (questions: QuestionStep[]) => void;

}

export default function SearchInput({ onMissingQuestions }: SearchInputProps) {
    const [query, setQuery] = useState('');
    const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', query);

        // Identify missing questions and call callback
        const missingQuestions = getMissingQuestions(HARDCODED_MISSING_QUESTIONS);
        if (onMissingQuestions) {
            onMissingQuestions(missingQuestions);
        }
    }
    // setIsSearching(true);


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
                <div className="flex gap-2  mx-auto items-center max-w-2xl justify-center relative rounded-full">
                    <Input
                        type="text"
                        id="seachBox"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder=" Tell me about you dream home..."
                        autoFocus
                        className="text-lg w-[800px] border-primary  pl-4 rounded-full h-12 "
                        disabled={isSearching}
                    />
                    <Button
                        type="submit"

                        className="bg-primary text-white absolute  right-[4px] rounded-full w-[36px] h-[36px]"
                        disabled={isSearching}
                    >
                        <Search className="w-5 h-5" />
                    </Button>

                </div>

            </motion.form>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    mass: 1,
                    velocity: 0,
                    duration: 1,
                    delay: .75,
                    ease: "easeInOut"
                }}

                className="w-full">
                <div className="flex gap-2 pt-2   max-w-2xl mx-auto items-center justify-start" >
                    <span className="text-sm text-muted-foreground">Try:</span>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setQuery("3BHK apartment in Indiranagar")}
                        className="h-auto p-0 text-blue-400 hover:text-blue-400"
                    >
                        "3BHK apartment in Indiranagar"
                    </Button>
                    <span>•</span>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setQuery("Villa in Koramangala for rent")}
                        className="h-auto p-0 text-blue-400 hover:text-blue-400"
                    >
                        "Villa in Koramangala for rent"
                    </Button>
                    <span>•</span>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => setQuery("Commercial space in Kammanahalli for rent")}
                        className="h-auto p-0 text-blue-400 hover:text-blue-400"
                    >
                        "Commercial space in Kammanahalli for rent"
                    </Button>
                </div>
            </motion.div>



        </motion.div>
    )
}
