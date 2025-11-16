type PrismaFactory = new () => Record<string, unknown>;

let prismaConstructor: PrismaFactory | null | undefined;

function loadPrismaConstructor() {
  if (prismaConstructor !== undefined) {
    return prismaConstructor;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const prismaModule = require("@prisma/client") as { PrismaClient: PrismaFactory };
    prismaConstructor = prismaModule.PrismaClient;
  } catch {
    prismaConstructor = null;
  }
  return prismaConstructor;
}

declare global {
  var prisma: Record<string, unknown> | undefined;
}

export function getPrismaClient() {
  const PrismaClient = loadPrismaConstructor();
  if (!process.env.DATABASE_URL || !PrismaClient) {
    return undefined;
  }
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  return global.prisma;
}
