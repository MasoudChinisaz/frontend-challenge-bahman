'use client'
import { Listbox } from '@headlessui/react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useState } from 'react'
import { SelectItem } from './types'

type Props = {
  items: SelectItem[]
  value: SelectItem[]
  onChange: (v: SelectItem[]) => void
}

export default function AdvancedSelect({ items, value, onChange }: Props) {
  const [query, setQuery] = useState('')
  const parentRef = useRef<HTMLDivElement>(null)

  const filtered = items.filter(i =>
    i.label.toLowerCase().includes(query.toLowerCase())
  )

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
  })

  return (
    <Listbox value={value} onChange={onChange} multiple>
      <Listbox.Button className="border p-2 w-full">
        Selected: {value.length}
      </Listbox.Button>

      <input
        className="w-full border p-2"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
      />

      <Listbox.Options
        ref={parentRef}
        className="h-60 overflow-auto border"
      >
        <div style={{ height: rowVirtualizer.getTotalSize() }}>
          {rowVirtualizer.getVirtualItems().map(v => {
            const item = filtered[v.index]
            return (
              <Listbox.Option
                key={item.id}
                value={item}
                style={{ transform: `translateY(${v.start}px)` }}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {item.label}
              </Listbox.Option>
            )
          })}
        </div>
      </Listbox.Options>
    </Listbox>
  )
}
