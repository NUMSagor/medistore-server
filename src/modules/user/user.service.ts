import { Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const userService = {
  getAllUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  updateUser: async (
    id: string,
    payload: { role?: Role; status?: UserStatus }
  ) => {
    return prisma.user.update({
      where: { id },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });
  },
};

export default userService;
