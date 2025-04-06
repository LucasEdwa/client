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
        <div className="flex flex-col items-center justify-center gap-6 p-4 h-full xl:w-1/2 xl:mx-auto">
            
            <h1 className="p-10 text-2xl">{project.title}</h1>
            <img src={imageUrl} alt={project.title} className="w-full object-cover" />
            <p className="p-10 bg-gray-900/90 text-white rounded-2xl lg:text-2xl"> {project.description}</p>
        </div>
    );
}