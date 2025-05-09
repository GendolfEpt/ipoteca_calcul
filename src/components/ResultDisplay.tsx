
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultDisplayProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
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

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  monthlyPayment,
  totalPayment,
  totalInterest,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className={`mt-8 animate-fade-in`}>
      <h2 className="text-xl font-bold mb-4">Результаты расчёта</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          title="Ежемесячный платёж"
          value={formatCurrency(monthlyPayment)}
          color="mortgage-300"
        />
        <ResultCard
          title="Общая сумма выплат"
          value={formatCurrency(totalPayment)}
          color="mortgage-400"
        />
        <ResultCard
          title="Переплата по кредиту"
          value={formatCurrency(totalInterest)}
          color="mortgage-500"
        />
      </div>
    </div>
  );
};

interface ResultCardProps {
  title: string;
  value: string;
  color: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, color }) => {
  return (
    <Card className={`border-t-4 border-${color} shadow-md`}>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
