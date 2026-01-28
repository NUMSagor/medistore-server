import { prisma } from "../../lib/prisma";


const categoryService = {

create: async (name: string) => {
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    try {
      return await prisma.category.create({
        data: { name, slug },
      });
    } catch (error: any) {
      
      if (error?.message?.includes("Unique constraint failed")) {
        throw new Error("This category already exists");
      }
      throw error;
    }
  },

    // GET ALL (Public)
    getAll: async () => {
        return prisma.category.findMany({
            orderBy: { createdAt: "desc" },
        });
    },

    // UPDATE (Admin)
    update: async (id: string, name: string) => {
        const slug = name.toLowerCase().replace(/\s+/g, "-");
        return prisma.category.update({
            where: { id },
            data: { name, slug },
        });
    },

    // DELETE (Admin)
    delete: async (id: string) => {
        return prisma.category.delete({
            where: { id },
        });
    },
};

export default categoryService;
