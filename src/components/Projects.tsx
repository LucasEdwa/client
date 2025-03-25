import { Link } from "react-router";
import { ProjectsContent } from "../constants/contents";
import { styles } from "../constants/styles";

export const Projects = () => {
    return (
        <div className={styles.projectsStyles.container}>
            <div className={styles.projectsStyles.wrapper}>
                <h2 className={styles.projectsStyles.title}>Our Projects</h2>
                <div className={styles.projectsStyles.grid}>
                    {ProjectsContent.map((project) => (
                        <div className={styles.projectsStyles.card} key={project.id}>
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className={styles.projectsStyles.image} 
                            />
                            <h3 className={styles.projectsStyles.cardTitle}>{project.title}</h3>
                            <p className={styles.projectsStyles.cardDescription}>{project.description}</p>
                            <Link to={`/project/${project.id}`} className={styles.projectsStyles.button}>
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}