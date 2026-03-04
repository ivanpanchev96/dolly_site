/**
 * Selected projects for the homepage carousel.
 * Edit selectedProjects.json to change the list: add/remove/reorder projects,
 * and update name, imagePath, and link. When adding a new image, import it
 * below and add it to imageMap.
 */

import projectsData from "./selectedProjects.json";

import homeInSageImage from "../assets/selected_projects_cover/home_in_sage.jpg";
import homeInBurgundyImage from "../assets/selected_projects_cover/home_in_burgondy.jpg";
import homeInPastelImage from "../assets/selected_projects_cover/home_in_pastel.jpg";
import homeInBlueImage from "../assets/selected_projects_cover/home_in_blue.jpg";
import mountainHomeImage from "../assets/selected_projects_cover/mountain_home.jpg";
import bachelorGreyImage from "../assets/selected_projects_cover/bachelor_grey.jpg";
import studioImage from "../assets/selected_projects_cover/studio.jpg";
import softBeigeImage from "../assets/selected_projects_cover/home_in_beige.jpg";

const imageMap = {
  "selected_projects_cover/home_in_sage.jpg": homeInSageImage,
  "selected_projects_cover/home_in_burgondy.jpg": homeInBurgundyImage,
  "selected_projects_cover/home_in_pastel.jpg": homeInPastelImage,
  "selected_projects_cover/home_in_blue.jpg": homeInBlueImage,
  "selected_projects_cover/mountain_home.jpg": mountainHomeImage,
  "selected_projects_cover/bachelor_grey.jpg": bachelorGreyImage,
  "selected_projects_cover/studio.jpg": studioImage,
  "selected_projects_cover/home_in_beige.jpg": softBeigeImage,
};

export const selectedProjects = projectsData.map((project) => ({
  ...project,
  image: imageMap[project.imagePath] || homeInBlueImage,
}));
