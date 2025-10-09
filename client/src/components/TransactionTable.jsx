import React, { useMemo } from 'react'
import { formatDate } from '../utils/format'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useTransaction } from '../hooks/TransactionContext'
import { Delete, Edit } from '@mui/icons-material'
import AlertDelete from './AlertDelete'

const TransactionTable = () => {
  const {transactions, openTransactionModal, removeTransaction} = useTransaction()

  const columns = useMemo(() => [
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => (
      <p>{formatDate(row.original.created_at)}</p>
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
      accessorKey: 'category_name',
      header: 'Category'
    },
    {
      accessorKey: 'amount',
      header: 'Amount'
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className='text-white py-2 flex gap-2 justify-center'>
          <button 
          className='bg-yellow-500 w-8 h-8 justify-center rounded flex items-center gap-1'
          onClick={() => openTransactionModal(row.original)}
          >
            <Edit fontSize='small'/>
          </button>
          <AlertDelete 
          title='Are you sure you want to delete this transaction?'
          description='Once deleted, it will be permanently removed from your records.'
          action={() => removeTransaction(row.original.id)}
          >
          <button 
          className='bg-red-500 w-8 h-8 justify-center rounded flex items-center gap-1'
          >
            <Delete fontSize='small'/>
          </button>
          </AlertDelete>
        </div>
      )
    }
  ], [])

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className='hidden md:block w-full'>
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

export default TransactionTable
