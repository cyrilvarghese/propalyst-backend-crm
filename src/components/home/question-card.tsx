"use client"

import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { motion } from "motion/react";

// Step configuration: maps which questions belong to which step
const STEP_CONFIG = {
    1: ["work_location", "commute_time"],
    2: ["search_location", "size", "budget", "apartment_type"]
}

// Form data structure holding all 6 answer fields
interface FormData {
    work_location: string;
    commute_time: number;
    search_location: string;
    size: [number, number];
    budget: [number, number];
    apartment_type: string;
}

interface QuestionCardProps {
    missingFields?: string[];
    onComplete: (data: FormData) => void;
}

export default function QuestionCard({ missingFields = [], onComplete }: QuestionCardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        work_location: "",
        commute_time: 0,
        search_location: "",
        size: [500, 2000],
        budget: [30, 100], // in lakhs/crores
        apartment_type: ""
    });

    // Get questions to display for current step based on missing fields
    const getCurrentStepQuestions = () => {
        const stepQuestions = STEP_CONFIG[currentStep as keyof typeof STEP_CONFIG] || [];
        return stepQuestions.filter(field => missingFields.includes(field));
    };

    // Check if there are any questions in the next step
    const hasNextStep = () => {
        const nextStepQuestions = STEP_CONFIG[2];
        return nextStepQuestions?.some(field => missingFields.includes(field)) || false;
    };

    // Validate current step before moving forward
    const validateCurrentStep = (): boolean => {
        const currentQuestions = getCurrentStepQuestions();

        for (const field of currentQuestions) {
            if (field === "work_location" && !formData.work_location.trim()) {
                return false;
            }
            if (field === "commute_time" && formData.commute_time <= 0) {
                return false;
            }
            if (field === "search_location" && !formData.search_location.trim()) {
                return false;
            }
            if (field === "apartment_type" && !formData.apartment_type) {
                return false;
            }
        }
        return true;
    };

    // Handle Next button click
    const handleNext = () => {
        if (!validateCurrentStep()) {
            alert("Please fill in all fields before proceeding");
            return;
        }

        if (hasNextStep()) {
            setCurrentStep(2);
        } else {
            // No next step, complete the form
            handleComplete();
        }
    };

    // Handle Submit/Complete button click
    const handleComplete = () => {
        if (!validateCurrentStep()) {
            alert("Please fill in all fields before submitting");
            return;
        }
        onComplete(formData);
    };

    // Handle Back button click
    const handleBack = () => {
        setCurrentStep(1);
    };

    // Update form data using spread operator
    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Determine button text based on current step
    const getButtonText = () => {
        if (currentStep === 1 && !hasNextStep()) {
            return "Submit";
        }
        if (currentStep === 1) {
            return "Next";
        }
        return "Submit";
    };

    const currentQuestions = getCurrentStepQuestions();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-md text-left font-bold">
                        {currentStep === 1 ? "Work Information" : "Property Details"}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {/* Step 1: Work Questions */}
                    {currentStep === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Work Location Question */}
                            {currentQuestions.includes("work_location") && (
                                <div className="grid items-start gap-2">
                                    <Label className="text-sm text-left">Where do you work?</Label>
                                    <Input
                                        type="text"
                                        value={formData.work_location}
                                        onChange={(e) => updateFormData("work_location", e.target.value)}
                                        placeholder="e.g., Indiranagar, Bangalore"
                                    />
                                </div>
                            )}

                            {/* Commute Time Question */}
                            {currentQuestions.includes("commute_time") && (
                                <div className="grid items-start gap-2">
                                    <Label className="text-sm text-left">What is your ideal commute?</Label>
                                    <p className="text-sm text-muted-foreground">{formData.commute_time} minutes</p>
                                    <Slider
                                        defaultValue={[formData.commute_time]}
                                        max={120}
                                        step={5}
                                        onValueChange={(value) => updateFormData("commute_time", value[0])}
                                    />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Step 2: Property Questions */}
                    {currentStep === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Search Location Question */}
                            {currentQuestions.includes("search_location") && (
                                <div className="grid items-start gap-2">
                                    <Label className="text-sm text-left">Which locality?</Label>
                                    <Input
                                        type="text"
                                        value={formData.search_location}
                                        onChange={(e) => updateFormData("search_location", e.target.value)}
                                        placeholder="e.g., Koramangala"
                                    />
                                </div>
                            )}

                            {/* Size Question */}
                            {currentQuestions.includes("size") && (
                                <div className="grid items-start gap-2">
                                    <Label className="text-sm text-left">Property size (sqft)</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {formData.size[0]} - {formData.size[1]} sqft
                                    </p>
                                    <Slider
                                        defaultValue={formData.size}
                                        min={500}
                                        max={5000}
                                        step={100}
                                        onValueChange={(value: number[]) => updateFormData("size", [value[0], value[1]])}
                                    />
                                </div>
                            )}

                            {/* Budget Question */}
                            {currentQuestions.includes("budget") && (
                                <div className="grid items-start gap-2">
                                    <Label className="text-sm text-left">Budget (in lakhs)</Label>
                                    <p className="text-sm text-muted-foreground">
                                        ₹{formData.budget[0]}L - ₹{formData.budget[1]}L
                                    </p>
                                    <Slider
                                        defaultValue={formData.budget}
                                        min={10}
                                        max={200}
                                        step={5}
                                        onValueChange={(value: number[]) => updateFormData("budget", [value[0], value[1]])}
                                    />
                                </div>
                            )}

                            {/* Apartment Type Question */}
                            {currentQuestions.includes("apartment_type") && (
                                <div className="grid items-start gap-2">
                                    <Label className="text-sm text-left">Property type</Label>
                                    <select
                                        value={formData.apartment_type}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData("apartment_type", e.target.value)}
                                        className="border border-input rounded-md px-3 py-2 bg-background text-foreground"
                                    >
                                        <option value="">Select type</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="villa">Villa</option>
                                        <option value="plot">Plot</option>
                                        <option value="penthouse">Penthouse</option>
                                    </select>
                                </div>
                            )}
                        </motion.div>
                    )}
                </CardContent>

                <CardFooter className="flex gap-2">
                    {/* Back button - only show on step 2 */}
                    {currentStep === 2 && (
                        <Button variant="outline" onClick={handleBack} className="w-full">
                            Back
                        </Button>
                    )}

                    {/* Next/Submit button */}
                    <Button
                        onClick={currentStep === 1 ? handleNext : handleComplete}
                        className="w-full"
                    >
                        {getButtonText()}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}