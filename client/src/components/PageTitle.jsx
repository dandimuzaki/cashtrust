import React from 'react'

const PageTitle = ({children, title}) => {
  return (
    <div className='md:pt-8 py-4 items-end flex justify-between md:gap-4 bg-[var(--background)] md:sticky top-0 z-150'>
        <h1 className='text-3xl'>{title}</h1>
        {children}
    </div>
  )
}

export default PageTitle
