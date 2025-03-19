import { Projects } from "../components/Projects";


export const ProjectsPage = () => {
    return (
        <div className="product-page">
            <div className="container">
                <h1>Our Products</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
                </p>
                <Projects />
            </div>
        </div>
    );
};