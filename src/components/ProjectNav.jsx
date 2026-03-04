import { Box, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const PROJECTS = [
  { path: "/projects/home-in-sage", label: "Home in Sage" },
  { path: "/projects/home-in-burgundy", label: "Home in Burgundy" },
  { path: "/projects/home-in-pastel", label: "Home in Pastel" },
  { path: "/projects/home-in-blue", label: "Home in Blue" },
  { path: "/projects/mountain-home", label: "Mountain Home" },
  { path: "/projects/bachelor-grey", label: "Bachelor Grey" },
  { path: "/projects/studio-24-5", label: "Studio 24/5" },
  { path: "/projects/soft-beige", label: "Soft Beige" },
];

const btnSx = {
  color: "#f4ede7",
  textTransform: "none",
  fontFamily: '"Poppins", sans-serif',
  fontSize: "0.95rem",
  fontWeight: 500,
  px: 2,
  py: 1,
  "&:hover": { bgcolor: "rgba(244,237,231,0.08)" },
};

/**
 * Renders Previous / Next project navigation.
 * @param {{ currentPath: string }} props
 */
export default function ProjectNav({ currentPath }) {
  const idx = PROJECTS.findIndex((p) => p.path === currentPath);
  if (idx === -1) return null;

  const prev = idx > 0 ? PROJECTS[idx - 1] : PROJECTS[PROJECTS.length - 1];
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : PROJECTS[0];

  return (
    <Box sx={{ mt: { xs: 5, md: 6 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Button
          component={Link}
          to={prev.path}
          variant="text"
          startIcon={<ArrowBackIcon />}
          sx={btnSx}
        >
          Предишен проект
        </Button>
        <Button
          component={Link}
          to={next.path}
          variant="text"
          endIcon={<ArrowForwardIcon />}
          sx={btnSx}
        >
          Следващият проект
        </Button>
      </Stack>
    </Box>
  );
}
