import { serve } from "@hono/node-server";

import app from "./app.js";
import { DB } from "./models/db.js";

DB.createConnection({
	preserve: true,
	filename: "db.json",
});

const port = parseInt(String(process.env.PORT)) || 8080;

serve({ fetch: app.fetch, port }, (info) => {
	console.log(`Listening on http://localhost:${info.port}`);
});
