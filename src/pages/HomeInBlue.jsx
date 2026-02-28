import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ProjectNav from "../components/ProjectNav.jsx";
import cover from "../assets/home_in_blue/cover blue project.jpg";
import img1 from "../assets/home_in_blue/1.jpg";
import img2 from "../assets/home_in_blue/2.jpg";
import img3 from "../assets/home_in_blue/3.jpg";
import img4 from "../assets/home_in_blue/4.jpg";
import img5 from "../assets/home_in_blue/5.jpg";
import img11 from "../assets/home_in_blue/11.jpg";
import img13 from "../assets/home_in_blue/13.jpg";
import img14 from "../assets/home_in_blue/14.jpg";
import img15 from "../assets/home_in_blue/15.jpg";
import img16 from "../assets/home_in_blue/16.jpg";
import img17 from "../assets/home_in_blue/17.jpg";
import img18 from "../assets/home_in_blue/18.jpg";
import img21 from "../assets/home_in_blue/21.jpg";

const GALLERY_HEIGHT = 514;
const WIDTH_WIDE = 771;
const WIDTH_NARROW = 343;
const TOTAL_2 = WIDTH_WIDE + WIDTH_NARROW;
const WIDE_RATIO = WIDTH_WIDE / TOTAL_2;
const NARROW_RATIO = WIDTH_NARROW / TOTAL_2;
const NARROW_3_RATIO = 1 / 3;

/* 5 rows of wide+narrow, 1 final row of 3 narrow */
const ROW_CONFIG = [
  { count: 2, left: "wide", right: "narrow" },
  { count: 2, left: "narrow", right: "wide" },
  { count: 2, left: "wide", right: "narrow" },
  { count: 2, left: "narrow", right: "wide" },
  { count: 2, left: "wide", right: "narrow" },
  { count: 3 },
];

const gallery = [img2, img15, img14, img3, img4, img16, img17, img1, img5, img18, img13, img21, img11];

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

export default function HomeInBlue() {
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
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Stack height="100%" justifyContent="space-between">
              <Stack spacing={2}>
                <Typography
                  className="section-heading section-heading--bold"
                  sx={{ color: "text.primary", textAlign: "left" }}
                >
                  Home in Blue
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Апартамент под наем, проектиран с мисъл за баланс между визия и бюджет.
                  Синият акцент създава спокойно усещане, а повтарящите се елементи дават
                  цялост и ред в пространството.
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Проект с фокус върху атрактивна визия, лесна поддръжка и дълготрайно
                  усещане за дом.
                </Typography>
              </Stack>
              <Typography className="project-body" color="text.secondary" sx={{ pt: 2 }}>
                Предназначение: Отдаване под наем
                <br />
                Година на реализация: 2025г.
                <br />
                Статус: Реализиран проджект мениджмънт
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={cover}
              alt="Home in Blue"
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
                      <GalleryImage src={src} alt={`Home in Blue ${startIdx + i + 1}`} />
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
                  <GalleryImage src={leftImg} alt={`Home in Blue ${startIdx + 1}`} />
                </Box>
                <Box sx={{ flex: { xs: "1 1 auto", md: rightFlex }, minWidth: 0 }}>
                  <GalleryImage src={rightImg} alt={`Home in Blue ${startIdx + 2}`} />
                </Box>
              </Box>
            );
          })}
        </Box>

        <ProjectNav currentPath="/projects/home-in-blue" />
      </Container>
    </Box>
  );
}
