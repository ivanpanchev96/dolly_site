import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import cover from "../assets/home_in_burgundy/cover.jpg";
import img1 from "../assets/home_in_burgundy/1.jpg";
import img2 from "../assets/home_in_burgundy/2.jpg";
import img3 from "../assets/home_in_burgundy/3.jpg";
import img4 from "../assets/home_in_burgundy/4.jpg";
import img6 from "../assets/home_in_burgundy/6.jpg";
import img7 from "../assets/home_in_burgundy/7.jpg";
import img8 from "../assets/home_in_burgundy/8.jpg";
import img9 from "../assets/home_in_burgundy/9.jpg";

const GALLERY_HEIGHT = 538;
const WIDTH_NARROW = 396;
const WIDTH_WIDE = 690;
const TOTAL_WIDTH = WIDTH_NARROW + WIDTH_WIDE;
const NARROW_RATIO = WIDTH_NARROW / TOTAL_WIDTH;
const WIDE_RATIO = WIDTH_WIDE / TOTAL_WIDTH;

const gallery = [img2, img7, img3, img8, img6, img4, img1, img9];

/* Row 1–2: wide left | narrow right. Row 3: narrow left | wide right. Row 4: wide left | narrow right. */
const ROW_LAYOUT = [
  { left: "wide", right: "narrow" },
  { left: "wide", right: "narrow" },
  { left: "narrow", right: "wide" },
  { left: "wide", right: "narrow" },
];

function GalleryImage({ src, alt }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "auto", md: GALLERY_HEIGHT },
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: "100%",
          height: { xs: "auto", md: "100%" },
          display: "block",
          objectFit: { md: "cover" },
          objectPosition: "center",
        }}
      />
    </Box>
  );
}

export default function HomeInBurgundy() {
  const rows = [];
  for (let i = 0; i < ROW_LAYOUT.length; i++) {
    rows.push([gallery[i * 2], gallery[i * 2 + 1]]);
  }

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
                  Burgundy Home
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Този двустаен апартамент е проектиран с фокус върху практичността
                  и максималното използване на пространството. Всяка зона е
                  внимателно организирана, за да осигури достатъчно съхранение.
                  Нежните бежови тонове и дървените акценти създават уютна,
                  спокойна атмосфера, а интелигентните решения за мебели и
                  гардероби позволяват на всичко да си има място.
                </Typography>
              </Stack>
              <Typography className="project-body" color="text.secondary" sx={{ pt: 2 }}>
                Предназначение: лично ползване
                <br />
                Година на проектиране: 2025г.
                <br />
                Статус: в реализация
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={cover}
              alt="Burgundy Home"
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 2 }}>
          {rows.map(([leftImg, rightImg], rowIndex) => {
            const layout = ROW_LAYOUT[rowIndex];
            const leftNarrow = layout.left === "narrow";
            const leftFlex = leftNarrow
              ? `0 1 ${(NARROW_RATIO * 100).toFixed(2)}%`
              : `0 1 ${(WIDE_RATIO * 100).toFixed(2)}%`;
            const rightFlex = leftNarrow
              ? `0 1 ${(WIDE_RATIO * 100).toFixed(2)}%`
              : `0 1 ${(NARROW_RATIO * 100).toFixed(2)}%`;

            return (
              <Box
                key={rowIndex}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  alignItems: "stretch",
                }}
              >
                <Box sx={{ flex: { xs: "1 1 auto", md: leftFlex }, minWidth: 0 }}>
                  <GalleryImage src={leftImg} alt={`Burgundy Home ${rowIndex * 2 + 1}`} />
                </Box>
                <Box sx={{ flex: { xs: "1 1 auto", md: rightFlex }, minWidth: 0 }}>
                  <GalleryImage src={rightImg} alt={`Burgundy Home ${rowIndex * 2 + 2}`} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
