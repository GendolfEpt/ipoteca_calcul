
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberInputFieldProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  className?: string;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  step = 1,
  suffix,
  className = "",
}) => {
  // Локальное состояние для хранения текущего значения поля
  const [inputValue, setInputValue] = useState<string>(value.toString());

  // Обрабатываем изменения в поле ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Обновляем локальное состояние чтобы поле могло быть пустым
    setInputValue(newValue);
    
    // Если поле не пустое, передаем числовое значение родителю
    if (newValue !== "") {
      const numericValue = parseFloat(newValue);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    }
  };

  // При потере фокуса проверяем значение и устанавливаем минимальное если пусто
  const handleBlur = () => {
    if (inputValue === "") {
      const defaultValue = min !== undefined ? min : 0;
      setInputValue(defaultValue.toString());
      onChange(defaultValue);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="pr-10"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default NumberInputField;
