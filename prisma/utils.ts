import { uniqueNamesGenerator, Config, names } from 'unique-names-generator'
import { PrismaClient, FigureType, PoliticalParty } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hashPassword } from '../lib/auth'
const SEED_EMAIL_DOMAIN = 'seed.com'

export const prisma = new PrismaClient()

const generateUser = async (figureType?: FigureType) => {
  const config: Config = { dictionaries: [names] }
  const firstName = uniqueNamesGenerator(config)
  const lastName = uniqueNamesGenerator(config)
  const username = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`

  const user = await prisma.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      username,
      email: `${username}@${SEED_EMAIL_DOMAIN}`,
      password: await hashPassword('Abc1234!'),
      figureType
    }
  })
  return user
}

const generateConstituent = async (representedById?: string) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName })

  const partyOptions = Object.values(PoliticalParty)

  const constituent = await prisma.constituents.create({
    data: {
      name: `${firstName} ${lastName}`,
      email,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      county: faker.location.county(),
      partyAffiliation: faker.helpers.arrayElement(partyOptions),
      isActive: faker.datatype.boolean(0.8), // 80% chance of being active
      isVoter: faker.datatype.boolean(0.9), // 90% chance of being a voter
      approvalRating: faker.number.int({ min: 1, max: 10 }),
      representedById
    }
  })
  return constituent
}

export const generateSeedData = async (userCount = 10, constituentCount = 500) => {
  // Create users with different figure types
  const figureTypes = Object.values(FigureType)
  const users = await Promise.all(
    [...Array(userCount)].map((_, i) => generateUser(i < figureTypes.length ? figureTypes[i] : undefined))
  )

  // Generate constituents and distribute them among users
  const constituentPromises = []
  for (let i = 0; i < constituentCount; i += 1) {
    // Distribute constituents among users
    const userIndex = i % users.length
    const representedById = users[userIndex].id

    constituentPromises.push(generateConstituent(representedById))
  }

  const constituents = await Promise.all(constituentPromises)

  return { users, constituents }
}

export const deleteSeedData = async () => {
  // First delete constituents related to seed users
  await prisma.constituents.deleteMany({
    where: {
      representedBy: {
        email: { endsWith: `@${SEED_EMAIL_DOMAIN}` }
      }
    }
  })

  // Then delete seed users
  await prisma.user.deleteMany({
    where: { email: { endsWith: `@${SEED_EMAIL_DOMAIN}` } }
  })
}
