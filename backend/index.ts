import { Hono } from "hono";
import "dotenv/config";
import { cors } from "hono/cors";
import { getDB, getPageProperties, getPageData } from "./client/notionClient";
const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => c.json({ message: "Hello Bun!" }));

app.get("/database", async (c) => {
  const res = await getDB("f1b299a4aeec461b95486f14f9d2968e");
  return c.json(res);
});

app.get("/page/content/:id", async (c) => {
  const id = c.req.param("id");
  const res = await getPageData(id);
  return c.json(res);
});

app.get("/page/properties/:id", async (c) => {
  const id = c.req.param("id");
  const res = await getPageProperties(id);
  return c.json(res);
});

export default app;
