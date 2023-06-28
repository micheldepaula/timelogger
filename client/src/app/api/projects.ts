import { Project } from '../redux/projectSlice'

const BASE_URL = 'http://localhost:3001/api'

export async function getAll() {
  const response = await fetch(`${BASE_URL}/projects`)
  return response.json()
}

export async function postProject(data: Project) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      hours: data.hours,
      end: data.end,
    }),
  }
  const response = await fetch(`${BASE_URL}/projects`, requestOptions)
  return response.json()
}

export async function putProject(data: Project) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      hours: data.hours,
      end: data.end,
    }),
  }
  const response = await fetch(`${BASE_URL}/projects`, requestOptions)
  return response.json()
}
