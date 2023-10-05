import fastify from "fastify";

import fastifyStatic from "@fastify/static";
import portionSizes from "./data/portionSizes.mjs";
import path from "path";
import { fileURLToPath } from "url";
import ingredients from "./data/ingredients.mjs";
import getSmoothieName from "./data/smoothieName.mjs";
import getSmoothieImage from "./data/smoothieImage.mjs";
import specialSmoothie from "./data/specialSmoothie.mjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();





server.setNotFoundHandler((_, reply) => {
  return reply.sendFile('index.html')
})

server.register(fastifyStatic, {
  root: path.join(__dirname, "../../dist"),
});

server.get("/portion-sizes", (_, reply) => {
    return reply.send(portionSizes);
  });

  server.get("/ingredients", (_, reply) => {
    return reply.send(ingredients);
  });

  server.get("/smoothie-name", (_, reply) => {
    return reply.send(getSmoothieName());
  });

  server.get("/smoothie-image", (_, reply) => {
    return reply.send(getSmoothieImage());
  });
  server.get("/special-smoothie", (_, reply) => {
    return reply.send(specialSmoothie);
  });
  
  

 
  
const port = process.env.PORT || 8064;
const host = process.env.HOST || "localhost"

server
  .listen({ port, host })
  .then((address) => {
    console.log("Server is running " + address);
  })
  .catch((error) => {
    console.error(error);
  });