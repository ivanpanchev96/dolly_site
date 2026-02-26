import { Box, Button, Container, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import etapiImg from "../assets/blog/etapi/etapi.jpg";
import blogImg1 from "../assets/blog/etapi/1.png";
import blogImg2 from "../assets/blog/etapi/2.png";
import blogImg3 from "../assets/blog/etapi/3.png";

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

export default function BlogPost1() {
  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 6, md: 8 }, pt: { xs: 4, md: 6 } }}>

        {/* Hero — image left (343×514 natural, no crop), title + intro right */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          alignItems="flex-start"
          sx={{ mb: { xs: 4, md: 5 } }}
        >
          <Box
            component="img"
            src={etapiImg}
            alt="Етапите на интериорния проект"
            sx={{
              width: { xs: "100%", md: 343 },
              height: { xs: "auto", md: 514 },
              objectFit: "fill",
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
              Етапите на интериорния проект: как протича работата от идея до реализация
            </Typography>
            <Typography sx={bodySx}>
              Всеки успешен интериорен проект минава през ясни и структурирани етапи. Добрият дизайн не е просто вдъхновение – той е процес. Ето как протича работата по един интериорен проект и кое след кое следва.
            </Typography>
          </Box>
        </Stack>

        {/* Sections — left-aligned, full hero width */}
        <Box>

          {/* Section 1 */}
          <Typography sx={sectionHeadingSx}>
            1. Първоначална среща и обсъждане на проекта — изготвяне на специфична оферта
          </Typography>
          <Typography sx={bodySx}>
            Процесът започва с първа среща, в която обсъждаме:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "типа пространство",
              "квадратурата и замерване на пространството (минимум 50 кв.м)",
              "нуждите и начина на живот",
              "бюджетна рамка",
              "срокове",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Тази среща има за цел да установим дали сме подходящи да работим заедно и дали проектът отговаря на обхвата на студиото.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            На базата на нея се изготя точна оферта за вашия проект.
          </Typography>
          <Typography sx={{ ...bodySx, mt: 1 }}>
            Цените за интериорен проект започват от 25–30 €/кв.м.
          </Typography>

          {/* Section 2 */}
          <Typography sx={sectionHeadingSx}>
            2. Изготвяне на задание
          </Typography>
          <Typography sx={bodySx}>
            След срещата клиентът попълва подробна анкета. Тя ми дава яснота за:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5 }}>
            {[
              "стилови предпочитания",
              "функционални изисквания и приоритети",
              "конкретни очаквания",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>

          {/* 1.png */}
          <Box
            component="img"
            src={blogImg1}
            alt="Идейна фаза"
            sx={{ width: "100%", height: "auto", display: "block", mt: 3 }}
          />

          {/* Section 3 */}
          <Typography sx={{ ...sectionHeadingSx, mt: 3 }}>
            3.{" "}
            <Box component="span" sx={{ fontFamily: '"Roca Two Bold", Georgia, serif', fontWeight: 400 }}>
              Идейна фаза
            </Box>
          </Typography>
          <Typography sx={bodySx}>
            Това е етапът, в който пространството започва да придобива характер. Включва:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "функционално разпределение",
              "концепция за стил и атмосфера",
              "moodboard",
              "фотореалистични 3D визуализации",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Тук се взимат най-важните решения – композиция, материали, цветове и цялостна посока.
          </Typography>

          {/* 2.png */}
          <Box
            component="img"
            src={blogImg2}
            alt="Технически проект"
            sx={{ width: "100%", height: "auto", display: "block", mt: 3 }}
          />

          {/* Section 4 */}
          <Typography sx={{ ...sectionHeadingSx, mt: 3 }}>
            4.{" "}
            <Box component="span" sx={{ fontFamily: '"Roca Two Bold", Georgia, serif', fontWeight: 400 }}>
              Технически проект
            </Box>
          </Typography>
          <Typography sx={bodySx}>
            След одобрение на концепцията преминаваме към техническата част:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "подробни чертежи",
              "разпределения",
              "електро и ВиК планове",
              "мебели по поръчка",
              "спецификация на материали и продукти",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Това е етапът, който гарантира, че идеята може да бъде изпълнена точно и без импровизации.
          </Typography>

          {/* Section 5 */}
          <Typography sx={{ ...sectionHeadingSx, mt: 3 }}>
            5.{" "}
            <Box component="span" sx={{ fontFamily: '"Roca Two Bold", Georgia, serif', fontWeight: 400 }}>
              Реализация и координация
            </Box>
          </Typography>
          <Typography sx={bodySx}>
            При необходимост съдействам с:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 1 }}>
            {[
              "комуникация с изпълнители",
              "уточнения по проекта",
              "контрол на детайлите",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>
          <Typography sx={bodySx}>
            Целта е крайният резултат да отговаря на одобрената концепция и да запази баланса между естетика и функционалност.
          </Typography>

          {/* 3.png */}
          <Box
            component="img"
            src={blogImg3}
            alt="Резултат"
            sx={{ width: "100%", height: "auto", display: "block", mt: 3 }}
          />

          {/* Closing — Poppins Bold 20px, left aligned */}
          <Typography
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: 1,
              letterSpacing: 0,
              color: "text.primary",
              mt: 4,
              textAlign: "left",
            }}
          >
            Защо целият процес е важен?
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 1.5 }}>
            {[
              "Спестяваш пари, защото грешките са планирани предварително",
              "Получаваш ясна визия преди да стартира ремонтът",
              "Работата е структурирана и предсказуема",
              "Крайният резултат отговаря на твоите очаквания",
            ].map((item) => (
              <Box component="li" key={item} sx={bulletSx}>{item}</Box>
            ))}
          </Box>

          {/* CTA */}
          <Button
            component="a"
            href="mailto:likomanovadoli@gmail.com"
            variant="contained"
            sx={{
              mt: 4,
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
