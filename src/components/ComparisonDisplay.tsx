
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface ComparisonDisplayProps {
  totalMortgage: number;
  totalRent: number;
  betterOption: string;
  difference: number;
  isVisible: boolean;
}

// Функция для форматирования чисел в денежный формат
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
};

const ComparisonDisplay: React.FC<ComparisonDisplayProps> = ({
  totalMortgage,
  totalRent,
  betterOption,
  difference,
  isVisible,
}) => {
  if (!isVisible) return null;

  const comparisonText = betterOption === "mortgage" 
    ? `Ипотека выгоднее аренды на ${formatCurrency(difference)}`
    : `Аренда выгоднее ипотеки на ${formatCurrency(difference)}`;

  const cardColorClass = betterOption === "mortgage" 
    ? "border-l-4 border-green-500" 
    : "border-l-4 border-blue-500";

  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="text-xl font-bold mb-4">Сравнение с арендой</h2>
      <Card className={`shadow-md ${cardColorClass}`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <p className="text-lg font-medium">{comparisonText}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-600">Полная стоимость ипотеки</p>
              <p className="text-lg font-semibold">{formatCurrency(totalMortgage)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Полная стоимость аренды за тот же срок</p>
              <p className="text-lg font-semibold">{formatCurrency(totalRent)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonDisplay;
