import { cn } from "@/lib/utils"; // Assuming you have a utils file with a `cn` function for class merging
import { Input } from "@/components/ui/input"; // Adjust path if needed
import { useState } from "react";

interface DateInputProps {
  onChange?: (date: string) => void;
  value?: string;
  className?: string;
  placeholder?: string;
}

const DateInput = ({ onChange, value, className, placeholder }: DateInputProps) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remove non-numeric characters
    input = input.replace(/[^0-9]/g, "");

    // Limit to 8 characters (MMDDYYYY)
    input = input.slice(0, 8);

    // Format as MM/DD/YYYY
    if (input.length > 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }
    if (input.length > 5) {
      input = input.slice(0, 5) + "/" + input.slice(5);
    }

    setInputValue(input);

    if (onChange) {
      onChange(input);
    }
  };

  return (
    <Input
      type="text"
      placeholder={placeholder || "mm/dd/yyyy"}
      value={inputValue}
      onChange={handleInputChange}
      maxLength={10} // "mm/dd/yyyy".length === 10
      className={cn("text-sm", className)} // Add your desired styles here
    />
  );
};

export default DateInput;