
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberInputField from "@/components/NumberInputField";
import ResultDisplay from "@/components/ResultDisplay";
import ComparisonDisplay from "@/components/ComparisonDisplay";
import { calculateMortgage } from "@/utils/mortgageCalculator";

const Index = () => {
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [termYears, setTermYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [monthlyRent, setMonthlyRent] = useState<number>(25000);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    totalRent: 0,
    comparison: {
      betterOption: "",
      difference: 0
    }
  });

  const handleCalculate = () => {
    if (loanAmount > 0 && termYears > 0 && interestRate > 0) {
      const calculatedResults = calculateMortgage(
        loanAmount,
        termYears,
        interestRate
      );
      
      // Рассчитываем общую стоимость аренды
      const totalRent = monthlyRent * 12 * termYears;
      
      // Определяем, что выгоднее
      const difference = totalRent - calculatedResults.totalPayment;
      const betterOption = difference > 0 ? "mortgage" : "rent";
      
      setResults({
        ...calculatedResults,
        totalRent,
        comparison: {
          betterOption,
          difference: Math.abs(difference)
        }
      });
      
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-mortgage-800">
          Калькулятор ипотеки
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Рассчитайте свои ежемесячные платежи и сравните с арендой
        </p>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Параметры кредита</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <NumberInputField
                id="loan-amount"
                label="Сумма кредита"
                value={loanAmount}
                onChange={setLoanAmount}
                min={10000}
                step={10000}
                suffix="₽"
              />

              <NumberInputField
                id="term-years"
                label="Срок кредита"
                value={termYears}
                onChange={setTermYears}
                min={1}
                max={50}
                step={1}
                suffix="лет"
              />

              <NumberInputField
                id="interest-rate"
                label="Процентная ставка"
                value={interestRate}
                onChange={setInterestRate}
                min={0.1}
                max={30}
                step={0.1}
                suffix="%"
              />

              <NumberInputField
                id="monthly-rent"
                label="Ежемесячная аренда"
                value={monthlyRent}
                onChange={setMonthlyRent}
                min={1000}
                step={1000}
                suffix="₽"
              />

              <Button 
                className="w-full bg-mortgage-500 hover:bg-mortgage-600 text-white" 
                onClick={handleCalculate}
              >
                Рассчитать
              </Button>
            </div>
          </CardContent>
        </Card>

        <ResultDisplay
          monthlyPayment={results.monthlyPayment}
          totalPayment={results.totalPayment}
          totalInterest={results.totalInterest}
          isVisible={showResults}
        />

        <ComparisonDisplay
          totalMortgage={results.totalPayment}
          totalRent={results.totalRent}
          betterOption={results.comparison.betterOption}
          difference={results.comparison.difference}
          isVisible={showResults}
        />
      </div>
    </div>
  );
};

export default Index;
