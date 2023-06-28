import React, { useEffect, useState } from 'react'
import { IProject } from '../../utils'
import Item from './Item'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addProject,
  sortedProjectsAsc,
  projectsSelector,
  getProjects,
} from './../redux/projectSlice'

export default function Table() {
  const [project, setProject] = useState<IProject>()
  const [up, setUp] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const addEntry = () => {
    if (project != undefined && project.name != undefined && project.end != undefined) {
      dispatch(
        addProject({
          name: project.name,
          hours: Number(project.hours),
          end: new Date(project.end),
        }),
      )
    }
  }
  const globalData = useAppSelector(projectsSelector)

  useEffect(() => {
    dispatch(getProjects())
  }, [])

  const orderProjectsByEndDate = () => {
    if (up) {
      dispatch(sortedProjectsAsc(globalData.projects))
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
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
        />
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
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
        />
      </svg>
    )
  }

  return (
    <table className='table-fixed w-full'>
      <thead className='bg-gray-200'>
        <tr className='space'>
          <th className='border px-4 py-2 w-12'>#</th>
          <th className='border px-4 py-2'>Project Name</th>
          <th className='border px-4 py-2'>Hours</th>
          <th
            className='flex justify-between border px-4 py-2 cursor-pointer '
            onClick={orderProjectsByEndDate}
          >
            DeadLine {up ? <IconUp /> : <IconDown />}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='border px-4 py-2 w-12'>#</td>
          <td className='border px-4 py-2'>
            <input
              className='border rounded-full py-2 px-4'
              type='name'
              value={project?.name}
              placeholder='Project Name'
              aria-label='Project Name'
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </td>
          <td className='border px-4 py-2'>
            <input
              className='border rounded-full py-2 px-4'
              type='number'
              value={project?.hours}
              placeholder='Hours'
              aria-label='Hours'
              onChange={(e) => setProject({ ...project, hours: e.target.value })}
            />
          </td>
          <td className='flex justify-between border px-4 py-2'>
            <input
              className='border rounded-full py-2 px-4'
              type='date'
              value={project?.end?.toString()}
              placeholder='DeadLine'
              aria-label='DeadLine'
              onChange={(e) => setProject({ ...project, end: e.target.value })}
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2'
              onClick={addEntry}
            >
              Add Entry
            </button>
          </td>
        </tr>
        {globalData.projects.map((project) => (
          <Item key={project.id} project={project} />
        ))}
      </tbody>
    </table>
  )
}
