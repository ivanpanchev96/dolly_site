import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import cover from "../assets/studio/cover.jpg";
import img1 from "../assets/studio/1.jpg";
import img2 from "../assets/studio/2.jpg";
import img3 from "../assets/studio/3.jpg";
import img1_1 from "../assets/studio/1 (1).jpg";
import img2_1 from "../assets/studio/2 (1).jpg";
import plan from "../assets/studio/plan.png";

const GALLERY_HEIGHT = 491;
const WIDTH_NARROW = 396;
const WIDTH_WIDE = 690;
const TOTAL_WIDTH = WIDTH_NARROW + WIDTH_WIDE;
const NARROW_RATIO = WIDTH_NARROW / TOTAL_WIDTH;
const WIDE_RATIO = WIDTH_WIDE / TOTAL_WIDTH;

const gallery = [img1, img2_1, img1_1, img2, img3, plan];

/* Row 1: wide left | narrow right. Row 2: narrow left | wide right. Row 3: wide left | narrow right. */
const ROW_LAYOUT = [
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

export default function Studio245() {
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
                  Studio 24,5
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Студио с фокус върху максимална функционалност и комфорт.
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Нежното шалфеено зелено и топлите дървени акценти обединяват
                  пространството и ясно разделят зоните за различни дейности.
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Компактно, но добре организирано - с място за всичко, без
                  излишни решения.
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Бюджетно, стилно и практично интериорно решение, подходящо
                  както за краткосрочен, така и за дългосрочен наем.
                </Typography>
              </Stack>
              <Typography className="project-body" color="text.secondary" sx={{ pt: 2 }}>
                Предназначение: За наем
                <br />
                Година на проектиране: 2025г.
                <br />
                Статус: Проект
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={cover}
              alt="Studio 24,5"
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
                  <GalleryImage src={leftImg} alt={`Studio 24,5 ${rowIndex * 2 + 1}`} />
                </Box>
                <Box sx={{ flex: { xs: "1 1 auto", md: rightFlex }, minWidth: 0 }}>
                  <GalleryImage src={rightImg} alt={`Studio 24,5 ${rowIndex * 2 + 2}`} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
