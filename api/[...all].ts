import serverless from "serverless-http";
import { createServer } from "../server";

// Wrap the Express app with serverless-http so it can run on Vercel Functions
const app = createServer();

export default serverless(app);

