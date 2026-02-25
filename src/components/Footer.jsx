import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import logo from "../assets/svg/logo.svg";

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
        {/* Mobile: 2-column grid. Desktop: single row. */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "auto auto 1fr auto" },
            gridTemplateRows: { xs: "auto auto", md: "auto" },
            gap: { xs: 4, md: 0 },
            justifyContent: { md: "space-between" },
            alignItems: { md: "flex-start" },
          }}
        >
          {/* НАЧАЛО — xs: col 1 row 1 | md: col 1 */}
          <Stack spacing={1} sx={{ gridColumn: { xs: 1, md: 1 }, gridRow: { xs: 1, md: 1 } }}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
              НАЧАЛО
            </Typography>
            {footerNav["НАЧАЛО"].map((item) => (
              <Typography key={item.label} component={Link} to={item.to} sx={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 14, display: "block", whiteSpace: "nowrap", "&:hover": { color: "#fff", textDecoration: "underline" } }}>
                {item.label}
              </Typography>
            ))}
          </Stack>

          {/* Logo — xs: col 2 row 1 | md: col 3 (centre) */}
          <Box
            component={Link}
            to="/"
            sx={{
              gridColumn: { xs: 2, md: 3 },
              gridRow: { xs: 1, md: 1 },
              display: "flex",
              alignItems: "flex-start",
              justifyContent: { xs: "flex-end", md: "center" },
            }}
          >
            <Box component="img" src={logo} alt="Atelier by Doli" sx={{ height: { xs: 14, md: 22 }, display: "block" }} />
          </Box>

          {/* УСЛУГИ — xs: col 1 row 2 | md: col 2 */}
          <Stack spacing={1} sx={{ gridColumn: { xs: 1, md: 2 }, gridRow: { xs: 2, md: 1 } }}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
              УСЛУГИ
            </Typography>
            {footerNav["УСЛУГИ"].map((item) => (
              <Typography key={item.label} component={Link} to={item.to} sx={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 14, display: "block", whiteSpace: "nowrap", "&:hover": { color: "#fff", textDecoration: "underline" } }}>
                {item.label}
              </Typography>
            ))}
          </Stack>

          {/* КОНТАКТИ — xs: col 2 row 2 | md: col 4 */}
          <Stack spacing={1} alignItems={{ xs: "flex-end", md: "flex-start" }} sx={{ gridColumn: { xs: 2, md: 4 }, gridRow: { xs: 2, md: 1 } }}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", textAlign: { xs: "right", md: "left" } }}>
              КОНТАКТИ
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: "#f4ede7", bgcolor: "rgba(0,0,0,0.2)", "&:hover": { bgcolor: "rgba(0,0,0,0.35)" } }} component="a" href="mailto:likomanovadoli@gmail.com" aria-label="Email">
                <MailOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#f4ede7", bgcolor: "rgba(0,0,0,0.2)", "&:hover": { bgcolor: "rgba(0,0,0,0.35)" } }} component="a" href="https://www.linkedin.com/in/doli-likomanova" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#f4ede7", bgcolor: "rgba(0,0,0,0.2)", "&:hover": { bgcolor: "rgba(0,0,0,0.35)" } }} component="a" href="https://www.instagram.com/atelier_by_doli" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
