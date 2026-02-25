import { useEffect, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "./assets/svg/logo.svg";
import quoteSvg from "./assets/svg/quote.svg";
import heroSlide1 from "./assets/home_page/hero-slide-1.jpg";
import heroSlide2 from "./assets/home_page/hero-slide-2.jpg";
import heroSlide3 from "./assets/home_page/hero-slide-3.jpg";
import heroSlide4 from "./assets/home_page/hero-slide-4.jpg";
import doliCutout from "./assets/doli-cutout.png";
import doliSitting from "./assets/home_page/doli-sitting.jpg";
import Footer from "./components/Footer.jsx";
import { selectedProjects } from "./data/selectedProjects.js";
import Projects from "./pages/Projects.jsx";
import HomeInSage from "./pages/HomeInSage.jsx";
import HomeInBurgundy from "./pages/HomeInBurgundy.jsx";
import HomeInPastel from "./pages/HomeInPastel.jsx";
import HomeInBlue from "./pages/HomeInBlue.jsx";
import MountainHome from "./pages/MountainHome.jsx";
import BachelorGrey from "./pages/BachelorGrey.jsx";
import Studio245 from "./pages/Studio245.jsx";
import Services from "./pages/Services.jsx";

const images = [
  { src: heroSlide1 },
  { src: heroSlide2 },
  { src: heroSlide3 },
  { src: heroSlide4 },
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
      {
        text:
          "В сигурни ръце сте с професионалист като Доли! Бях много объркана и постоянно се двоумях относно интериора на жилището ми. Доли направи целия процес по-лесен, от това да дава съвети, насоки, да ми показва функционални решения, разпределения, материали и всичко от-до, за което се бях (и не бях) сетила.",
        author: "Н. Тарева",
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
    }, 15000);
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
      <Box>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: { md: "100vh" },
            minHeight: { md: 560 },
            borderRadius: 0,
            backgroundImage: { md: `url(${active.src})` },
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Mobile: real img so the container respects the natural aspect ratio */}
          <Box
            component="img"
            src={active.src}
            alt=""
            sx={{
              display: { xs: "block", md: "none" },
              width: "100%",
              height: "auto",
            }}
          />
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
          <Box
            component="img"
            src={logo}
            alt="Atelier by Doli"
            sx={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: "translate(-50%, -50%)",
              width: { xs: "55vw", md: "26vw" },
              maxWidth: 460,
              zIndex: 1,
            }}
          />
        </Paper>
      </Box>

      <Box
        sx={{
          bgcolor: "#e8e4dc",
          py: { xs: 5, md: 7 },
          px: { xs: 7, md: 2 },
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography
              component="h2"
              className="section-heading"
              sx={{ color: "#675145", textAlign: "center" }}
            >
              Предстои ти ремонт, но не знаеш откъде да започнеш?
            </Typography>
            <Typography
              sx={{
                color: "#5c5046",
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.6,
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

      <Container id="about" maxWidth="lg" sx={{ pt: { xs: 5, md: 7 }, pb: 0, px: { xs: 7 } }}>
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
              order: { xs: 2, md: 1 },
            }}
          />
          <Box sx={{ flex: 1.1, order: { xs: 1, md: 2 }, display: "flex", flexDirection: "column" }}>
            <Typography
              className="section-heading section-heading--bold"
              gutterBottom
              sx={{ color: "#E1DFDB", textAlign: { xs: "center", md: "left" } }}
            >
              Коя съм аз и как мога да ти помогна?
            </Typography>
            <Stack spacing={2}>
              <Typography color="text.secondary" sx={{ textAlign: { xs: "center", md: "left" } }}>
                Аз съм Доли Ликоманова, архитект и интериорен дизайнер с над пет години опит в създаването на функционални и стилни пространства в София, Виена и Лондон.
              </Typography>
              <Typography color="text.secondary" sx={{ textAlign: { xs: "center", md: "left" } }}>
                Работя с хора, които са заети и нямат време да се губят в хаоса на ремонта. Моята цел е да съчетая естетика и логика, така че вашето пространство да изглежда красиво и да работи за вас.
              </Typography>
              <Typography color="text.secondary" sx={{ textAlign: { xs: "center", md: "left" } }}>
                Нека го преобразим заедно, без стрес и излишни компромиси.
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
                alignSelf: { xs: "center", md: "flex-start" },
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
            sx={{ color: "#675145", textAlign: "center" }}
          >
            Селектирани проекти
          </Typography>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#302c29", position: "relative", py: 4 }}>
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
                maxWidth: { xs: "100%", md: "33.333%" },
                display: { xs: slotIndex > 0 ? "none" : "block", md: "block" },
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
            sx={{ color: "#675145", textAlign: "center" }}
          >
            Какво казват клиентите
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 }, bgcolor: "transparent", px: { xs: 7 } }}>
        <Box sx={{ position: "relative" }}>
          {/* Invisible ghost stack with all testimonials — sets the max height of the section */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ mx: { xs: 0, md: 6 }, visibility: "hidden", pointerEvents: "none" }}
            aria-hidden="true"
          >
            {[testimonials.reduce((a, b) => a.text.length > b.text.length ? a : b)].concat(
              [testimonials.reduce((a, b) => a.text.length > b.text.length ? a : b)]
            ).map((testimonial, i) => (
              <Box key={i} sx={{ flex: 1, p: { xs: 3, md: 4 }, display: { xs: i > 0 ? "none" : "flex", md: "flex" }, flexDirection: "column" }}>
                <Stack direction="row" spacing={0.5} sx={{ mb: 4 }}>
                  <Box component="img" src={quoteSvg} alt="" sx={{ height: { xs: 32, md: 32 } }} />
                  <Box component="img" src={quoteSvg} alt="" sx={{ height: { xs: 32, md: 32 } }} />
                </Stack>
                <Typography color="text.secondary">{testimonial.text}</Typography>
                <Typography align="center" color="text.secondary" sx={{ my: 2, fontWeight: 900, fontSize: "1.5rem", lineHeight: 1 }}>—</Typography>
                <Typography align="center" color="text.secondary">{testimonial.author}</Typography>
              </Box>
            ))}
          </Stack>
          {/* Visible testimonials absolutely overlaid */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ mx: { xs: 0, md: 6 }, position: "absolute", top: 0, left: 0, right: 0 }}
          >
            {visibleTestimonials.map((testimonial, i) => (
              <Box
                key={testimonial.author}
                sx={{
                  flex: 1,
                  p: { xs: 3, md: 4 },
                  display: { xs: i > 0 ? "none" : "flex", md: "flex" },
                  flexDirection: "column",
                }}
              >
                <Stack direction="row" spacing={0.5} sx={{ mb: 4 }}>
                  <Box component="img" src={quoteSvg} alt="" sx={{ height: { xs: 32, md: 32 } }} />
                  <Box component="img" src={quoteSvg} alt="" sx={{ height: { xs: 32, md: 32 } }} />
                </Stack>
                <Typography color="text.secondary">
                  {testimonial.text}
                </Typography>
                <Typography align="center" color="text.secondary" sx={{ my: 2, fontWeight: 900, fontSize: "1.5rem", lineHeight: 1 }}>
                  —
                </Typography>
                <Typography align="center" color="text.secondary">
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
        sx={{ pb: { xs: 6, md: 8 }, pt: { xs: 4, md: 5 }, px: { xs: 7 } }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 0, md: 4 }}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Box sx={{ flex: 1.1, order: { xs: 2, md: 1 } }}>
            <Typography
              className="section-heading section-heading--bold"
              gutterBottom
              sx={{ color: "#E1DFDB", textAlign: "left" }}
            >
              Не се колебайте да се свържете с мен!
            </Typography>
            <Typography color="text.secondary" paragraph sx={{ textAlign: "left" }}>
              Нека създадем вашето мечтано пространство заедно!
            </Typography>
            <Stack spacing={2}>
              <Typography color="text.secondary" sx={{ textAlign: "left" }}>
                Email:
                <br />
                <Box component="span" sx={{ color: "text.primary" }}>
                  likomanova.doli@gmail.com
                </Box>
              </Typography>
              <Typography color="text.secondary" sx={{ textAlign: "left" }}>
                Форма за запитване за проект:
                <br />
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
                <Typography color="text.secondary" paragraph sx={{ textAlign: "left" }}>
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
            sx={{
              flex: 0.9,
              width: "100%",
              order: { xs: 1, md: 2 },
              mb: { xs: 6, md: 0 },
            }}
          >
            <Box
              component="img"
              src={doliSitting}
              alt="Doli sitting"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { md: 520 },
                objectFit: { md: "contain" },
                display: "block",
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#6d5144" }}>
        <Toolbar sx={{ gap: 2 }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src={logo}
              alt="Atelier by Doli"
              sx={{ height: 20, display: "block" }}
            />
          </Box>

          {/* Desktop nav */}
          <Stack
            direction="row"
            spacing={2.5}
            sx={{
              flex: 1,
              justifyContent: "center",
              letterSpacing: "0.1em",
              display: { xs: "none", md: "flex" },
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
                  sx={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "none" }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>

          {/* Desktop social icons */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton color="inherit" size="small" component="a" href="mailto:likomanovadoli@gmail.com" aria-label="Email">
              <MailOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" size="small" component="a" href="https://www.linkedin.com/in/doli-likomanova" target="_blank" rel="noreferrer">
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" size="small" component="a" href="https://www.instagram.com/atelier_by_doli" target="_blank" rel="noreferrer">
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* Mobile hamburger */}
          <Box sx={{ flex: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}>
            <IconButton color="inherit" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile slide-in drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: "#6d5144", color: "#f4ede7" } }}
      >
        {/* Nav links */}
        <List disablePadding>
          {navLinks.map((link) => {
            const isHashLink = link.to.includes("#");
            return (
              <ListItemButton
                key={link.label}
                component={isHashLink ? "a" : Link}
                href={isHashLink ? link.to : undefined}
                to={isHashLink ? undefined : link.to}
                onClick={() => setMobileMenuOpen(false)}
                sx={{ px: 3, py: 1.5 }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontSize: 16, letterSpacing: "0.05em", color: "#f4ede7" }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Divider sx={{ borderColor: "rgba(244,237,231,0.2)", mt: 1 }} />

        {/* Social icons */}
        <Stack direction="row" spacing={1} sx={{ px: 2, py: 2 }}>
          <IconButton color="inherit" size="small" component="a" href="mailto:likomanovadoli@gmail.com" aria-label="Email">
            <MailOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton color="inherit" size="small" component="a" href="https://www.linkedin.com/in/doli-likomanova" target="_blank" rel="noreferrer">
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton color="inherit" size="small" component="a" href="https://www.instagram.com/atelier_by_doli" target="_blank" rel="noreferrer">
            <InstagramIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Drawer>

      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects/home-in-sage" element={<HomeInSage />} />
          <Route path="/projects/home-in-burgundy" element={<HomeInBurgundy />} />
          <Route path="/projects/home-in-pastel" element={<HomeInPastel />} />
          <Route path="/projects/home-in-blue" element={<HomeInBlue />} />
          <Route path="/projects/mountain-home" element={<MountainHome />} />
          <Route path="/projects/bachelor-grey" element={<BachelorGrey />} />
          <Route path="/projects/studio-24-5" element={<Studio245 />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
