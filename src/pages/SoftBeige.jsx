import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ProjectNav from "../components/ProjectNav.jsx";
import cover from "../assets/home_in_beige/cover.jpg";
import img1 from "../assets/home_in_beige/1.jpg";
import img2 from "../assets/home_in_beige/2.jpg";
import img3 from "../assets/home_in_beige/3.jpg";
import img4 from "../assets/home_in_beige/4.jpg";
import img5 from "../assets/home_in_beige/5.jpg";
import img6 from "../assets/home_in_beige/6.jpg";

const ROW_HEIGHT = 425;

const rows = [
  { left: img1, right: img2, leftPct: "55%", rightPct: "45%" },
  { left: img3, right: img4, leftPct: "40%", rightPct: "60%" },
  { left: img5, right: img6, leftPct: "50%", rightPct: "50%" },
];

export default function SoftBeige() {
  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 }, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Stack height="100%" justifyContent="space-between">
              <Stack spacing={2}>
                <Typography
                  className="section-heading section-heading--bold"
                  sx={{ color: "text.primary", textAlign: "left" }}
                >
                  Soft Beige
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Този двустаен апартамент е проектиран с фокус върху практичността и максималното използване на пространството. Всяка зона е внимателно организирана, за да осигури достатъчно място за съхранение.
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Нежните бежови тонове и дървените акценти създават уютна, спокойна атмосфера, а интелигентните решения за мебели и гардероби позволяват всичко да има своето място.
                </Typography>
              </Stack>
              <Typography className="project-body" color="text.secondary" sx={{ pt: 2 }}>
                Предназначение: Лично ползване
                <br />
                Година на проектиране: 2025г.
                <br />
                Статус: В реализация
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={cover}
              alt="Soft Beige"
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 2 }}>
          {rows.map((row, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                height: { md: ROW_HEIGHT },
              }}
            >
              <Box sx={{ flex: { xs: "1 1 auto", md: `0 0 calc(${row.leftPct} - 8px)` }, minWidth: 0, overflow: "hidden" }}>
                <Box
                  component="img"
                  src={row.left}
                  alt={`Soft Beige ${i * 2 + 1}`}
                  sx={{
                    width: "100%",
                    height: { xs: "auto", md: "100%" },
                    display: "block",
                    objectFit: { md: "cover" },
                    objectPosition: "center",
                  }}
                />
              </Box>
              <Box sx={{ flex: { xs: "1 1 auto", md: 1 }, minWidth: 0, overflow: "hidden" }}>
                <Box
                  component="img"
                  src={row.right}
                  alt={`Soft Beige ${i * 2 + 2}`}
                  sx={{
                    width: "100%",
                    height: { xs: "auto", md: "100%" },
                    display: "block",
                    objectFit: { md: "cover" },
                    objectPosition: "center",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <ProjectNav currentPath="/projects/soft-beige" />
      </Container>
    </Box>
  );
}
