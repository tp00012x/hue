import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function useFilterParams() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const shades = searchParams.getAll('shades')

  const toggleShade = (shadeName: string) => {
    const updatedShades = shades.includes(shadeName)
      ? shades.filter((name) => name !== shadeName)
      : [...shades, shadeName]

    const params = new URLSearchParams(searchParams.toString())
    params.delete('shades')
    updatedShades.forEach((name) => {
      params.append('shades', name)
    })

    router.replace(`${pathname}?${params.toString()}`)
  }

  const removeShade = (shadeName: string) => {
    const updatedShades = shades.filter((name) => name !== shadeName)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('shades')
    updatedShades.forEach((name) => {
      params.append('shades', name)
    })
    router.replace(`${pathname}?${params.toString()}`)
  }

  const toggleSkinToneAndUndertone = (
    skinTone: string | null,
    undertone: string | null,
  ) => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('skinTone')
    if (skinTone) params.append('skinTone', skinTone)

    params.delete('undertone')
    if (undertone) params.append('undertone', undertone)

    router.replace(`${pathname}?${params.toString()}`)
  }

  const removeSkinTone = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('skinTone')
    router.replace(`${pathname}?${params.toString()}`)
  }

  const removeUndertone = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('undertone')
    router.replace(`${pathname}?${params.toString()}`)
  }

  const removeSkinToneAndUndertone = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('skinTone')
    params.delete('undertone')
    router.replace(`${pathname}?${params.toString()}`)
  }

  const removeAllParams = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('shades')
    params.delete('skinTone')
    params.delete('undertone')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    shades,
    skinTone: searchParams.get('skinTone'),
    undertone: searchParams.get('undertone'),
    toggleShade,
    toggleSkinToneAndUndertone,
    removeSkinToneAndUndertone,
    removeAllParams,
    removeSkinTone,
    removeUndertone,
    removeShade,
  }
}
