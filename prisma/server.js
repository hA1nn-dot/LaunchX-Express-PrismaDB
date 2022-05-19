const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

app.get('/explorers', async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
  });

  app.get('/explorers/:id', async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
  });

  app.post('/explorers', async (req, res) => {
    const explorer = {
      name: "Haim",
      username: "hA1nn-dot",
      mission: "Node"
     };
    const message = 'Explorer creado.';
    await prisma.explorer.create({data: explorer});
    return res.json({message});
  });

  app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: "Java"
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente",id: id});
});

app.get('/launchX', async (req, res) => {
  const allExplorers =  await prisma.LaunchX.findMany({});
  res.json(allExplorers);
});

app.get('/launchX/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.LaunchX.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});

app.post('/launchX', async (req, res) => {
  const explorer = {
    name: "Juan",
    lang: "Java",
    missionCommander: "FerOchoa",
    enrollments: 5
   };
  const message = 'Explorer creado.';
  await prisma.LaunchX.create({data: explorer});
  return res.json({message});
});