import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const userData: Prisma.UserCreateArgs['data'][] = [
      // To try this example data with the UserExample model in schema.prisma,
      // uncomment the lines below and run 'yarn rw prisma migrate dev'
      //
      {
        salt: 'f8a3e272558e48268af13d62da9b651a',
        email: 'merlimejia25@gmail.com',
        name: 'Merli Mejia',
        hashedPassword:
          'd54a56b570d8734216fa5be5d51488901df19bacd39d2df386fbaf0528f7ac42',
      },
    ]

    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    await Promise.all(
      //
      // Change to match your data model and seeding needs
      //

      userData.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({ data })
        console.log(record)
      })
    )

    const postData: Prisma.PostCreateArgs['data'][] = [
      {
        title: 'Title 1',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 2',
        content:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 3',
        content:
          'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 4',
        content:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 5',
        content:
          'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 6',
        content:
          'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 7',
        content:
          'The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 8',
        content:
          'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 9',
        content:
          'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
      {
        title: 'Title 10',
        content:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        likes: Math.round(Math.random() * 20),
        author: { connect: { email: userData[0].email, id: userData[0].id } },
      },
    ]

    await Promise.all(
      //
      // Change to match your data model and seeding needs
      //

      postData.map(async (data: Prisma.PostCreateArgs['data']) => {
        const record = await db.post.create({ data })
        console.log(record)
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
