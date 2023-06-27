import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getAll, postProject, putProject } from "./../api/projects";

export interface Project {
    id?: number ,
    name?: string ,
    hours?: number,
    end: Date
}

export interface ProjectState {
  loading: boolean;
  projects: Array<Project>;
  project: Project | undefined;
  error: string | undefined;
}
const initialState: ProjectState = {
  loading: false,
  projects: [],
  project: undefined,
  error: undefined,
}
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  () => {
    const res = getAll().then(data => data);
    return res;
  }
)

export const addProject = createAsyncThunk(
    "projects/addProjects",
    (project: Project) => {
      const res = postProject(project).then(data => data);
      return res;
    }
  )

export const editHoursProject = createAsyncThunk(
    "projects/editProjects",
    (project: Project) => {
      const res = putProject(project).then(data => data);
      return res;
    }
  )
const ProjectSlice = createSlice({
  name: 'projects',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action: PayloadAction<Array<Project>>) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    });
    builder.addCase(addProject.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(addProject.fulfilled, (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.projects = [...state.projects, action.payload];
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(editHoursProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editHoursProject.fulfilled, (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.project =  action.payload;
    });
    builder.addCase(editHoursProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const projectsSelector = (state: RootState) => state.projectsReducer;
export default ProjectSlice.reducer;