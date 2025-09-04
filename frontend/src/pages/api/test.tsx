import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export async function main() {
  try {
    await prisma.$connect()
  } catch (err) {
    return Error('DB接続失敗')
  }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await main()
//     const posts = await prisma.post.findMany()
//     return res.json({ message: 'Success', posts })
//   } catch (err) {
//     return res.json({ message: 'Error' })
//   } finally {
//     await prisma.$disconnect()
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email } = req.body
    await main()
    const post = await prisma.post.create({ data: { name, email } })
    res.status(200).json({ message: 'Success', post })
  } catch (err) {
    return res.json({ message: 'Error' })
  } finally {
    await prisma.$disconnect()
  }
}
