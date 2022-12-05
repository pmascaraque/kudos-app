import { KudoStyle, Prisma } from "@prisma/client";
import { prisma } from "./prisma.server";

export const createKudo = async (
  message: string,
  userId: string,
  recipientId: string,
  style: KudoStyle
) => {
  await prisma.kudo.create({
    data: {
      message,
      author: {
        connect: {
          id: userId
        }
      },
      recipient: {
        connect: {
          id: recipientId
        }
      },
      style,
    },
  }
  )
}

export const getFilteredKudos = async (
  userId: string,
  sortFilter: Prisma.KudoOrderByWithRelationInput,
  whereFilter: Prisma.KudoWhereInput
) => {
  return await prisma.kudo.findMany({
    where: {
      recipientId: userId,
      ...whereFilter
    },
    orderBy: sortFilter,
    select: {
      id: true,
      style: true,
      message: true,
      author: {
        select: {
          profile: true
        }
      }
    }
  })
}