import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

const footerNav = {
  "НАЧАЛО": [
    { label: "За мен", to: "/#about" },
    { label: "Тестимониали", to: "/#services" },
    { label: "Проекти", to: "/projects" },
  ],
  "УСЛУГИ": [
    { label: "Пакети", to: "/services" },
    { label: "Етапи на проектиране", to: "/services#etapi" },
    { label: "Често задавани въпроси", to: "/services#faq" },
  ],
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#6d5144",
        color: "#f4ede7",
        py: { xs: 4, md: 5 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 0 }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Stack spacing={1} sx={{ order: { xs: 1, md: 1 } }}>
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              НАЧАЛО
            </Typography>
            {footerNav["НАЧАЛО"].map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.to}
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontSize: 14,
                  display: "block",
                  "&:hover": { color: "#fff", textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>

          <Stack spacing={1} sx={{ order: { xs: 2, md: 2 } }}>
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              УСЛУГИ
            </Typography>
            {footerNav["УСЛУГИ"].map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.to}
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontSize: 14,
                  display: "block",
                  "&:hover": { color: "#fff", textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>

          <Typography
            variant="h6"
            sx={{
              order: { xs: 0, md: 3 },
              fontFamily: "Georgia, serif",
              letterSpacing: "0.25em",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            ATELIER BY DOLI
          </Typography>

          <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }} sx={{ order: { xs: 3, md: 4 } }}>
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              КОНТАКТИ
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  color: "#f4ede7",
                  bgcolor: "rgba(0,0,0,0.2)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.35)" },
                }}
                component="a"
                href="mailto:likomanovadoli@gmail.com"
                aria-label="Email"
              >
                <MailOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#f4ede7",
                  bgcolor: "rgba(0,0,0,0.2)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.35)" },
                }}
                component="a"
                href="https://www.linkedin.com/in/doli-likomanova"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#f4ede7",
                  bgcolor: "rgba(0,0,0,0.2)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.35)" },
                }}
                component="a"
                href="https://www.instagram.com/atelier_by_doli"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
