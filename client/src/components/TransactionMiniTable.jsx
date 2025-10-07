import React, { useMemo } from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { shortFormatDate } from '../utils/format'

const TransactionMiniTable = ({transactions}) => {

  const columns = useMemo(() => [
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => (
        <p>{shortFormatDate(row.original.created_at)}</p>
      )
    },
    {
      accessorKey: 'description',
      header: 'Description'
    },
    {
      accessorKey: 'type',
      header: 'Type'
    },
    {
      accessorKey: 'amount',
      header: 'Amount'
    },
  ], [])

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className='w-full'>
      <thead className='sticky top-22'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}
              className='bg-gray-300 py-2'
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}
              className='px-2'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionMiniTable
