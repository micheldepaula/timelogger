
import  React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Project, getProjects, projectsSelector } from "./../redux/projectSlice";

import Table from "../components/Table";




export default function Projects() {
    const [projects, setProjects] = useState<Array<Project>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const [ filteredResults , setFilteredResults] = useState<Array<Project>>([]);

    const inputRef = React.useRef<null | HTMLInputElement>(null);

    const selectedProject = useAppSelector(projectsSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjects());
      }, []);



    useEffect(() => {
      setLoading(selectedProject.loading);
      setError(selectedProject.error);
      setProjects(selectedProject.projects);
      setFilteredResults(selectedProject.projects)
    }, [selectedProject]);
    
    function handleGetProjects() {
      dispatch(getProjects());
    }


    
    const searchItems = () => {
       const searchInput2 = inputRef.current ? inputRef.current.value : ""
        if (searchInput2 !== "") {
            const filteredData = projects.filter((item) => {
                return Object.values(item).join("").toLowerCase().includes(searchInput2.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(projects)
        }
    }

    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleGetProjects}
                        >
                        Update
                    </button>
                </div>

                <div className="w-1/2 flex justify-end">
                    <form>
                        <input
                            className="border rounded-full py-2 px-4"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={searchItems}
                            ref={inputRef}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {filteredResults != undefined && 
            <Table/>
            }
        </>
    );
}
