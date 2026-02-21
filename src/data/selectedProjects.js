/**
 * Selected projects for the homepage carousel.
 * Edit selectedProjects.json to change the list: add/remove/reorder projects,
 * and update name, imagePath, and link. When adding a new image, import it
 * below and add it to imageMap.
 */

import projectsData from "./selectedProjects.json";

import homeInSageImage from "../assets/projects/home_in_sage.jpg";
import homeInBlueImage from "../assets/projects/home_in_blue.jpg";
import softBeigeImage from "../assets/projects/soft_beige.jpg";
import homeInPastelImage from "../assets/projects/home_in_pastel.jpg";
import mountainHomeImage from "../assets/projects/mountain_home.jpg";
import studio24_5Image from "../assets/projects/studio_24.5.jpg";

const imageMap = {
  "projects/home_in_sage.jpg": homeInSageImage,
  "projects/home_in_blue.jpg": homeInBlueImage,
  "projects/soft_beige.jpg": softBeigeImage,
  "projects/home_in_pastel.jpg": homeInPastelImage,
  "projects/mountain_home.jpg": mountainHomeImage,
  "projects/studio_24.5.jpg": studio24_5Image,
};

export const selectedProjects = projectsData.map((project) => ({
  ...project,
  image: imageMap[project.imagePath] || homeInBlueImage,
}));
