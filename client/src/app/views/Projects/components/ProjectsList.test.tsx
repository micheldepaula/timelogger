import React from 'react';
import { render } from '@testing-library/react';
import { Wrapper } from './../../../components';
import ProjectsList from './ProjectsList';
import { Project } from '../../../slice/projectSlice';
jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  return {
    __esModule: true,
    ...actualModule,
  };
});
describe('Projects List Component', () => {
  const projects: Array<Project> = [];
  for (let i = 1; i <= 10; i++) {
    projects.push({ end: new Date('2023-06-29'), hours: 8, id: i, name: `Project List Item ${i}` });
  }

  const rerender = () =>
    render(
      <Wrapper>
        <ProjectsList projects={projects} />
      </Wrapper>,
    );

  it('renders correctly', () => {
    const { asFragment, getByTestId } = rerender();
    expect(getByTestId('projects-list-component')).toBeDefined();
    projects.map((project) => expect(getByTestId(`projects-list-item-${project.id}`)).toBeDefined());
    expect(asFragment).toMatchSnapshot();
  });

  it('should order the projects end date', () => {
    const { asFragment, getByTestId } = rerender();
    expect(getByTestId('projects-list-component')).toBeDefined();
    projects.map((project) => expect(getByTestId(`projects-list-item-${project.id}`)).toBeDefined());

    expect(asFragment).toMatchSnapshot();
  });
});
