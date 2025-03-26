import { useParams } from "react-router";
import { ProjectsContent } from "../constants/contents";

export const ProjectPage = () => {
    const { id } = useParams();
    const project = ProjectsContent.find((project) => project.id === Number(id));

    if (!project) {
        return <div>Project not found</div>;
    }

    console.log(project); 

    const imageUrl = project.image.startsWith('http') ? project.image : `/${project.image}`;

    return (
        <div>
            
            <h1>{project.title}</h1>
            <img src={imageUrl} alt={project.title} className="w-full" />
            <p>{project.description}</p>
        </div>
    );
}