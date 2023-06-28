//  import React, { useContext, useMemo, useState } from "react";

export interface Project {
  id?: number
  name?: string
  hours?: number
  end: Date
}

/* 
export interface GlobalDataContextValue  {
  isEditMode: boolean;
  loading: boolean;
  allProjects: ReadonlyArray<Project>;
  selectedProject: Project | undefined;
  error: string | undefined;
};

export const GlobalDataContext = React.createContext<GlobalDataContextValue | undefined>(undefined);

export function useGlobalDataContext() {
  const value = useContext(GlobalDataContext);
  if (!value) {
    throw new Error('GlobalData is not in the render tree');
  }
  return value;
}

export function GlobalDataProvider(props: React.PropsWithChildren<Record<string, unknown>>) {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [allProjects, setAllProjects] = useState<ReadonlyArray<Project>>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  const contextValue = useMemo(
    () => ({
        loading,
        error,
        isEditMode,
        allProjects,
        selectedProject,
    }),
    [
        loading,
        error,
        isEditMode,
        allProjects,
        selectedProject,
    ],
  );

  return (
    <GlobalDataContext.Provider value={contextValue}>
      {props.children}
    </GlobalDataContext.Provider>
  );
}

 */
