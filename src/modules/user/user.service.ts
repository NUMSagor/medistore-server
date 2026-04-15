import { prisma } from "../../lib/prisma.js";
import { Prisma, Role, UserStatus } from "../../generated/prisma/index.js";



const userService = {
  getAllUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // updateUser: async (
  //   id: string,
  //   payload: { role?: Role; status?: UserStatus }
  // ) => {
  //   return prisma.user.update({
  //     where: { id },
  //     data: payload,
  //     select: {
  //       id: true,
  //       name: true,
  //       email: true,
  //       phone: true,
  //       role: true,
  //       status: true,
  //     },
  //   });
  // },

  // add these two methods to userService:

updateUser: async (
  id: string,
  payload: { role?: Role; status?: UserStatus }
) => {
  // ✅ Prisma.UserUpdateInput হিসেবে cast করো
  const data: Prisma.UserUpdateInput = {
    ...(payload.role !== undefined && { role: payload.role }),
    ...(payload.status !== undefined && { status: payload.status }),
  };

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
    },
  });
},



updateProfile: async (id: string, payload: { name?: string; email?: string; phone?: string }) => {
  return prisma.user.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
    },
  });
},

updatePassword: async (id: string, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');

  const bcrypt = await import('bcryptjs');
  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) throw new Error('Current password is incorrect');

  const hashed = await bcrypt.hash(newPassword, 10);
  return prisma.user.update({
    where: { id },
    data: { password: hashed },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });
},




};

export default userService;
