import React, { useState } from 'react'
import Item from './ProjectsListItem'

import { useAppDispatch } from '../../../hooks'
import { sortedProjectsAsc, Project } from '../../../slice/projectSlice'

interface ProjectsListProps {
  projects: Array<Project>
  error?: string
  loading?: string
}
const ProjectsList: React.FC<ProjectsListProps> = ({ projects, error, loading }) => {
  const [up, setUp] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const orderProjectsByEndDate = () => {
    if (up) {
      dispatch(sortedProjectsAsc(projects))
      setUp(!up)
    } else {
      dispatch({ type: 'projects/sortedProjectsDesc' })
      setUp(!up)
    }
  }

  const IconUp = () => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75' />
      </svg>
    )
  }
  const IconDown = () => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3' />
      </svg>
    )
  }

  return (
    <table className='table-fixed w-full' data-testid='projects-list-component'>
      <thead className='bg-gray-200'>
        <tr className='space'>
          <th className='border px-4 py-2 w-12'>#</th>
          <th className='border px-4 py-2'>Project Name</th>
          <th className='border px-4 py-2'>Hours</th>
          <th className='flex justify-between border px-4 py-2 cursor-pointer ' onClick={orderProjectsByEndDate}>
            DeadLine {up ? <IconUp /> : <IconDown />}
          </th>
        </tr>
      </thead>
      <tbody>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {projects.map((project) => (
          <Item key={project.id} project={project} />
        ))}
      </tbody>
    </table>
  )
}

export default ProjectsList
