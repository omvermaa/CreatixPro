"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ 
  className = "", 
  inputClassName = "", 
  buttonClassName = "",
  placeholder = "I am looking for..."
}: { 
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-10 pl-4 pr-12 outline-none ring-0 font-serif text-sm transition-all duration-300 shadow-sm ${inputClassName}`}
      />
      <button 
        type="submit"
        className={`absolute right-0 top-0 bottom-0 px-4 bg-[#B8941F] text-white flex items-center justify-center hover:bg-[#9A7B15] transition-colors ${buttonClassName}`}
        aria-label="Search"
      >
        <Search size={16} />
      </button>
    </form>
  );
}
