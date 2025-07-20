import fastify from "fastify";
import * as Routes from "./infra/web/routes";
import "dotenv/config";
import * as Swagger from "./infra/web/config/swagger";
import * as Database from "./infra/database/";
import * as Cors from "./infra/web/config/cors";
import * as Schema from "./infra/web/config/schema";
import * as ErrorHandler from "./infra/web/config/error-handler";

(async () => {
  const app = fastify();

  ErrorHandler.configure(app);

  Schema.configure(app);

  await Swagger.configure(app);

  await Cors.register(app);

  await Database.connect();

  Routes.register(app);

  app.listen(
    {
      port: 3001,
    },
    () => {
      console.log("Api rodando na porta 3001");
    }
  );
})();
