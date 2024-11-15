'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Shade } from '@/db/schema'
import useFilterParams from '../_hooks/useFilterParams'

interface ShadesDropdownProps {
  shades: Shade[]
}

export default function ShadesDropdown({ shades }: ShadesDropdownProps) {
  const { shades: paramShades, toggleShade } = useFilterParams()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between rounded-none border border-primary font-apercu text-sm uppercase text-primary md:w-[300px]"
        >
          Select Shades
          <ChevronDown className="h-4 w-4 !text-primary opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="ml-4 max-h-80 w-[calc(100vw-2rem)] overflow-y-auto border border-primary bg-white md:w-[335px]"
      >
        {shades.map((shade) => (
          <DropdownMenuCheckboxItem
            key={shade.id}
            checked={paramShades.includes(shade.name)}
            onCheckedChange={() => toggleShade(shade.name)}
          >
            <div className="flex flex-1 items-center space-x-3">
              <div
                className="aspect-square w-6 rounded border border-gray-300"
                style={{ backgroundColor: shade.color }}
              />
              <div className="flex flex-col">
                <span className="text-sm leading-4">{shade.name}</span>
                <span
                  className={`text-xs ${
                    paramShades.includes(shade.name)
                      ? 'text-primary'
                      : 'text-disabled'
                  }`}
                >
                  {shade.description}
                </span>
              </div>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
