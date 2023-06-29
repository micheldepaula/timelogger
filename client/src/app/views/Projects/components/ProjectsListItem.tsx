import { useAppDispatch } from '../../../hooks'
import React, { useState } from 'react'
import { IProject } from '../../../../utils'
import { editProject } from '../../../slice/projectSlice'

type ProjectsListItemProps = {
  project: IProject
}

const ProjectsListItem: React.FC<ProjectsListItemProps> = ({ project }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [hours, setHours] = useState(project.hours)
  const [name, setName] = useState(project.name)
  const dispatch = useAppDispatch()
  const handleEditProject = () => {
    setEdit(false)
    if (project.end) {
      dispatch(
        editProject({
          id: project.id,
          name: name,
          hours: Number(hours),
          end: new Date(project.end.toString()),
        }),
      )
    }
  }
  const EditableInputName = () => {
    return (
      <td className='border px-4 py-2'>
        <input
          className='border rounded-full py-2 px-4'
          value={name}
          type='name'
          placeholder='Project Name'
          aria-label='Project Name'
          onChange={(e) => setName(e.target.value.toString())}
        />
      </td>
    )
  }

  const EditableInputHours = () => {
    return (
      <td className='border px-4 py-2 '>
        <input
          className='border rounded-full py-2 px-4'
          value={hours}
          type='number'
          placeholder='DeadLine'
          aria-label='DeadLine'
          onChange={(e) => setHours(e.target.value.toString())}
        />
      </td>
    )
  }

  const EditButtons = () => {
    return (
      <div className='flex justify-between '>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2'
          onClick={handleEditProject}
          data-testid={`projects-list-item-${project.id}-button-edit`}
        >
          Save
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white rounded-full py-2 px-4 ml-2'
          onClick={() => setEdit(false)}
          data-testid={`projects-list-item-${project.id}-button-cancel-edit`}
        >
          cancel
        </button>
      </div>
    )
  }

  return (
    <tr data-testid={`projects-list-item-${project.id}`}>
      <td className='border px-4 py-2 w-12'>{project.id}</td>
      {!edit ? <td className='border px-4 py-2'>{name}</td> : <EditableInputName />}
      {!edit ? <td className='border px-4 py-2'>{hours}</td> : <EditableInputHours />}
      <td className='flex justify-between border px-4 py-2 '>
        {project.end && new Date(project.end).toISOString().split('T')[0]}
        {!edit ? (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2'
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        ) : (
          <EditButtons />
        )}
      </td>
    </tr>
  )
}
export default ProjectsListItem
