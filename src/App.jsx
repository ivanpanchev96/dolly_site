import { useEffect, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import homeHero1 from "./assets/home_page/home-hero-1.jpg";
import homeHero2 from "./assets/home_page/home-hero-2.jpg";
import homeHero3 from "./assets/home_page/home-hero-3.jpg";
import doliCutout from "./assets/doli-cutout.png";
import doliSitting from "./assets/home_page/doli-sitting.jpg";
import Footer from "./components/Footer.jsx";
import { selectedProjects } from "./data/selectedProjects.js";
import Projects from "./pages/Projects.jsx";
import HomeInSage from "./pages/HomeInSage.jsx";
import HomeInBurgundy from "./pages/HomeInBurgundy.jsx";
import HomeInPastel from "./pages/HomeInPastel.jsx";
import MountainHome from "./pages/MountainHome.jsx";
import BachelorGrey from "./pages/BachelorGrey.jsx";
import Studio245 from "./pages/Studio245.jsx";
import Services from "./pages/Services.jsx";

const images = [
  { title: "ATELIER BY DOLI", src: homeHero1 },
  { title: "ATELIER BY DOLI", src: homeHero2 },
  { title: "ATELIER BY DOLI", src: homeHero3 },
];

const navLinks = [
  { label: "Начало", to: "/" },
  { label: "За мен", to: "/#about" },
  { label: "Услуги", to: "/services" },
  { label: "Проекти", to: "/projects" },
  { label: "Контакти", to: "/#contact" },
];

const PROJECTS_VISIBLE = 3;

function HomePage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useMemo(() => images[activeIndex], [activeIndex]);
  const [projectsStartIndex, setProjectsStartIndex] = useState(0);
  const [revealedProjectSlot, setRevealedProjectSlot] = useState(null);
  const visibleProjectsList = useMemo(() => {
    const n = selectedProjects.length;
    if (n === 0) return [];
    return Array.from({ length: PROJECTS_VISIBLE }, (_, i) =>
      selectedProjects[(projectsStartIndex + i) % n]
    );
  }, [projectsStartIndex]);
  const testimonials = useMemo(
    () => [
      {
        text:
          "Работата с Доли беше удоволствие. Тя ми даде разнообразни възможности за подредбата на моето пространство, което значително улесни избора и ми помогна да направя дома си точно такъв, какъвто съм си представяла.",
        author: "Б. Иванова",
      },
      {
        text:
          "Определено бих избрал да работя с нея отново. Благодарение на професионалния подход и вниманието към детайла получих пространство, което е едновременно красиво и функционално.",
        author: "Д. Андреева",
      },
      {
        text:
          "Доли е изключителен професионалист, който не само прави функционални дизайни, предназначени за конкретния клиент, но и съдейства цялостно в процеса по избор на материали/продукти, координация на изпълнителите, до завършване на проекта. Комуникацията с Доли е гладка, приятелска, тя винаги дава полезна информация и насоки. Нямаше да се справим без Доли и сме изключително доволни от резултата!",
        author: "Д. Динева",
      },
      {
        text:
          "Силно препоръчвам Доли! Тя е изключителен професионалист с подчертано внимание към детайлите. Нейният подход е коректен и експедитивен, което прави процеса на работа изключително приятен и ефективен. Без колебание бих я наел отново за бъдещи проекти.",
        author: "В. Маринов",
      },
    ],
    []
  );
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleTestimonials = useMemo(() => {
    if (testimonials.length === 0) {
      return [];
    }
    if (testimonials.length === 1) {
      return [testimonials[0]];
    }
    const nextIndex = (testimonialIndex + 1) % testimonials.length;
    return [testimonials[testimonialIndex], testimonials[nextIndex]];
  }, [testimonialIndex, testimonials]);

  const goPrev = () => {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((index) => (index + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goPrevTestimonial = () => {
    setTestimonialIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );
  };

  const goNextTestimonial = () => {
    setTestimonialIndex((index) => (index + 1) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goPrevProjects = () => {
    setProjectsStartIndex(
      (i) => (i - 1 + selectedProjects.length) % selectedProjects.length
    );
    setRevealedProjectSlot(null);
  };
  const goNextProjects = () => {
    setProjectsStartIndex(
      (i) => (i + 1) % selectedProjects.length
    );
    setRevealedProjectSlot(null);
  };
  const handleProjectClick = (slotIndex, project) => {
    if (revealedProjectSlot === slotIndex) {
      navigate(project.link);
    } else {
      setRevealedProjectSlot(slotIndex);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ px: { xs: 0, md: 0 }, py: { xs: 1, md: 2 } }}>
        <Paper
          elevation={6}
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: { xs: "55vh", md: "100vh" },
            minHeight: { xs: 280, md: 560 },
            backgroundImage: `url(${active.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            bgcolor: "#1f1a18",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(rgba(34,28,25,0.18), rgba(34,28,25,0.28))",
              pointerEvents: "none",
            }}
          />
          <IconButton
            onClick={goPrev}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              bgcolor: "rgba(255,255,255,0.75)",
              color: "#2a2421",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={goNext}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              bgcolor: "rgba(255,255,255,0.75)",
              color: "#2a2421",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: "translate(-50%, -50%)",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "clamp(14px, 4.5vw, 56px)",
                color: "#E1DFDB",
                letterSpacing: "0.4em",
              }}
            >
              {active.title}
            </Typography>
          </Stack>
        </Paper>
      </Box>

      <Box
        sx={{
          bgcolor: "#e8e4dc",
          py: { xs: 5, md: 7 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography
              component="h2"
              className="section-heading"
              sx={{ color: "#3d3229", textAlign: "center" }}
            >
              Предстои ти ремонт, но не знаеш откъде да започнеш?
            </Typography>
            <Typography
              sx={{
                color: "#5c5046",
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.6,
                maxWidth: 520,
                textAlign: "center",
              }}
            >
              Милион въпроси. Различни мнения.
              <br />
              Как да подредиш пространството, какво да купиш, в какъв ред, колко
              ще струва и как да не
              <br />
              вземеш грешни решения....
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
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(61,50,41,0.25)",
                "&:hover": {
                  bgcolor: "#5a4539",
                  boxShadow: "0 4px 12px rgba(61,50,41,0.35)",
                },
              }}
            >
              Направи запитване
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container id="about" maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 6 }}
          alignItems="center"
        >
          <Box
            component="img"
            src={doliCutout}
            alt="Doli cutout"
            sx={{
              flex: 0.9,
              width: "100%",
              height: "auto",
              maxHeight: { xs: 420, md: 520 },
              objectFit: "contain",
            }}
          />
          <Box sx={{ flex: 1.1 }}>
            <Typography
              className="section-heading"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Коя съм аз и как мога да ти помогна?
            </Typography>
            <Stack spacing={2}>
              <Typography color="text.secondary">
                Аз съм Доли Илюминова, архитект и интериорен дизайнер с над пет
                години опит в създаването на функционални и стилни пространства в
                София, Виена и Лондон.
              </Typography>
              <Typography color="text.secondary">
                Работя с хора, които са заети и нямат време да се губят в хаоса на
                ремонта. Моята цел е да създам естетика и логика, така че вашето
                пространство да изглежда красиво и да работи за вас.
              </Typography>
              <Typography color="text.secondary">
                Нека го превърнем заедно, без стрес и излишни компромиси.
              </Typography>
            </Stack>
            <Button
              component={Link}
              to="/services"
              sx={{
                mt: 3,
                borderRadius: "24px",
                bgcolor: "#5a4a42",
                color: "#f4ede7",
                px: 2.5,
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 0,
                "&:hover": {
                  bgcolor: "#4a3d36",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                },
              }}
            >
              Услуги
              <Box
                sx={{
                  width: "1px",
                  height: 20,
                  bgcolor: "rgba(255,255,255,0.6)",
                  mx: 1.5,
                }}
              />
              <KeyboardArrowDownIcon sx={{ fontSize: 28 }} />
            </Button>
          </Box>
        </Stack>
      </Container>

      <Box sx={{ bgcolor: "#e8e4dc", py: 2 }}>
        <Container maxWidth="lg">
          <Typography
            className="section-heading"
            sx={{ color: "#3d3229", textAlign: "center" }}
          >
            Селектирани проекти
          </Typography>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#1a1a1a", position: "relative", py: 4 }}>
        <Stack
          direction="row"
          alignItems="stretch"
          justifyContent="center"
          spacing={2}
          sx={{
            height: { xs: "22.5vh", md: "32.5vh" },
            minHeight: { xs: 110, md: 200 },
            px: { xs: 6, md: 10 },
          }}
        >
          {visibleProjectsList.map((project, slotIndex) => (
            <Box
              key={`${project.id}-${projectsStartIndex}-${slotIndex}`}
              onClick={() => handleProjectClick(slotIndex, project)}
              sx={{
                flex: 1,
                maxWidth: "33.333%",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover .project-image": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <Box
                className="project-image"
                component="img"
                src={project.image}
                alt={project.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
              />
              {revealedProjectSlot === slotIndex && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      textAlign: "center",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {project.name}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Stack>
        <IconButton
          onClick={goPrevProjects}
          sx={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={goNextProjects}
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            component={Link}
            to="/projects"
            sx={{
              bgcolor: "#6d5144",
              color: "#f4ede7",
              borderRadius: 2,
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#5a4539" },
            }}
          >
            Виж всички
          </Button>
        </Box>
      </Box>

      <Box
        id="services"
        sx={{
          bgcolor: "#e8e4dc",
          py: 2,
          scrollMarginTop: 80,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            className="section-heading"
            sx={{ color: "#3d3229", textAlign: "center" }}
          >
            Какво казват клиентите
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 }, bgcolor: "transparent" }}>
        <Box
          sx={{
            position: "relative",
            height: { xs: "55vh", md: "50vh" },
            minHeight: { xs: 380, md: 420 },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{
              mx: { xs: 0, md: 6 },
              height: "100%",
            }}
          >
            {visibleTestimonials.map((testimonial) => (
              <Box
                key={testimonial.author}
                sx={{
                  flex: 1,
                  p: { xs: 3, md: 4 },
                  minHeight: 0,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ mb: 1, lineHeight: 1, fontSize: { xs: 72, md: 96 }, flexShrink: 0 }}
                >
                  “
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1, overflow: "auto" }}>
                  {testimonial.text}
                </Typography>
                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
                <Typography align="right" color="text.secondary" sx={{ flexShrink: 0 }}>
                  {testimonial.author}
                </Typography>
              </Box>
            ))}
          </Stack>

          <IconButton
            onClick={goPrevTestimonial}
            sx={{
              position: "absolute",
              left: { xs: -6, md: 0 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.15)",
              color: "#f4ede7",
              "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={goNextTestimonial}
            sx={{
              position: "absolute",
              right: { xs: -6, md: 0 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.15)",
              color: "#f4ede7",
              "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>

      <Box
        sx={{
          width: "100%",
          height: 2,
          bgcolor: "#fff",
        }}
      />

      <Container
        id="contact"
        maxWidth="lg"
        sx={{ pb: { xs: 6, md: 8 }, pt: { xs: 4, md: 5 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
        >
          <Box sx={{ flex: 1.1 }}>
            <Typography
              className="section-heading"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Не се колебайте да се свържете с мен!
            </Typography>
            <Typography color="text.secondary" paragraph>
              Нека създадем вашето мечтано пространство заедно!
            </Typography>
            <Stack spacing={2}>
              <Typography color="text.secondary">
                Email:{" "}
                <Box component="span" sx={{ color: "text.primary" }}>
                  likomanova.doli@gmail.com
                </Box>
              </Typography>
              <Typography color="text.secondary">
                Форма за запитване за проект:{" "}
                <Box
                  component="a"
                  href="https://form.jotform.com/241855833689372"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ color: "text.primary", textDecoration: "underline" }}
                >
                  Кликни тук
                </Box>
              </Typography>
              <Stack spacing={1}>
                <Typography color="text.secondary">
                  Follow me on social media
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton
                    size="small"
                    color="inherit"
                    component="a"
                    href="mailto:likomanovadoli@gmail.com"
                    aria-label="Email"
                  >
                    <MailOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="inherit"
                    component="a"
                    href="https://www.linkedin.com/in/doli-likomanova"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="inherit"
                    component="a"
                    href="https://www.instagram.com/atelier_by_doli"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box
            component="img"
            src={doliSitting}
            alt="Doli sitting"
            sx={{
              flex: 0.9,
              width: "100%",
              height: "auto",
              maxHeight: { xs: 420, md: 520 },
              objectFit: "contain",
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#6d5144" }}>
        <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
          <Typography
            variant="subtitle2"
            sx={{ letterSpacing: "0.4em", fontWeight: 600 }}
          >
            ATELIER BY DOLI
          </Typography>
          <Stack
            direction="row"
            spacing={2.5}
            sx={{
              flex: 1,
              justifyContent: "center",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: 12,
            }}
          >
            {navLinks.map((link) => {
              const isHashLink = link.to.includes("#");
              return (
                <Button
                  key={link.label}
                  color="inherit"
                  size="small"
                  component={isHashLink ? "a" : Link}
                  href={isHashLink ? link.to : undefined}
                  to={isHashLink ? undefined : link.to}
                  sx={{ fontSize: 12, letterSpacing: "0.2em" }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              size="small"
              component="a"
              href="mailto:likomanovadoli@gmail.com"
              aria-label="Email"
            >
              <MailOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              component="a"
              href="https://www.linkedin.com/in/doli-likomanova"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              component="a"
              href="https://www.instagram.com/atelier_by_doli"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects/home-in-sage" element={<HomeInSage />} />
          <Route path="/projects/home-in-burgundy" element={<HomeInBurgundy />} />
          <Route path="/projects/home-in-pastel" element={<HomeInPastel />} />
          <Route path="/projects/mountain-home" element={<MountainHome />} />
          <Route path="/projects/bachelor-grey" element={<BachelorGrey />} />
          <Route path="/projects/studio-24-5" element={<Studio245 />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
