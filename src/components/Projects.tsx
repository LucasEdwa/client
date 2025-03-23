import { Link } from "react-router";
import { ProjectsContent } from "../constants/contents";


export const Projects = () => {
    return (
        <div className="projects">
            <div className="container">
                <h2 className="text-center text-2xl font-bold">Our Projects</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {ProjectsContent.map((project ) => (
                        <div className="w-[300px] p-4" key={project.id}>
                            <img src={project.image} alt={project.title} className="w-full" />
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <Link to={`/project/${project.id}` }className="btn">
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}