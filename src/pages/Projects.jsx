import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import homeInBlue from "../assets/projects/home_in_blue.jpg";
import homeInSage from "../assets/projects/home_in_sage.jpg";
import softBeige from "../assets/projects/soft_beige.jpg";
import homeInPastel from "../assets/projects/home_in_pastel.jpg";
import mountainHome from "../assets/projects/mountain_home.jpg";
import studio24_5 from "../assets/projects/studio_24.5.jpg";
import bachelorGrey from "../assets/projects/bachelor_grey.jpg";
import burgondyHome from "../assets/projects/burgondy_home.jpg";

/**
 * Order and layout from design: two per row, alternating small/large.
 * Row 1: small | large, Row 2: large | small, Row 3: small | large, Row 4: large | small.
 */
const projects = [
  { title: "Home in Blue", status: "Реализиран", image: homeInBlue },
  {
    title: "Home in Sage",
    status: "Проект",
    image: homeInSage,
    link: "/projects/home-in-sage",
  },
  {
    title: "Home in Pastel",
    status: "Реализиран",
    image: homeInPastel,
    link: "/projects/home-in-pastel",
  },
  {
    title: "Burgundy Home",
    status: "Проект",
    image: burgondyHome,
    link: "/projects/home-in-burgundy",
  },
  {
    title: "Mountain Home",
    status: "Реализиран",
    image: mountainHome,
    link: "/projects/mountain-home",
  },
  { title: "Soft Beige", status: "В реализация", image: softBeige },
  {
    title: "Bachelor Grey",
    status: "Проект",
    image: bachelorGrey,
    link: "/projects/bachelor-grey",
  },
  {
    title: "Studio 24.5",
    status: "Проект",
    image: studio24_5,
    link: "/projects/studio-24-5",
  },
];

const ROW_CONFIG = [
  { left: "small", right: "large" },
  { left: "large", right: "small" },
  { left: "small", right: "large" },
  { left: "large", right: "small" },
];

/** All project images are 350×500 or 696×500; same height so rows use fixed height for alignment. */
const ROW_IMAGE_HEIGHT = 500;

function ProjectCard({ project }) {
  const content = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { xs: "auto", md: ROW_IMAGE_HEIGHT },
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={project.image}
          alt={project.title}
          sx={{
            width: "100%",
            height: { xs: "auto", md: "100%" },
            display: "block",
            objectFit: { xs: "none", md: "cover" },
            objectPosition: "center",
          }}
        />
      </Box>
      <Typography className="project-title" sx={{ mt: 1.5 }}>
        {project.title}
      </Typography>
      <Typography className="project-status" color="text.secondary">
        {project.status}
      </Typography>
    </Box>
  );

  if (project.link) {
    return (
      <Paper
        component={Link}
        to={project.link}
        elevation={0}
        square
        sx={{
          bgcolor: "transparent",
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
          height: "100%",
        }}
      >
        {content}
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      square
      sx={{
        bgcolor: "transparent",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        height: "100%",
      }}
    >
      {content}
    </Paper>
  );
}

export default function Projects() {
  const rows = [];
  for (let i = 0; i < ROW_CONFIG.length; i++) {
    rows.push([projects[i * 2], projects[i * 2 + 1]]);
  }

  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, pt: { xs: 4, md: 5 }, px: { xs: 2, sm: 3 } }}>
        <Stack spacing={{ xs: 4, md: 3 }}>
          {rows.map(([leftProject, rightProject], rowIndex) => {
            const config = ROW_CONFIG[rowIndex];
            const leftSmall = config.left === "small";
            const leftFlex = leftSmall ? { md: "0 1 40%" } : { md: "0 1 60%" };
            const rightFlex = leftSmall ? { md: "0 1 60%" } : { md: "0 1 40%" };

            return (
              <Box
                key={rowIndex}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 2, md: 2 },
                  alignItems: "stretch",
                }}
              >
                <Box sx={{ flex: { xs: "1 1 auto", md: leftFlex }, minWidth: 0 }}>
                  <ProjectCard project={leftProject} />
                </Box>
                <Box sx={{ flex: { xs: "1 1 auto", md: rightFlex }, minWidth: 0 }}>
                  <ProjectCard project={rightProject} />
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
