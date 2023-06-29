import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { addProject, projectsSelector } from './../redux/projectSlice'
import Table from '../components/Table'

export default function Projects() {
  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputHoursRef = useRef<HTMLInputElement>(null)
  const inputEndRef = useRef<HTMLInputElement>(null)
  const globalData = useAppSelector(projectsSelector)

  const dispatch = useAppDispatch()

  const handleAddEntry = () => {
    if (inputNameRef.current && inputHoursRef.current && inputEndRef.current) {
      dispatch(
        addProject({
          name: inputNameRef.current.value,
          hours: Number(inputHoursRef.current.value),
          end: new Date(inputEndRef.current.value),
        }),
      )
      inputNameRef.current.value = ''
      inputHoursRef.current.value = ''
      inputEndRef.current.value = ''
    }
  }

  const AddEntry = () => {
    return (
      <div className='w-1/2'>
        <input
          className='border  py-2 px-4'
          type='name'
          ref={inputNameRef}
          placeholder='Project Name'
          aria-label='Project Name'
        />

        <input className='border  py-2 px-4' type='number' ref={inputHoursRef} placeholder='Hours' aria-label='Hours' />

        <input
          className='border  py-2 px-4'
          type='date'
          ref={inputEndRef}
          placeholder='DeadLine'
          aria-label='DeadLine'
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddEntry}
        >
          Add Entry
        </button>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center my-6'>
        <AddEntry />
        <div className='w-1/2 flex justify-end'>
          <form>
            <input className='border rounded-full py-2 px-4' type='search' placeholder='Search' aria-label='Search' />
            <button className='bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
      {globalData.loading && <div>Loading...</div>}
      {globalData.error && <div>Error: {globalData.error}</div>}
      <Table />
    </>
  )
}
