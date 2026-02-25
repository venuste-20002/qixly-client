import { Search } from "lucide-react";
import { Input } from "./ui/input";
import React from 'react'


interface SignupInputProps<T extends string | number> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: T;
}

export default function SearchInput<T extends string | number>({
  onChange,
  placeholder,
  value,
}: SignupInputProps<T>) {
  return (
    <div className={"relative border rounded-lg h-[51px] bg-[#FCFCFD] w-full"}>
      <Search className={"absolute left-2 top-3"} />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={"w-full border-none shadow-none h-full pl-10 rounded-lg"}
      />
    </div>
  );
}
