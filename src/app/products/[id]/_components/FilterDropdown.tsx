'use client'

import * as React from 'react'
import { ListFilter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import useFilterParams from '../_hooks/useFilterParams'
import { useEffect } from 'react'

const SKIN_TONES = ['Fair', 'Light', 'Medium', 'Tan', 'Dark', 'Deep'] as const
const UNDERTONES = ['Pink/Cool', 'Neutral', 'Yellow/Warm'] as const

export default function FilterDropdown({
  skinTones,
  undertones,
}: {
  skinTones: string[]
  undertones: string[]
}) {
  const {
    skinTone,
    undertone,
    toggleSkinToneAndUndertone,
    removeSkinToneAndUndertone,
  } = useFilterParams()

  const [selectedSkinTone, setSelectedSkinTone] = React.useState<string | null>(
    skinTone,
  )
  const [selectedUndertone, setSelectedUndertone] = React.useState<
    string | null
  >(undertone)
  const [openFilters, setOpenFilters] = React.useState(false)

  useEffect(() => {
    setSelectedSkinTone(skinTone)
    setSelectedUndertone(undertone)
  }, [skinTone, undertone])

  const showSkintonesResults = () => {
    toggleSkinToneAndUndertone(selectedSkinTone, selectedUndertone)
    setOpenFilters(false)
  }

  const handleReset = () => {
    removeSkinToneAndUndertone()
    setSelectedSkinTone(null)
    setSelectedUndertone(null)
    setOpenFilters(false)
  }

  return (
    <DropdownMenu open={openFilters} onOpenChange={setOpenFilters}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full items-center rounded-none border border-primary font-apercu text-sm uppercase text-primary md:w-[300px]"
        >
          <ListFilter className="h-4 w-4 text-primary opacity-50" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[calc(100vw-2rem)] rounded-none border border-primary bg-white md:w-[300px]"
      >
        <div className="space-y-3 px-4 pb-3 pt-4">
          <div className="grid grid-cols-3 items-center">
            <div className="col-start-2 text-center uppercase">Filters</div>
            <div className="flex justify-end">
              <button
                onClick={() => setOpenFilters(false)}
                className="transition-opacity hover:opacity-70"
              >
                <X className="h-4 w-4 !text-primary opacity-50" />
              </button>
            </div>
          </div>
          <div className="uppercase">Skin tone</div>
          <div className="grid gap-2">
            {SKIN_TONES.map((tone) => (
              <label
                key={tone}
                className={clsx(
                  {
                    'text-disabled': !skinTones.includes(tone),
                  },
                  'flex cursor-pointer items-center space-x-2 text-primary',
                )}
              >
                <Checkbox
                  checked={selectedSkinTone === tone}
                  disabled={!skinTones.includes(tone)}
                  onCheckedChange={() =>
                    setSelectedSkinTone(selectedSkinTone === tone ? null : tone)
                  }
                />
                <span>{tone}</span>
              </label>
            ))}
          </div>
        </div>
        <Separator className="bg-primary" />
        <div className="space-y-3 px-4 py-3">
          <div className="uppercase">Undertone</div>
          <div className="grid gap-2">
            {UNDERTONES.map((tone) => (
              <label
                key={tone}
                className={clsx(
                  {
                    'text-disabled': !undertones.includes(tone),
                  },
                  'flex cursor-pointer items-center space-x-2 text-primary',
                )}
              >
                <Checkbox
                  checked={selectedUndertone === tone}
                  onCheckedChange={() =>
                    setSelectedUndertone(
                      selectedUndertone === tone ? null : tone,
                    )
                  }
                  disabled={!undertones.includes(tone)}
                />
                <span>{tone}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4">
          <Button
            variant="outline"
            className="w-full rounded-none border border-primary uppercase"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            onClick={showSkintonesResults}
            disabled={!selectedSkinTone && !selectedUndertone}
            className="w-full rounded-none bg-primary uppercase text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Show
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
