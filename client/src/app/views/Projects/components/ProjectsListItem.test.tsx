import React from 'react';
import { render } from '@testing-library/react';
import ProjectsListItem from './ProjectsListItem';
import Wrapper from '../../../components/Wrapper/Wrapper';
import { IProject } from '../../../../utils';

jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  return {
    __esModule: true,
    ...actualModule,
  };
});

describe('Projects List Item Component', () => {
  const projectItem: IProject = { end: '2023-06-29', hours: 8, id: 1, name: 'Project List Item' };

  const rerender = () =>
    render(
      <Wrapper>
        <ProjectsListItem project={projectItem} />
      </Wrapper>,
    );

  it('renders correctly', () => {
    const { asFragment, getByTestId } = rerender();
    expect(getByTestId(`projects-list-item-${projectItem.id}`)).toBeDefined();
    expect(asFragment).toMatchSnapshot();
  });
});
