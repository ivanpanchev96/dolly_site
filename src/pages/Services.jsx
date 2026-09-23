import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import designStagesImage from "../assets/services/bailey-services.jpg";
import { faqItems, INQUIRY_LINK_MARKER } from "../data/faq.js";

const basicItems = [
  "Консултация с интериорен дизайнер",
  "Точно замерване на помещенията",
  "Функционално разпределение/2D разпределения (до 3 варианта)",
  "Триизмерно обемно-пространствено решение с 3D модел",
  "Изготвяне на Mood Board с материали, цветове, мебели",
  "3D визуализации (до 2 цветови корекции)",
  "Базова бюджетна таблица с готови мебели и осв. тела",
];

const standardItems = [
  "Консултация с интериорен дизайнер",
  "Точно замерване на помещенията",
  "Функционално разпределение/2D разпределения (до 3 варианта)",
  "Триизмерно обемно-пространствено решение с 3D модел",
  "Изготвяне на Mood Board с материали, цветове, мебели",
  "3D визуализации (до 2 цветови корекции)",
  "Изготвяне на пълен набор с чертежи и спецификации по всички специалности",
  "Чертежи на мебели по поръчка",
  "Количествени сметки и оферти - оптимизиране на бюджета и предложения от изпълнители",
  "Отстъпки от партньори и доверени доставчици",
];

const consultationItems = [
  "Обсъждаме вашите нужди и предпочитания",
  "Давам конкретни насоки и решения",
  "Посещение на обект",
];

const authorItems = [
  "Контрол на спазването на проекта от изпълнителите",
  "Комуникация с изпълнители",
  "Поръчки и координация на доставки",
];

const customItems = [
  "Проектиране на мебели по поръчка",
  "Оферта и съгл. с изпълнител",
];

const designStages = [
  {
    heading: "Първа среща - Нека се запознаем!",
    description:
      "Преди да започнем работа провеждаме опознавателна среща, на която обсъждаме проекта, очакванията и начина на работа. Важно е да се уверим, че си пасваме като комуникация и подход.",
  },
  {
    heading: "Задание и анализ",
    description:
      "След срещата попълвате кратък въпросник, който ми дава ясна представа за нуждите, начина ви на живот и приоритетите ви. На тази база се оформя проектното задание.",
  },
  {
    heading: "Идейна фаза",
    description:
      "Разработва се концепцията на проекта – разпределение, стил, цветове и материали. Идеята се представя чрез визуализации, за да добиете ясна представа за крайния резултат.",
  },
  {
    heading: "Техническа фаза",
    description:
      "Изготвят се всички необходими технически чертежи и детайли за реализацията на проекта, както и конкретен избор на материали, мебели и осветление.",
  },
  {
    heading: "Реализация",
    description:
      "По време на изпълнението може да се включи авторски надзор и/или управление на проекта с цел контрол на качеството и координация с изпълнителите.",
  },
];


const INQUIRY_FORM_URL = "https://form.jotform.com/241855833689372";

function FaqItem({ question, answer, bullets, sections, expanded, onToggle }) {
  const parts = answer.split(INQUIRY_LINK_MARKER);
  const hasLink = parts.length > 1;
  const textSx = {
    color: "rgba(244,237,231,0.9)",
    fontSize: 17,
    lineHeight: 1.6,
    textAlign: "left",
  };

  return (
    <Box>
      <Box
        onClick={onToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "#5c4a3f",
          color: "#ffffff",
          py: 1.5,
          px: 2,
          borderRadius: 1,
          cursor: "pointer",
          "&:hover": { bgcolor: "#6a5649" },
        }}
      >
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          sx={{
            color: "#ffffff",
            p: 0.5,
            "& .MuiSvgIcon-root": { fontSize: 28 },
          }}
        >
          {expanded ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
        <Typography sx={{ fontWeight: 400, fontSize: 17, flex: 1, color: "#ffffff", textAlign: "left" }}>
          {question}
        </Typography>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ pt: 1.5, px: 2, pb: 1 }}>
          {answer ? (
            <Typography sx={textSx}>
              {hasLink ? (
                <>
                  {parts[0]}
                  <Box
                    component="a"
                    href={INQUIRY_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ color: "#c4b5a6", textDecoration: "underline" }}
                  >
                    Кликни тук
                  </Box>
                  {parts[1]}
                </>
              ) : (
                answer
              )}
            </Typography>
          ) : null}
          {bullets && (
            <Box component="ul" sx={{ pl: 3, mt: answer ? 0.5 : 0, mb: 0 }}>
              {bullets.map((item) => (
                <Box component="li" key={item} sx={{ ...textSx, mb: 0.25 }}>{item}</Box>
              ))}
            </Box>
          )}
          {sections && sections.map((section) => (
            <Box key={section.heading} sx={{ mt: 1 }}>
              <Typography sx={{ ...textSx, fontWeight: 700 }}>{section.heading}</Typography>
              <Box component="ul" sx={{ pl: 3, mt: 0.25, mb: 0 }}>
                {section.bullets.map((item) => (
                  <Box component="li" key={item} sx={{ ...textSx, mb: 0.25 }}>{item}</Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

function PackageCard({ title, items, subtitle }) {
  return (
    <Paper
      sx={{
        bgcolor: "#d7d2cd",
        color: "#1f1a18",
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      <Box sx={{ bgcolor: "#6d5144", py: 0.75 }}>
        <Typography className="service-heading" sx={{ color: "#f4ede7" }}>
          {title}
        </Typography>
      </Box>
      <List
        dense
        component="ul"
        sx={{ px: 2, py: 1.5, listStyleType: "disc", pl: 3.5 }}
      >
        {items.map((item) => (
          <ListItem
            key={item}
            component="li"
            disableGutters
            sx={{ py: 0.25, alignItems: "flex-start", display: "list-item" }}
          >
            <ListItemText primary={item} sx={{ m: 0 }} primaryTypographyProps={{ fontSize: 16, lineHeight: 1.2 }} />
          </ListItem>
        ))}
      </List>
      {subtitle && (
        <Box sx={{ bgcolor: "#6d5144", py: 0.8 }}>
          <Typography align="center" sx={{ color: "#f4ede7", fontSize: 16 }}>
            {subtitle}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

function SmallPackage({ title, items, price }) {
  return (
    <Paper
      sx={{
        bgcolor: "#d7d2cd",
        color: "#1f1a18",
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      <Box sx={{ bgcolor: "#6d5144", py: 0.75 }}>
        <Typography className="service-heading" sx={{ color: "#f4ede7" }}>
          {title}
        </Typography>
      </Box>
      <List
        dense
        component="ul"
        sx={{ px: 2, py: 1.5, listStyleType: "disc", pl: 3.5 }}
      >
        {items.map((item) => (
          <ListItem
            key={item}
            component="li"
            disableGutters
            sx={{ py: 0.25, alignItems: "flex-start", display: "list-item" }}
          >
            <ListItemText primary={item} sx={{ m: 0 }} primaryTypographyProps={{ fontSize: 16, lineHeight: 1.2 }} />
          </ListItem>
        ))}
      </List>
      {price ? (
        <Box sx={{ bgcolor: "#6d5144", py: 0.8 }}>
          <Typography align="center" sx={{ color: "#f4ede7" }}>
            {price}
          </Typography>
        </Box>
      ) : null}
    </Paper>
  );
}

export default function Services() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleFaqToggle = (index) => {
    setExpandedFaq((prev) => (prev === index ? null : index));
  };

  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack
          spacing={1}
          alignItems="center"
          textAlign="center"
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Typography
            component="h1"
            className="section-heading section-heading--bold"
            sx={{ color: "text.primary", textAlign: "center" }}
          >
            Пакети
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            Най-важно е да разбера вашите нужди, желания и стил!
          </Typography>
        </Stack>

        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <PackageCard title="Базов" items={basicItems} subtitle="подходящ за освежителен ремонт" />
          </Grid>
          <Grid item xs={12} md={4}>
            <PackageCard title="Стандарт" items={standardItems} subtitle="подходящ за основен ремонт" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <SmallPackage
                title="Консултация"
                items={consultationItems}
                price="70 €/час"
              />
              <SmallPackage
                title="Авторски надзор"
                items={authorItems}
                price="70 €/час"
              />
              <SmallPackage title="Мебели по поръчка" items={customItems} />
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 4, md: 5 }, display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5 }}>
          <Typography align="center" color="text.secondary">
            Цените на базов пакет започват от 30-35€/кв.м (мин. 50 кв.м). За точна цена попълнете кратката анкета (отнема 2мин) и ще получите персонална оферта.
          </Typography>
          <Button
            component="a"
            href="https://form.jotform.com/241855833689372"
            target="_blank"
            rel="noreferrer"
            variant="contained"
            sx={{
              bgcolor: "#6d5144",
              color: "#f4ede7",
              px: 4,
              py: 1.5,
              borderRadius: "6px",
              textTransform: "none",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              "&:hover": { bgcolor: "#5a4539" },
            }}
          >
            Направи запитване
          </Button>
        </Box>
      </Container>

      <Box sx={{ width: "100%", height: 2, bgcolor: "#fff" }} />

      <Box id="etapi" sx={{ bgcolor: "#2a2624", py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 4 }}
            alignItems="flex-end"
          >
            <Box
              sx={{
                flex: { md: "0 0 42%" },
                minHeight: { xs: 280, md: 420 },
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={designStagesImage}
                alt="Мостри на подови настилки, цветови палитри и каталози с материали"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
            <Stack spacing={3} sx={{ flex: { md: "0 0 42%" }, alignItems: "flex-start" }}>
              <Typography
                component="h2"
                className="section-heading section-heading--bold"
                sx={{ color: "#f4ede7", textAlign: "left" }}
              >
                Какви са етапите на проектиране?
              </Typography>
              {designStages.map((stage) => (
                <Box key={stage.heading}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#f4ede7",
                      fontWeight: 700,
                      fontSize: "1.45rem",
                      mb: 1.5,
                      textAlign: "left",
                    }}
                  >
                    {stage.heading}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(244,237,231,0.9)",
                      fontSize: 17,
                      lineHeight: 1.6,
                      textAlign: "left",
                    }}
                  >
                    {stage.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box id="faq" sx={{ bgcolor: "#2a2624", py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            bgcolor: "#675145",
            py: { xs: 2, md: 2.5 },
            px: 2,
            mb: 4,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            component="h2"
            className="section-heading section-heading--bold"
            sx={{ color: "#f4ede7", textAlign: "center" }}
          >
            Често задавани въпроси
          </Typography>
          <Typography
            sx={{
              color: "rgba(244,237,231,0.85)",
              fontSize: 17,
              mt: 1,
              textAlign: "center",
            }}
          >
            Тук съм селектирала най-често задаваните въпроси и отговори
          </Typography>
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                {faqItems.slice(0, 5).map((item, i) => (
                  <FaqItem
                    key={i}
                    question={item.question}
                    answer={item.answer}
                    bullets={item.bullets}
                    sections={item.sections}
                    expanded={expandedFaq === i}
                    onToggle={() => handleFaqToggle(i)}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                {faqItems.slice(5, 9).map((item, i) => (
                  <FaqItem
                    key={i}
                    question={item.question}
                    answer={item.answer}
                    bullets={item.bullets}
                    sections={item.sections}
                    expanded={expandedFaq === i + 5}
                    onToggle={() => handleFaqToggle(i + 5)}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
