import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String8551558',
        hashedPassword: 'String',
        salt: 'String',
        name: 'String',
      },
    },
    two: {
      data: {
        email: 'String4897105',
        hashedPassword: 'String',
        salt: 'String',
        name: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
