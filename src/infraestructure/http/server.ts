import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { db } from "../firebase/firebase";
import { authRoutes, taskRoutes } from "./routes";

class Server {
  public app: Application;

  private apiPaths = {
    auth: "/api/auth",
    task: "/api/task",
  };

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.connectToDatabase();
    this.setupRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    if (process.env.NODE_ENV === "development") {
      this.app.use(morgan("dev"));
    }

    const publicPath = path.join(__dirname, "..", "dist", "public");
    this.app.use(express.static(publicPath));
  }

  private connectToDatabase(): void {
    // Conexión de prueba a Firestore
    db.collection("test")
      .doc("testDoc")
      .set({ test: "si connecto!" })
      .then(() => console.log(" Connection successfully to Firestore"))
      .catch((error) => console.error("Error connecting to Firestore:", error));
  }

  private setupRoutes(): void {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use("/api/tasks", taskRoutes);

    // Ruta 404
    this.app.use((req: Request, res: Response) => {
      res.status(404).send("Not Found");
    });

    // Middleware de errores
    this.app.use((err: Error, req: Request, res: Response) => {
      console.error(err.stack);
      res.status(500).send("Something went wrong!");
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log("JWT_SECRET value:", process.env.JWT_SECRET);
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}

export default Server;
