import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { addProject, getProjects, projectsSelector } from '../../slice/projectSlice'
import ProjectsList from './components/ProjectsList'

const Projects: React.FC = () => {
  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputHoursRef = useRef<HTMLInputElement>(null)
  const inputEndRef = useRef<HTMLInputElement>(null)
  const { projects, loading, error } = useAppSelector(projectsSelector)

  useEffect(() => {
    dispatch(getProjects())
  }, [])

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
          data-testid='project-name-input'
        />

        <input
          className='border  py-2 px-4'
          type='number'
          ref={inputHoursRef}
          placeholder='Hours'
          aria-label='Hours'
          data-testid='hours-input'
        />

        <input
          className='border  py-2 px-4'
          type='date'
          ref={inputEndRef}
          placeholder='DeadLine'
          aria-label='DeadLine'
          data-testid='deadline-input'
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddEntry}
          data-testid='add-entry-button'
        >
          Add Entry
        </button>
      </div>
    )
  }

  return (
    <div data-testid='projects-view'>
      <div className='flex items-center my-6'>
        <AddEntry />
        <div className='w-1/2 flex justify-end'>
          <form>
            <input
              className='border rounded-full py-2 px-4'
              type='search'
              placeholder='Search'
              aria-label='Search'
              data-testid='search-input'
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2'
              type='submit'
              data-testid='search-button'
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {loading && <div data-testid='loading'>Loading...</div>}
      {error && <div data-testid='error'>Error: {error}</div>}
      <ProjectsList projects={projects} />
    </div>
  )
}

export default Projects
