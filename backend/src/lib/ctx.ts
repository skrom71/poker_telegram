export const createAppContext = () => {
  // const prisma = createPrismaClient()
  return {
    // userRepository: UserRepository,
  }
}

export type AppContext = ReturnType<typeof createAppContext>
