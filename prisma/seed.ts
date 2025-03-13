/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { generateSeedData, prisma } from './utils'

// Generate 10 users and 500 constituents
generateSeedData(10, 500)
  .then(async ({ users, constituents }) => {
    console.log(`Created ${users.length} users`)
    console.log(`Created ${constituents.length} constituents`)
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
