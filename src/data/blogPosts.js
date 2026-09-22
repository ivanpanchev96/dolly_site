/**
 * Blog post cards, resolved with their bundled images.
 *
 * Same split as selectedProjects.js: the copy lives in blogPosts.json so Node
 * (scripts/schema.mjs) can read it, and the image imports live here because
 * importing a JPEG makes a module unloadable outside Vite.
 *
 * Edit blogPosts.json to change a post's title, excerpt or date. When adding a
 * post, also import its image below and add it to imageMap.
 */

import postsData from "./blogPosts.json";

import etapiImg from "../assets/blog/etapi/etapi.jpg";
import kitchenImg from "../assets/home_in_blue/18.jpg";
import blogNewImg from "../assets/blog/price/blognew1.jpg";
import lightCover from "../assets/blog/osvetlenie/light_cover.jpg";

const imageMap = {
  "blog/etapi/etapi.jpg": etapiImg,
  "home_in_blue/18.jpg": kitchenImg,
  "blog/price/blognew1.jpg": blogNewImg,
  "blog/osvetlenie/light_cover.jpg": lightCover,
};

export const blogPosts = postsData.map((post) => ({
  ...post,
  image: imageMap[post.imagePath],
}));
