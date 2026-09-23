import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ProjectNav from "../components/ProjectNav.jsx";
import hero from "../assets/home_in_sage/home_in_sage.png";
import livingRoom from "../assets/home_in_sage/living-room.png";
import kitchen from "../assets/home_in_sage/kitchen.png";
import sofa from "../assets/home_in_sage/sofa.png";
import reading from "../assets/home_in_sage/reading.png";
import closet from "../assets/home_in_sage/closet.png";
import bedroom from "../assets/home_in_sage/bedroom.png";
import desk from "../assets/home_in_sage/desk.png";
import wc from "../assets/home_in_sage/wc.png";

const gallery = [
  livingRoom,
  kitchen,
  sofa,
  reading,
  closet,
  bedroom,
  desk,
  wc,
];

/* Descriptions of each gallery image, in the same order. */
const galleryAlt = [
  "Дневна с трапезария, сив диван с дървена рамка и рибена кост паркет",
  "Г-образна кухня с орехови горни шкафове и каменен гръб",
  "Зона с телевизор и отворен стелаж с растения",
  "Кът за четене с вградена пейка и зелена възглавница пред прозореца",
  "Дрешник с отворени рафтове, огледало и тапицирана табуретка",
  "Спалня с маслиненозелена стена и дървено легло",
  "Детска стая със зелена тапицирана табла, бюро и рафтове с книги",
  "Тоалетна със зелени релефни плочки и мивка върху дървен рафт",
];

export default function HomeInSage() {
  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <Stack height="100%" justifyContent="space-between">
              <Stack spacing={2}>
                <Typography component="h1" className="section-heading section-heading--bold" sx={{ color: "text.primary", textAlign: "left" }}>
                  Home in Sage
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Проект за дом на млада двойка, която обича да прекарва време
                  вкъщи. Меките, топли тонове и нюансите на зеленото създават
                  спокойна атмосфера, подходяща за четене, почивка и домашно кино.
                </Typography>
                <Typography className="project-body" color="text.secondary">
                  Цялостната идея е пространствата да бъдат обединени чрез цвят,
                  материали, форми и последователни решения. Интериорът е
                  проектиран да се усеща уютно, без да губи функционалността си.
                </Typography>
              </Stack>
              <Typography className="project-body" color="text.secondary" sx={{ pt: 2 }}>
                Предназначение: лично ползване
                <br />
                Година на проектиране: 2025г.
                <br />
                Статус: проект
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src={hero}
              alt="Дневна в Home in Sage с телевизор, отворен стелаж и маслиненозелена стена"
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: { xs: 2, md: 4 } }}>
          {gallery.map((image, index) => (
            <Grid item xs={12} sm={6} key={image}>
              <Box
                component="img"
                src={image}
                alt={galleryAlt[index]}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Grid>
          ))}
        </Grid>

        <ProjectNav currentPath="/projects/home-in-sage" />
      </Container>
    </Box>
  );
}
