import app from "./app.js";
import { prisma } from "./lib/prisma.js";



const PORT = process.env.PORT || 5050;


async function main() {
  try {

    await prisma.$connect(); 
    console.log("Database connected successfully")

    app.get("/", (req, res) => {
      res.send("Hello,This is Assignment Four Server");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("An error occured:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();

