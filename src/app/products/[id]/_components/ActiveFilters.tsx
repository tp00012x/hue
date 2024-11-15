import { Review, Shade } from '@/db/schema'
import { X } from 'lucide-react'
import useFilterParams from '../_hooks/useFilterParams'

function FilterButton({
  shadeColor,
  filterName,
  onFilterRemove,
}: {
  shadeColor: string | undefined
  filterName: string
  onFilterRemove: (filterName: string) => void
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-primary px-2 py-1">
      {shadeColor && (
        <div
          className="aspect-square w-4 rounded border border-gray-300"
          style={{ backgroundColor: shadeColor }}
        />
      )}
      <div className="text-apercu text-white">{filterName}</div>
      <X
        onClick={() => {
          onFilterRemove(filterName)
        }}
        className="h-4 w-4 cursor-pointer text-white"
      />
    </div>
  )
}

export default function ActiveFilters({
  reviews,
  shades,
}: {
  reviews: Review[]
  shades: Shade[]
}) {
  const {
    shades: paramShades,
    skinTone,
    undertone,
    removeAllParams,
    removeShade,
    removeSkinTone,
    removeUndertone,
  } = useFilterParams()

  const allFilters = [...paramShades, skinTone, undertone].filter(Boolean)

  return (
    <>
      {allFilters.map((filterName) => {
        if (!filterName) return null

        return (
          <FilterButton
            key={filterName}
            onFilterRemove={() => {
              const isShade = paramShades.includes(filterName)
              if (isShade) {
                removeShade(filterName)
              } else if (filterName === skinTone) {
                removeSkinTone()
              } else if (filterName === undertone) {
                removeUndertone()
              }
            }}
            shadeColor={shades.find((s) => s.name === filterName)?.color}
            filterName={filterName}
          />
        )
      })}
      {allFilters.length > 0 && !reviews.length && (
        <button
          className="whitespace-nowrap text-sm text-primary underline underline-offset-4"
          onClick={() => {
            removeAllParams()
          }}
        >
          Clear All
        </button>
      )}
    </>
  )
}
