"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Button } from "./ui/Button";
import { X, ArrowLeft } from "lucide-react";

export function FormLayout({
  title,
  description,
  step,
  maxSteps,
  onNext,
  onBack,
  onClose,
  children,
  isLastStep = false,
  isNextDisabled = false,
}) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-white border-b relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardTitle className="text-[#232123] text-xl">{title}</CardTitle>
        <div className="flex items-center gap-4 mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-xs uppercase font-medium text-gray-500">
              Step {step}
            </span>
          </Button>
          <div className="flex-1 flex gap-1">
            {Array.from({ length: maxSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full flex-1 ${
                  i < step ? "bg-[#7b189f]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        {description && (
          <CardDescription className="text-[#4f4d4f] mt-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-white">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#7b189f] hover:bg-[#340a43]"
          disabled={isNextDisabled}
        >
          {isLastStep ? "Post Classified" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
