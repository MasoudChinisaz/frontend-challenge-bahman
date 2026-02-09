import { SelectItem } from './types'

export function groupItems(items: SelectItem[]) {
  return items.reduce<Record<string, SelectItem[]>>((acc, item) => {
    const group = item.group ?? 'Ungrouped'
    acc[group] = acc[group] || []
    acc[group].push(item)
    return acc
  }, {})
}

export function toggleAll(
  items: SelectItem[],
  selected: SelectItem[]
): SelectItem[] {
  return selected.length === items.length ? [] : items
}
