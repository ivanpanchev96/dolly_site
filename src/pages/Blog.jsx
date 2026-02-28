import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import etapiImg from "../assets/blog/etapi/etapi.jpg";
import kitchenImg from "../assets/home_in_blue/18.jpg";

const posts = [
  {
    image: etapiImg,
    title: "Етапите на интериорния проект: как протича работата от идея до реализация",
    excerpt:
      "Всеки успешен интериорен проект минава през ясни и структурирани етапи. Добрият дизайн не е просто вдъхновение – той е процес. Ето как протича.....",
    link: "/blog/etapite-na-interiorniya-proekt",
  },
  {
    image: kitchenImg,
    title: "Как да направиш кухнята не само красива, но и функционална",
    excerpt:
      "Искаш кухнята ти да бъде не само красива, но и удобна за ползване? Правилото на триъгълника в интериорния дизайн е малък трик, който може да промени .....",
    link: "/blog/kuhnya-funktsionalna",
  },
];

export default function Blog() {
  return (
    <Box sx={{ bgcolor: "background.default", pb: { xs: 6, md: 8 } }}>
      {/* Hero heading — same dark background as rest of page */}
      <Container maxWidth="md" sx={{ pt: { xs: 5, md: 6 }, pb: { xs: 3, md: 4 }, px: { xs: 6, md: 3 } }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            className="blog-page-heading"
            sx={{ color: "#E1DFDB", mb: 1 }}
          >
            Полезни съвети от интериорния свят
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.6,
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Тук може да намериш интересна информация и да се запознаеш с метода ми на работа
          </Typography>
        </Box>
      </Container>

      {/* Post grid — 3 columns, only 2 posts filled */}
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 5 }, px: { xs: 6, md: 3 } }}>
        <Grid container spacing={{ xs: 4, md: 4 }}>
          {posts.map((post) => {
            const inner = (
              <Box>
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title}
                  sx={{
                    width: "100%",
                    height: { xs: 400, md: 514 },
                    maxWidth: { md: 343 },
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    mb: 2,
                  }}
                />
                <Typography
                  className="blog-post-title"
                  sx={{ color: "text.primary", mb: 1.5 }}
                >
                  {post.title}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  {post.excerpt}
                </Typography>
              </Box>
            );
            return (
              <Grid item xs={12} sm={6} md={4} key={post.title}>
                {post.link ? (
                  <Box
                    component={Link}
                    to={post.link}
                    sx={{ display: "block", textDecoration: "none", color: "inherit", cursor: "pointer" }}
                  >
                    {inner}
                  </Box>
                ) : inner}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
