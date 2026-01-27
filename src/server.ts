import app from "./app";
import { prisma } from "./lib/prisma";



const PORT = process.env.PORT || 5050;


async function main() {
  try {

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

