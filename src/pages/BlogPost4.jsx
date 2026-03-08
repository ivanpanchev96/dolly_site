import { Box, Button, Container, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import lightCover from "../assets/blog/osvetlenie/light_cover.jpg";
import lightLong from "../assets/blog/osvetlenie/light_long.png";

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

export default function BlogPost4() {
  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 6, md: 8 }, pt: { xs: 4, md: 6 } }}>

        {/* Hero — image left, title + intro right */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          alignItems="flex-start"
          sx={{ mb: { xs: 4, md: 5 } }}
        >
          <Box
            component="img"
            src={lightCover}
            alt="Осветление в интериора"
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
              Осветление в интериора: защо една лампа не е достатъчна
            </Typography>
            <Typography sx={bodySx}>
              В много домове осветлението се свежда до едно нещо: централна лампа на тавана.
            </Typography>
            <Typography sx={{ ...bodySx, mt: 1 }}>
              Тя се включва, когато влезеш в стаята, и това е всичко.
            </Typography>
            <Typography sx={{ ...bodySx, mt: 1 }}>
              Но реално това е един от най-честите проблеми в интериора – както визуално, така и функционално.
            </Typography>
          </Box>
        </Stack>

        {/* Body sections */}
        <Box>

          {/* Защо една лампа не е достатъчна */}
          <Typography sx={sectionHeadingSx}>
            Защо една лампа не е достатъчна
          </Typography>
          <Typography sx={bodySx}>
            Един единствен източник на светлина отгоре създава плоско и неравномерно осветление.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Какво се случва на практика:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "центърът на стаята е силно осветен",
              "ъглите остават тъмни",
              "мебелите хвърлят остри сенки",
              "пространството изглежда по-малко уютно",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Резултатът е интериор, който изглежда недовършен, дори когато мебелите са хубави.
          </Typography>

          {/* Inline image — light_long.png */}
          <Box
            component="img"
            src={lightLong}
            alt="Осветление примери"
            sx={{ width: "100%", height: "auto", display: "block", mt: 3 }}
          />

          {/* Осветлението не е само за да виждаме */}
          <Typography sx={{ ...sectionHeadingSx, mt: 4 }}>
            Осветлението не е само за да виждаме
          </Typography>
          <Typography sx={bodySx}>
            Светлината има огромно влияние върху това как се чувстваме в пространството.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Нашето тяло е свързано с т.н. циркаден ритъм – естественият цикъл на светлина и тъмнина, който регулира енергията, концентрацията и съня.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            През деня естествената светлина идва от различни посоки, променя се и създава различна атмосфера.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Една силна лампа от тавана не имитира този естествен модел и често създава по-изкуствена и уморяваща среда.
          </Typography>

          {/* Как проектирам осветлението? */}
          <Typography sx={{ ...sectionHeadingSx, mt: 4 }}>
            Как проектирам осветлението?
          </Typography>
          <Typography sx={bodySx}>
            В интериорния дизайн светлината се планира на няколко слоя.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Обикновено те включват:
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1.5 }}>
            <Box component="span" sx={{ fontWeight: 600 }}>Основно осветление</Box> – Общата светлина, която осветява стаята.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            <Box component="span" sx={{ fontWeight: 600 }}>Функционално осветление</Box> – Лампи за конкретни дейности – четене, готвене, работа.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            <Box component="span" sx={{ fontWeight: 600 }}>Акцентно осветление</Box> – Светлина, която подчертава текстури, картини и др.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1.5 }}>
            Комбинацията от тези слоеве създава по-естествена, балансирана и приятна среда.
          </Typography>

          {/* Closing */}
          <Typography sx={{ ...bodySx, mt: 4 }}>
            Ако в една стая имате само една лампа на тавана, почти сигурно осветлението не е достатъчно добре планирано.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Осветлението е основополагащо за добър интериор и то се планира внимателно още в идеен етап от проекта.
          </Typography>

          <Typography sx={{ ...bodySx, mt: 3 }}>
            Ако искате да проектираме вашият мечтан дом, направете запитване.
          </Typography>

          {/* CTA — Направи запитване */}
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
            Последвай ме в{" "}
            <Box
              component="a"
              href="https://www.instagram.com/atelier_by_doli"
              target="_blank"
              rel="noreferrer"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              Instagram
            </Box>
            , където обяснявам за изкуството на осветлението.
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
