import { ITEM_PER_PAGE } from '@/lib/settings'
import React from 'react'

function Pagination({ page, count }: { page: number, count: number }) {
  return (
    <div className='p-4 px-0 flex items-center justify-between text-gray-500'>
      <button disabled className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>Prev</button>
      <div className='flex items-center gap-2 text-sm max-sm:px-1'>
        {
          Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) },
            (_, index) => {
              const pageIndex = index + 1;
              return (
                <button key={pageIndex} className={`px-2 rounded-sm ${page === pageIndex ? 'bg-lamaSky' : ''}`}>{pageIndex}</button>
              )
            })
        }
      </div>
      <button className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>Next</button>
    </div>
  )
}

export default Pagination