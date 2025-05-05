// scripts/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.create({
    data: {
      title: "Portfolio 3D",
      description: "Un site immersif fait avec R3F",
      imageUrl: "https://example.com/image.png",
      techStack: "Next.js, R3F, Tailwind",
      stack: "Next.js, R3F, Tailwind", // Example stack as a single string
      githubUrl: "https://github.com/username/portfolio-3d", // Example GitHub URL
    },
  });

  console.log("Projet ajouté !");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
