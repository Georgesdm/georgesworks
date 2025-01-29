import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/GraphicsWork.css";

const GraphicsWork = () => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const graphicsProjects = [
    {
      id: 1,
      title: "Fubu Organization",
      images: [
        "/images/projects/fubu/main-1920x1280.png",
        "/images/projects/fubu/fubu1.png",
        "/images/projects/fubu/fubu2.png",
        "/images/projects/fubu/fubu3.png",
        "/images/projects/fubu/fubu4.png",
      ],
      description: `
Description : Création du logo et d’affiches pour concerts
Objectif : Donner une identité visuelle forte à l’organisation
Visuels : Logo, déclinaisons, affiches événementielles`,
      tags: ["2022-2024", "Branding", "Event"],
    },
    {
      id: 2,
      title: "Lowkey Brand",
      images: [
        "/images/projects/lowkey/main-1920x1280.png",
        "/images/projects/lowkey/lowkey3.png",
      ],
      description: `
Description : Identité visuelle, mockups, préparation de collection
Objectif : Construire une image de marque cohérente
Visuels : Logo, maquettes, présentations de collection`,
      tags: ["2023", "Branding", "Clothing"],
    },
    {
      id: 3,
      title: "FTP (US)",
      images: [
        "/images/projects/ftp/main-1920x1280.png",
        "/images/projects/ftp/ftp1.png",
        "/images/projects/ftp/ftp2.png",
        "/images/projects/ftp/ftp3.png",
      ],
      description: `
Description : Designs pour t-shirts/assets (+25)
Objectif : Créer des visuels percutants pour le streetwear
Visuels : Motifs, compositions graphiques
Points clés : Impact visuel, reconnaissance de marque`,
      tags: ["2021-2024", "Branding", "Clothing"],
    },
    {
      id: 4,
      title: "Sousbackwoods",
      images: [
        "/images/projects/sbk/main-1920x1280.png",
        "/images/projects/sbk/sbk2.png",
        "/images/projects/sbk/sbk3.png",
      ],
      description: `
Description : Logo, merchandising, déclinaisons graphiques
Objectif : Assurer une continuité visuelle à travers les années
Visuels : Logo original, évolutions, déclinaisons
Points clés : Cohérence graphique, variation et adaptation`,
      tags: ["2019-2024", "Branding", "Merchandising"],
    },
  ];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedWork.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === selectedWork.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleProjectClick = (project) => {
    setSelectedWork(project);
    setCurrentImageIndex(0);
  };

  return (
    <div className="graphics-container">
      <div className="graphics-header">
        <Link to="/" className="back-button">
          ← Retour à la page d'accueil
        </Link>
        <h1 className="graphics-title">
          <span className="highlight">Mes derniers projets</span>
        </h1>

        <p className="graphics-description">
          7 ans d'expertise en tant que graphiste freelance spécialisé dans
          l'identité de marque et le design textile, complétés par une formation
          intensive en développement web.
          <br />
          Cette double compétence me permet d'apporter une vision globale aux
          projets digitaux.
          <br /> <br />
          Pour en savoir plus sur mes projets, cliquez sur une carte pour ouvrir
          le modal. Vous pouvez ensuite naviguer entre les images du projet en
          utilisant les boutons de navigation gauche et droite.
        </p>
      </div>

      <div className="projects-grid">
        {graphicsProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="project-card"
          >
            <div className="project-image-container">
              <img
                src={project.images[0]}
                alt={project.title}
                className="project-image"
              />
              <div className="project-overlay">
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="tags-container">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="graphics-footer">
        Cette galerie est en cours de construction.
        <br />
        Mes travaux plus anciens seront ajoutés progressivement.
      </p>

      {/* Modal for selected work */}
      {selectedWork && (
        <div className="modal-overlay" onClick={() => setSelectedWork(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-button"
              onClick={() => setSelectedWork(null)}
            >
              X
            </button>

            <div className="modal-gallery">
              <button
                className="gallery-nav gallery-prev"
                onClick={handlePrevImage}
                disabled={selectedWork.images.length <= 1}
              >
                ←
              </button>
              <img
                src={selectedWork.images[currentImageIndex]}
                alt={`${selectedWork.title} - Image ${currentImageIndex + 1}`}
                className="modal-image"
              />
              <button
                className="gallery-nav gallery-next"
                onClick={handleNextImage}
                disabled={selectedWork.images.length <= 1}
              >
                →
              </button>
            </div>

            <div className="image-counter">
              {currentImageIndex + 1} / {selectedWork.images.length}
            </div>

            <div className="modal-info">
              <h2 className="modal-title">{selectedWork.title}</h2>
              <p className="modal-description">{selectedWork.description}</p>
              <div className="tags-container">
                {selectedWork.tags?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphicsWork;
