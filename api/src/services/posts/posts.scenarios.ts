import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        title: 'String',
        content: 'String',
        tags: ['String'],
        likes: 9004701,
        author: {
          create: {
            email: 'String3139577',
            hashedPassword: 'String',
            salt: 'String',
            name: 'String',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        content: 'String',
        tags: ['String'],
        likes: 9424141,
        author: {
          create: {
            email: 'String7479403',
            hashedPassword: 'String',
            salt: 'String',
            name: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
