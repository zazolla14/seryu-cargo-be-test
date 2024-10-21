import app from "../app.js";
import deb from "debug";
import http from "http";
import Knex from "knex";
import knexConfig from "../knexfile.js";

const debug = deb("seryu-cargo-test:server");
const knex = Knex(knexConfig.development);

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

(async () => {
  try {
    await knex.migrate.latest();
    await knex.seed.run();
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  } catch (err) {
    console.error("Failed to run migrations or seed database:", err);
    process.exit(1);
  }
})();

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log(`Running on ${bind}`);
  debug(`Listening on ${bind}`);
}
