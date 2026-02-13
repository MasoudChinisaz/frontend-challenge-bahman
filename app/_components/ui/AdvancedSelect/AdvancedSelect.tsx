"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer, type Virtualizer } from "@tanstack/react-virtual";

type SelectItem = {
  id: string;
  label: string;
};

type Props = {
  items: SelectItem[];
  value: SelectItem[];
  onChange: (v: SelectItem[]) => void;
};

/* Measure helper (Type-safe) */
function MeasureOnOpen<
  TScroll extends Element,
  TItem extends Element
>({
  open,
  virtualizer,
}: {
  open: boolean;
  virtualizer: Virtualizer<TScroll, TItem>;
}) {
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      virtualizer.measure();
    });
  }, [open, virtualizer]);
  return null;
}


export default function AdvancedSelect({ items, value, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [tempSelected, setTempSelected] = useState<SelectItem[]>(value);
  const parentRef = useRef<HTMLDivElement>(null);

  // Sync internal state with parent
  useEffect(() => {
    setTempSelected(value);
  }, [value]);

  // Filtered items
  const filtered = useMemo(() => {
    return items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [items, query]);

  // Virtualizer
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 5,
  });

  // Actions
  const handleApply = () => onChange(tempSelected);
  const handleCancel = () => setTempSelected(value);
  const handleSelectAll = () => setTempSelected(filtered);
  const handleClear = () => setTempSelected([]);

  return (
    <div className='relative w-full'>
      <Listbox value={tempSelected} onChange={setTempSelected} multiple>
        {({ open }) => (
          <>
            {/* Fix virtualization measurement */}
            <MeasureOnOpen open={open} virtualizer={rowVirtualizer} />

            {/* Trigger */}
            <Listbox.Button className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-left shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition'>
              {value.length === 0 ? (
                <span className='text-gray-500'>Select items...</span>
              ) : (
                <span className='font-medium'>{value.length} selected</span>
              )}
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden focus:outline-none'>
                {/* Search */}
                <div className='p-3 border-b bg-gray-50'>
                  <input
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    placeholder='Search...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Select All / Clear */}
                <div className='flex gap-2 p-3 border-b'>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelectAll();
                    }}
                    className='flex-1 text-sm bg-blue-50 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition'
                  >
                    Select All
                  </button>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClear();
                    }}
                    className='flex-1 text-sm bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition'
                  >
                    Clear
                  </button>
                </div>

                {/* Virtualized List */}
                <div ref={parentRef} className='max-h-64 overflow-y-auto'>
                  {filtered.length === 0 ? (
                    <div className='px-4 py-8 text-center text-sm text-gray-500'>
                      No results found
                    </div>
                  ) : (
                    <div
                      style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: "relative",
                      }}
                    >
                      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const item = filtered[virtualRow.index];

                        return (
                          <Listbox.Option
                            key={item.id}
                            value={item}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: `${virtualRow.size}px`,
                              transform: `translateY(${virtualRow.start}px)`,
                            }}
                            className={({ active }) =>
                              `flex items-center px-4 cursor-pointer transition ${
                                active ? "bg-blue-50" : "hover:bg-gray-50"
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <input
                                  type='checkbox'
                                  checked={selected}
                                  readOnly
                                  className='mr-3 h-4 w-4 accent-blue-600'
                                />
                                <span className='text-sm'>{item.label}</span>
                              </>
                            )}
                          </Listbox.Option>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between p-3 border-t bg-gray-50'>
                  <span className='text-xs text-gray-500'>
                    {tempSelected.length} selected
                  </span>
                  <div className='flex gap-2'>
                    <button
                      onClick={handleApply}
                      className='px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
