import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import cover from "../assets/mountain_home/cover.jpg";
import img1 from "../assets/mountain_home/1.jpg";
import img2 from "../assets/mountain_home/2.jpg";
import img3 from "../assets/mountain_home/3.jpg";
import img4 from "../assets/mountain_home/4.jpg";
import img5 from "../assets/mountain_home/5.jpg";
import img6 from "../assets/mountain_home/6.jpg";
import img7 from "../assets/mountain_home/7.jpg";
import img8 from "../assets/mountain_home/8.jpg";

/** Cover image for the top section; gallery below is 553×691, two per row. */
const GALLERY_HEIGHT = 691;

const gallery = [img3, img4, img6, img5, img2, img1, img7, img8];

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

export default function MountainHome() {
  const rows = [];
  for (let i = 0; i < gallery.length; i += 2) {
    rows.push(gallery.slice(i, i + 2));
  }

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
                Mountain Home
              </Typography>
              <Typography color="text.secondary">
                Уютна вила в планината, в която модерният дизайн е балансиран с
                естествени дървени елементи.
              </Typography>
              <Typography color="text.secondary">
                Прилаганото разпределение на пространството осигурява
                функционалност, без да нарушава усещането за спокойствие и
                топлина.
              </Typography>
              <Typography color="text.secondary">
                Интериор, създаден да се усеща естествено и ненатрапчиво - място
                за почивка, тишина и откъсване от градския ритъм.
              </Typography>
              <Typography color="text.secondary">
                Предназначение: лично ползване-семейно
                <br />
                Година на проектиране: 2020г.
                <br />
                Статус: Реализиран
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={cover}
              alt="Mountain Home"
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 2 }}>
          {rows.map((rowImages, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                alignItems: "stretch",
              }}
            >
              {rowImages.map((src, colIndex) => (
                <GalleryImage
                  key={colIndex}
                  src={src}
                  alt={`Mountain Home ${rowIndex * 2 + colIndex + 1}`}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
