"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search } from "lucide-react"

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-black p-4 flex justify-end">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-200 hover:bg-gray-800"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-black border-gray-800">
          <div className="flex items-center border-b border-gray-800">
            <Search className="h-5 w-5 ml-3 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Titles, people, genres" 
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-200 bg-black placeholder:text-gray-500"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}