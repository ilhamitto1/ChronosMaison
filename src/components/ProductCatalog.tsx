import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import {
  products,
  filterOptions,
  type Category,
  type Gender,
  type Mechanism,
  type Availability,
} from '@/data/products'
import { brands } from '@/data/brands'
import { useStore } from '@/context/StoreContext'
import { cn } from '@/lib/utils'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

interface Filters {
  category: Category | ''
  gender: Gender | ''
  mechanism: Mechanism | ''
  material: string
  color: string
  availability: Availability | ''
  brand: string
  priceMin: number
  priceMax: number
}

const defaultFilters: Filters = {
  category: '',
  gender: '',
  mechanism: '',
  material: '',
  color: '',
  availability: '',
  brand: '',
  priceMin: 4500,
  priceMax: 100000,
}

const sortLabels: Record<SortOption, string> = {
  newest: 'Ən yenilər',
  'price-asc': 'Ucuzdan bahaya',
  'price-desc': 'Bahadan ucuza',
  popular: 'Populyar',
}

export function ProductCatalog() {
  const { selectedBrand, setSelectedBrand } = useStore()
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [sort, setSort] = useState<SortOption>('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'new' | 'popular' | 'recommended'>('all')

  const maxPrice = 100000
  const minPrice = 4500

  const effectiveBrand = filters.brand || selectedBrand

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (activeTab === 'featured') result = result.filter((p) => p.isFeatured)
    if (activeTab === 'new') result = result.filter((p) => p.isNew)
    if (activeTab === 'popular') result = result.filter((p) => p.isPopular)
    if (activeTab === 'recommended') result = result.filter((p) => p.isFeatured || p.isPopular)

    if (filters.category) result = result.filter((p) => p.category === filters.category)
    if (filters.gender) result = result.filter((p) => p.gender === filters.gender)
    if (filters.mechanism) result = result.filter((p) => p.mechanism === filters.mechanism)
    if (filters.material) result = result.filter((p) => p.caseMaterial === filters.material)
    if (filters.color) result = result.filter((p) => p.color === filters.color)
    if (filters.availability) result = result.filter((p) => p.availability === filters.availability)
    if (effectiveBrand) result = result.filter((p) => p.brandId === effectiveBrand)
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax)

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
        break
    }

    return result
  }, [filters, sort, activeTab, effectiveBrand])

  const activeFilterCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'priceMin') return val !== minPrice
    if (key === 'priceMax') return val !== maxPrice
    if (key === 'brand') return val !== '' || selectedBrand !== ''
    return val !== ''
  }).length + (selectedBrand && !filters.brand ? 1 : 0)

  const clearFilters = () => {
    setFilters(defaultFilters)
    setSelectedBrand('')
  }

  const tabs = [
    { id: 'all' as const, label: 'Bütün saatlar' },
    { id: 'featured' as const, label: 'Seçilmiş Saatlar' },
    { id: 'new' as const, label: 'Yeni Kolleksiya' },
    { id: 'popular' as const, label: 'Populyar Modellər' },
    { id: 'recommended' as const, label: 'Sizin üçün tövsiyə olunanlar' },
  ]

  const FilterPanel = () => (
    <div className="space-y-6">
      <FilterSelect
        label="Brend"
        value={effectiveBrand}
        options={brands.map((b) => b.name)}
        optionValues={brands.map((b) => b.id)}
        onChange={(v) => {
          setFilters((f) => ({ ...f, brand: v }))
          setSelectedBrand(v)
        }}
      />
      <FilterSelect
        label="Kateqoriya"
        value={filters.category}
        options={filterOptions.categories}
        onChange={(v) => setFilters((f) => ({ ...f, category: v as Category | '' }))}
      />
      <FilterSelect
        label="Cins"
        value={filters.gender}
        options={filterOptions.genders}
        onChange={(v) => setFilters((f) => ({ ...f, gender: v as Gender | '' }))}
      />
      <FilterSelect
        label="Mexanizm"
        value={filters.mechanism}
        options={filterOptions.mechanisms}
        onChange={(v) => setFilters((f) => ({ ...f, mechanism: v as Mechanism | '' }))}
      />
      <FilterSelect
        label="Material"
        value={filters.material}
        options={filterOptions.materials}
        onChange={(v) => setFilters((f) => ({ ...f, material: v }))}
      />
      <FilterSelect
        label="Rəng"
        value={filters.color}
        options={filterOptions.colors}
        onChange={(v) => setFilters((f) => ({ ...f, color: v }))}
      />
      <FilterSelect
        label="Mövcudluq"
        value={filters.availability}
        options={filterOptions.availability}
        onChange={(v) => setFilters((f) => ({ ...f, availability: v as Availability | '' }))}
      />
      <div>
        <label className="mb-2 block text-xs tracking-widest text-brown-light uppercase">
          Qiymət aralığı: {filters.priceMin} — {filters.priceMax} ₼
        </label>
        <div className="flex gap-3">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={50}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                priceMin: Math.min(Number(e.target.value), f.priceMax - 100),
              }))
            }
            className="w-full accent-gold"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={50}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                priceMax: Math.max(Number(e.target.value), f.priceMin + 100),
              }))
            }
            className="w-full accent-gold"
          />
        </div>
      </div>
      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          Filtrləri təmizlə
        </Button>
      )}
    </div>
  )

  return (
    <section id="mehsullar" className="section-mesh-alt py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Kataloq"
          title="Premium saat kolleksiyası"
          subtitle="Filtrləyin, müqayisə edin və WhatsApp ilə sifariş verin."
          align="center"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'rounded-full px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-brown text-pearl shadow-md'
                  : 'border border-taupe-light/50 bg-pearl text-brown hover:border-gold/40',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtrlər
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-gold px-1.5 text-[10px] text-pearl">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <p className="text-sm text-brown-light">
              {filteredProducts.length} məhsul tapıldı
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-sm border border-taupe-light bg-pearl px-4 py-2 text-sm text-brown focus:outline-none focus:ring-2 focus:ring-gold/30"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 glass-card rounded-sm p-6">
              <h3 className="mb-6 font-serif text-lg text-brown">Filtrlər</h3>
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-brown">Heç bir məhsul tapılmadı</p>
                <p className="mt-2 text-sm text-brown-light">Filtrləri dəyişdirin və yenidən cəhd edin.</p>
                <Button variant="outline" className="mt-6" onClick={clearFilters}>
                  Filtrləri təmizlə
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brown/20 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-pearl p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-lg text-brown">Filtrlər</h3>
              <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterPanel />
          </motion.div>
        </div>
      )}
    </section>
  )
}

function FilterSelect({
  label,
  value,
  options,
  optionValues,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  optionValues?: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="mb-2 block text-xs tracking-widest text-brown-light uppercase">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-taupe-light bg-pearl px-3 py-2 text-sm text-brown focus:outline-none focus:ring-2 focus:ring-gold/30"
      >
        <option value="">Hamısı</option>
        {options.map((opt, i) => (
          <option key={opt} value={optionValues ? optionValues[i] : opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
