import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Wrapper } from './../../components'
import Projects from './Projects'
import * as redux from 'react-redux'

jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux')
  return {
    __esModule: true,
    ...actualModule,
  }
})

describe('Projects View', () => {
  const rerender = () =>
    render(
      <Wrapper>
        <Projects />
      </Wrapper>,
    )

  it('renders correctly', () => {
    const { asFragment, getByTestId } = rerender()
    expect(getByTestId('projects-view')).toBeDefined()
    expect(asFragment).toMatchSnapshot()
  })

  it('Adding a new entry', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn)

    const { asFragment, getByTestId } = rerender()
    expect(getByTestId('projects-view')).toBeDefined()
    expect(getByTestId('project-name-input')).toBeDefined()
    expect(getByTestId('hours-input')).toBeDefined()
    expect(getByTestId('deadline-input')).toBeDefined()
    expect(getByTestId('add-entry-button')).toBeDefined()

    const deadlineInput = getByTestId('deadline-input')
    const hoursInput = getByTestId('hours-input')
    const projectNameInput = getByTestId('project-name-input')
    const addEntryButton = getByTestId('add-entry-button')

    fireEvent.change(projectNameInput, { target: { value: 'ProjectName Test 123' } })
    fireEvent.change(hoursInput, { target: { value: '10' } })
    fireEvent.change(deadlineInput, { target: { value: '29-06-2023' } })

    fireEvent.click(addEntryButton)
    expect(mockDispatchFn).toBeCalled()
    expect(asFragment).toMatchSnapshot()
  })
})
