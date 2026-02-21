import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import cover from "../assets/home_in_pastel/cover.jpg";
import img1 from "../assets/home_in_pastel/1.jpg";
import img2 from "../assets/home_in_pastel/2.jpg";
import img3 from "../assets/home_in_pastel/3.jpg";
import img4 from "../assets/home_in_pastel/4.jpg";
import img5 from "../assets/home_in_pastel/5.jpg";
import img6 from "../assets/home_in_pastel/6.jpg";
import img7 from "../assets/home_in_pastel/7.jpg";
import img8 from "../assets/home_in_pastel/8.jpg";
import img9 from "../assets/home_in_pastel/9.jpg";
import img10 from "../assets/home_in_pastel/10.jpg";
import img11 from "../assets/home_in_pastel/11.jpg";
import img12 from "../assets/home_in_pastel/12.jpg";
import img1_1 from "../assets/home_in_pastel/1 (1).jpg";
import img2_1 from "../assets/home_in_pastel/2 (1).jpg";
import img3_1 from "../assets/home_in_pastel/3 (1).jpg";
import img4_1 from "../assets/home_in_pastel/4 (1).jpg";
import img5_1 from "../assets/home_in_pastel/5 (1).jpg";
import img6_1 from "../assets/home_in_pastel/6 (1).jpg";

const GALLERY_HEIGHT = 513;
const WIDTH_WIDE = 770;
const WIDTH_NARROW = 335;
const TOTAL_2 = WIDTH_WIDE + WIDTH_NARROW;
const WIDE_RATIO = WIDTH_WIDE / TOTAL_2;
const NARROW_RATIO = WIDTH_NARROW / TOTAL_2;
const NARROW_3_RATIO = 1 / 3;

const gallery = [
  img1,
  img1_1,
  img2_1,
  img2,
  img3,
  img3_1,
  img4_1,
  img4,
  img5,
  img5_1,
  img7,
  img8,
  img6_1,
  img10,
  img6,
  img9,
  img12,
  img11,
];

/* Rows 1–5, 7: 2 photos (wide 770px | narrow 335px). Rows 6, 8: 3 photos (all 335px). */
const ROW_CONFIG = [
  { count: 2, left: "wide", right: "narrow" },
  { count: 2, left: "narrow", right: "wide" },
  { count: 2, left: "wide", right: "narrow" },
  { count: 2, left: "narrow", right: "wide" },
  { count: 2, left: "wide", right: "narrow" },
  { count: 3 },
  { count: 2, left: "narrow", right: "wide" },
  { count: 3 },
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
          objectFit: { xs: "none", md: "cover" },
          objectPosition: "center",
        }}
      />
    </Box>
  );
}

export default function HomeInPastel() {
  let imgIndex = 0;
  const rows = ROW_CONFIG.map((config) => {
    const imgs = gallery.slice(imgIndex, imgIndex + config.count);
    const startIdx = imgIndex;
    imgIndex += config.count;
    return { config, imgs, startIdx };
  });

  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 }, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Typography
                className="section-heading"
                sx={{ color: "text.primary", textAlign: "left" }}
              >
                Home in Pastel
              </Typography>
              <Typography color="text.secondary" variant="subtitle2">
                ТРИСТАЕН АПАРТАМЕНТ В ЦЕНТЪРА НА СОФИЯ
              </Typography>
              <Typography color="text.secondary">
                Семейство, завръщащо се в България след престой в чужбина, желае
                уютен и комфортен дом, пригоден към нуждите на всеки член на
                семейството. Целта на проекта е да създаде функционален и
                естетичен интериор за всички.
              </Typography>
              <Typography color="text.secondary">
                Типология: Апартамент
                <br />
                Площ: 75кв.м.
                <br />
                Година: 2021г.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={cover}
              alt="Home in Pastel"
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 2 }}>
          {rows.map(({ config, imgs, startIdx }, rowIndex) => {
            if (config.count === 3) {
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
                  {imgs.map((src, i) => (
                    <Box
                      key={i}
                      sx={{
                        flex: { xs: "1 1 auto", md: `0 1 ${(NARROW_3_RATIO * 100).toFixed(2)}%` },
                        minWidth: 0,
                      }}
                    >
                      <GalleryImage
                        src={src}
                        alt={`Home in Pastel ${startIdx + i + 1}`}
                      />
                    </Box>
                  ))}
                </Box>
              );
            }
            const [leftImg, rightImg] = imgs;
            const leftNarrow = config.left === "narrow";
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
                  <GalleryImage src={leftImg} alt={`Home in Pastel ${startIdx + 1}`} />
                </Box>
                <Box sx={{ flex: { xs: "1 1 auto", md: rightFlex }, minWidth: 0 }}>
                  <GalleryImage src={rightImg} alt={`Home in Pastel ${startIdx + 2}`} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
