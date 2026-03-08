import { Box, Button, Container, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import blogNewImg from "../assets/blog/price/blognew1.jpg";

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

const checkSx = {
  ...bodySx,
  mt: 1.5,
};

export default function BlogPost3() {
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
            src={blogNewImg}
            alt="Колко струва един интериорен проект в София през 2026"
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
              Колко струва един интериорен проект в София през 2026?
            </Typography>
            <Typography sx={bodySx}>
              „Колко ще ми излезе?" Това е първият въпрос, който получавам. И е напълно логичен.
            </Typography>
            <Typography sx={{ ...bodySx, mt: 1.5 }}>
              През 2026 темата е още по-актуална – цените на имотите в София растат, строителството е активно, а хората искат домът им да изглежда завършен, а не „направен някак си".
            </Typography>
            <Typography sx={{ ...bodySx, mt: 1.5 }}>
              В тази статия ще ти дам реална рамка – какви са цените, от какво зависят и за какво всъщност плащаш, когато наемеш интериорен дизайнер.
            </Typography>
          </Box>
        </Stack>

        {/* Body sections */}
        <Box>

          {/* Средна цена */}
          <Typography sx={sectionHeadingSx}>
            Средна цена за интериорен проект в София през 2026
          </Typography>
          <Typography sx={bodySx}>
            В момента цените на пазара варират между:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "40–90+ евро/кв.м за цялостен интериорен проект",
              "по-ниски стойности при базови пакети",
              "по-високи при комплексни имоти, луксозни изпълнения и пълен мениджмънт",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Важно: цената почти винаги се обявява „от", защото няма два еднакви апартамента.
          </Typography>

          {/* Защо аз не работя на цена на квадратен метър? */}
          <Typography sx={{ ...sectionHeadingSx, mt: 4 }}>
            Защо аз не работя на цена на квадратен метър?
          </Typography>
          <Typography sx={bodySx}>
            Да, на пазара повечето студиа обявяват цена „на кв.м". И това изглежда удобно. Но реално не е честно.
          </Typography>

          <Typography sx={{ ...bodySx, fontWeight: 600, mt: 2 }}>
            Квадратурата не показва сложността
          </Typography>
          <Typography sx={bodySx}>
            60 кв.м отворен хол ≠ 60 кв.м апартамент с:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {["спалня", "баня", "коридор", "кухня", "склад"].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Работата като обем е напълно различна.
          </Typography>

          <Typography sx={{ ...bodySx, fontWeight: 600, mt: 2 }}>
            Не всички помещения изискват еднакъв ресурс
          </Typography>
          <Typography sx={bodySx}>
            Баня и кухня изискват:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "много повече чертежи",
              "повече координация",
              "повече технически детайли",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Спалня с гардероб не изисква същото. Цена на квадрат не отчита това.
          </Typography>

          {/* Как аз определям цената? */}
          <Typography sx={{ ...sectionHeadingSx, mt: 4 }}>
            Как аз определям цената?
          </Typography>
          <Typography sx={bodySx}>
            Работя според:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "брой помещения",
              "функционална сложност",
              "нужда от преразпределение",
              "ниво на детайлност",
              "обхват на услугата",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Така клиентът плаща за реалната работа, а не за математическа сметка.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Затова и моите оферти са персонализирани след попълване на формуляр и консултация, за да съм максимално конкретна и честна спрямо вас.
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

          {/* За какво всъщност плащаш? */}
          <Typography sx={{ ...sectionHeadingSx, mt: 4 }}>
            За какво всъщност плащаш?
          </Typography>
          <Typography sx={bodySx}>
            Не плащаш „за картинки".
          </Typography>
          <Typography sx={bodySx}>
            Плащаш за:
          </Typography>

          <Typography sx={checkSx}>
            <Box component="span" sx={{ fontWeight: 600 }}>✔ Експертиза</Box>
          </Typography>
          <Typography sx={bodySx}>
            Функционалност, правилни отстояния, логика, координация между електро, ВиК и мебели.
          </Typography>

          <Typography sx={checkSx}>
            <Box component="span" sx={{ fontWeight: 600 }}>✔ Контрол върху бюджета</Box>
          </Typography>
          <Typography sx={bodySx}>
            Проектът ти дава ясна представа колко ще струва целият ремонт, преди да си започнал.
          </Typography>

          <Typography sx={checkSx}>
            <Box component="span" sx={{ fontWeight: 600 }}>✔ Спестено време</Box>
          </Typography>
          <Typography sx={bodySx}>
            Без хаотично обикаляне, без грешни покупки, без двойни разходи.
          </Typography>

          <Typography sx={checkSx}>
            <Box component="span" sx={{ fontWeight: 600 }}>✔ Подбрани партньори</Box>
          </Typography>
          <Typography sx={bodySx}>
            Работа с доказани изпълнители и доставчици, което намалява риска от скъпи грешки.
          </Typography>

          {/* Колко реално е скъп един проект? */}
          <Typography sx={{ ...sectionHeadingSx, mt: 4 }}>
            Колко реално е скъп един проект?
          </Typography>
          <Typography sx={bodySx}>
            Проект е малък процент от инвестицията. Той често е под 2% от стойността му. А влияе на 100% от крайния резултат.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Проектът не е разход. Той е защита на голяма инвестиция.
          </Typography>

          {/* Closing */}
          <Typography
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: 1,
              color: "text.primary",
              mt: 4,
              textAlign: "left",
            }}
          >
            Въпросът не е „колко е на квадрат", а:
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1.5 }}>
            Колко яснота и контрол искаш по време на целия процес?
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Ако ти предстои ремонт и искаш структура, бюджет и спокойствие:
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Виж услугите и начина ми на работа
          </Typography>

          {/* Услуги button */}
          <Box sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/services"
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
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
              Услуги
            </Button>
          </Box>

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
            , където обяснявам за работния процес
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
