import { Box, Button, Container, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import kitchenImg from "../assets/home_in_blue/18.jpg";
import kitchenTriangle from "../assets/blog/kuhnya/kitchen-triangle.png";

const sectionHeadingSx = {
  fontFamily: '"Roca Two Bold", Georgia, serif',
  fontSize: "1.15rem",
  fontWeight: 400,
  color: "text.primary",
  mb: 1,
  mt: 3,
};

const bodySx = {
  color: "text.secondary",
  fontFamily: '"Poppins", sans-serif',
  fontSize: "1.15rem",
  lineHeight: 1.7,
};

const bulletSx = {
  ...bodySx,
  display: "list-item",
  ml: 2,
};

export default function BlogPost2() {
  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 6, md: 8 }, pt: { xs: 4, md: 6 } }}>

        {/* Hero — image left (343×514), title + intro right */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          alignItems="flex-start"
          sx={{ mb: { xs: 4, md: 5 } }}
        >
          <Box
            component="img"
            src={kitchenImg}
            alt="Как да направиш кухнята функционална"
            sx={{
              width: { xs: "100%", md: 343 },
              height: { xs: "auto", md: 514 },
              objectFit: "cover",
              objectPosition: "center top",
              flexShrink: 0,
              display: "block",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <Typography
              sx={{
                fontFamily: '"Roca Two Bold", Georgia, serif',
                fontSize: { xs: "clamp(20px, 4vw, 32px)", md: "clamp(32px, 3.5vw, 52px)" },
                fontWeight: 400,
                color: "#E1DFDB",
                lineHeight: 1.2,
                mb: 2.5,
              }}
            >
              Как да направиш кухнята не само красива, но и функционална
            </Typography>
            <Typography sx={bodySx}>
              Искаш кухнята ти да бъде не само красива, но и удобна за ползване? Правилото на триъгълника в интериорния дизайн е малък трик, който може да промени начина, по който се движиш в кухнята. То гарантира, че всичко важно е под ръка, без да се чувства претрупано.
            </Typography>
          </Box>
        </Stack>

        {/* Body sections */}
        <Box>

          {/* Section: Какво е правилото на триъгълника */}
          <Typography sx={sectionHeadingSx}>
            Какво е правилото на триъгълника в кухнята?
          </Typography>
          <Typography sx={bodySx}>
            Правилото на триъгълника се прилага чрез три основни точки в кухнята: хладилник, мивка и готварска печка. Тези три елемента образуват „триъгълник на движението", който осигурява комфорт и ефективност при работа.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Разстоянието между всяка точка не трябва да е нито твърде малко, нито твърде голямо – около 60см между тях е оптимално.
          </Typography>

          <Box
            component="img"
            src={kitchenTriangle}
            alt="Правилото на триъгълника в кухнята"
            sx={{ width: "100%", height: "auto", display: "block", mt: 3 }}
          />

          {/* Section: Защо работи? */}
          <Typography sx={sectionHeadingSx}>
            Защо работи?
          </Typography>
          <Box component="ol" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            <Box component="li" sx={bulletSx}>
              <Box component="span" sx={{ fontFamily: '"Roca Two Bold", Georgia, serif' }}>Функционалност:</Box>{" "}
              Минимизира ненужните движения, докато готвиш.
            </Box>
            <Box component="li" sx={bulletSx}>
              <Box component="span" sx={{ fontFamily: '"Roca Two Bold", Georgia, serif' }}>Баланс:</Box>{" "}
              Визуално и практически разпределя кухнята.
            </Box>
            <Box component="li" sx={bulletSx}>
              <Box component="span" sx={{ fontFamily: '"Roca Two Bold", Georgia, serif' }}>Лесна организация:</Box>{" "}
              Всеки елемент е на мястото си и пространството изглежда чисто и подредено.
            </Box>
          </Box>

          {/* Section: Примери от реални кухни */}
          <Typography sx={{ ...sectionHeadingSx, mt: 3 }}>
            Примери от реални кухни
          </Typography>
          <Typography sx={bodySx}>
            В моите проекти винаги прилагам правилото на триъгълника, за да създам кухни, които работят без усилие. Клиентите забелязват разликата още първия ден – всичко е лесно достъпно, а пространството остава визуално приятно и подредено.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            <Box
              component={Link}
              to="/projects"
              sx={{ color: "inherit", textDecoration: "underline" }}
            >
              Разгледай проектите тук.
            </Box>
          </Typography>

          {/* Closing paragraph */}
          <Typography sx={{ ...bodySx, mt: 3 }}>
            Правилото на триъгълника е ключът към функционална и красива кухня. Малки промени в разположението на уреди и елементи могат да направят готвенето по-лесно и приятно.
          </Typography>

          {/* CTA */}
          <Typography sx={{ ...bodySx, mt: 3 }}>
            Искаш ли да проектираме перфектната кухня за теб?
          </Typography>
          <Typography sx={bodySx}>
            <Box
              component="a"
              href="mailto:likomanovadoli@gmail.com"
              sx={{ color: "inherit", textDecoration: "underline" }}
            >
              Запази консултация сега
            </Box>
            {" "}и ще а създадем перфектното кухненско пространство за теб.
          </Typography>

          <Button
            component="a"
            href="https://form.jotform.com/241855833689372"
            target="_blank"
            rel="noreferrer"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#6d5144",
              color: "#f4ede7",
              px: 3,
              py: 1.2,
              borderRadius: "6px",
              textTransform: "none",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "1rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              "&:hover": { bgcolor: "#5a4539" },
            }}
          >
            Направи запитване
          </Button>

          {/* Instagram */}
          <Typography sx={{ ...bodySx, mt: 3 }}>
            Виж краткото видео в{" "}
            <Box
              component="a"
              href="https://www.instagram.com/atelier_by_doli"
              target="_blank"
              rel="noreferrer"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              Instagram
            </Box>
            , където обяснявам за работния триъгълник
          </Typography>
          <Box
            component="a"
            href="https://www.instagram.com/atelier_by_doli"
            target="_blank"
            rel="noreferrer"
            sx={{ display: "inline-block", mt: 1.5, color: "text.secondary", "&:hover": { color: "text.primary" } }}
          >
            <InstagramIcon sx={{ fontSize: 40 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
