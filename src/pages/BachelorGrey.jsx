import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import cover from "../assets/bachelor_grey/cover.jpg";
import img1 from "../assets/bachelor_grey/1.jpg";
import img2 from "../assets/bachelor_grey/2.jpg";
import img3 from "../assets/bachelor_grey/3.jpg";
import img4 from "../assets/bachelor_grey/4.jpg";
import img5 from "../assets/bachelor_grey/5.jpg";
import img6 from "../assets/bachelor_grey/6.jpg";
import img7 from "../assets/bachelor_grey/7.jpg";
import img8 from "../assets/bachelor_grey/8.jpg";

const GALLERY_HEIGHT = 492;
const ROW1_3_LEFT = 530;
const ROW1_3_RIGHT = 577;
const ROW4_LEFT = 709;
const ROW4_RIGHT = 394;

const gallery = [img1, img6, img2, img4, img3, img5, img7, img8];

/* Rows 1–3: left 530px, right 577px. Row 4: left 709px, right 394px. */
const ROW_LAYOUT = [
  { left: ROW1_3_LEFT, right: ROW1_3_RIGHT },
  { left: ROW1_3_LEFT, right: ROW1_3_RIGHT },
  { left: ROW1_3_LEFT, right: ROW1_3_RIGHT },
  { left: ROW4_LEFT, right: ROW4_RIGHT },
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

export default function BachelorGrey() {
  const rows = [];
  for (let i = 0; i < ROW_LAYOUT.length; i++) {
    rows.push([gallery[i * 2], gallery[i * 2 + 1]]);
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
                Bachelor Grey
              </Typography>
              <Typography color="text.secondary">
                Апартамент, проектиран за мъж с предпочитание към изчистен и
                функционален интериор.
              </Typography>
              <Typography color="text.secondary">
                Сивата гама създава спокойна и подредена атмосфера, без излишни
                акценти.
              </Typography>
              <Typography color="text.secondary">
                Практични решения, които извличат максимум от пространството.
              </Typography>
              <Typography color="text.secondary">
                Предназначение: Лично ползване
                <br />
                Година на проектиране: 2022г.
                <br />
                Статус: Проект
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={cover}
              alt="Bachelor Grey"
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
            const total = layout.left + layout.right;
            const leftFlex = `0 1 ${((layout.left / total) * 100).toFixed(2)}%`;
            const rightFlex = `0 1 ${((layout.right / total) * 100).toFixed(2)}%`;
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
                  <GalleryImage src={leftImg} alt={`Bachelor Grey ${rowIndex * 2 + 1}`} />
                </Box>
                <Box sx={{ flex: { xs: "1 1 auto", md: rightFlex }, minWidth: 0 }}>
                  <GalleryImage src={rightImg} alt={`Bachelor Grey ${rowIndex * 2 + 2}`} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
