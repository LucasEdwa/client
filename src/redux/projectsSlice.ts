import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProject } from "../types/types";
import { RootState } from "./store";
import { ProjectsContent } from "../constants/contents";

interface ProjectState {
  projects: TProject[];
}

const initialState: ProjectState = {
  projects: ProjectsContent,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<TProject[]>) => {
      state.projects = action.payload;
    },
  },
});

export const { setProjects } = projectsSlice.actions;
export const selectProjects = (state: RootState): TProject[] => state.projects.projects;
export default projectsSlice.reducer;