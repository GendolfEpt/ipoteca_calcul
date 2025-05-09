
interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

/**
 * Рассчитывает параметры ипотечного кредита
 * 
 * @param loanAmount - Сумма кредита (в рублях)
 * @param termYears - Срок кредита (в годах)
 * @param interestRate - Годовая процентная ставка (в процентах)
 * @returns Результаты расчета
 */
export function calculateMortgage(
  loanAmount: number,
  termYears: number,
  interestRate: number
): MortgageResult {
  // Конвертируем годовую процентную ставку в месячную
  const monthlyRate = interestRate / 100 / 12;
  
  // Конвертируем срок кредита в месяцы
  const termMonths = termYears * 12;
  
  // Рассчитываем ежемесячный платеж по формуле аннуитетного платежа
  const monthlyPayment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  // Рассчитываем общую сумму выплат
  const totalPayment = monthlyPayment * termMonths;
  
  // Рассчитываем общую сумму переплаты
  const totalInterest = totalPayment - loanAmount;
  
  return {
    monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
    totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest
  };
}
