const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
      const example = await prisma.LaunchX.upsert({
        where: { name: 'Haim' },
        update: {},
        create: {
          name: 'Haim',
          lang: 'Javascript',
          missionCommander: 'CarloGilmar',
          enrollments: 1
        },
      });

    console.log('Create Explorer: ' + example);
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();