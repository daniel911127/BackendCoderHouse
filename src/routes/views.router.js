import Express from 'express';
const router = Express.Router();

const food = [
  { name: 'Hamburguesa', price: '100' },
  { name: 'Banana', price: '20' },
  { name: 'Soda', price: '40' },
  { name: 'Ensalada', price: '120' },
  { name: 'Pizza', price: '150' },
];
const users = [
  {
    name: 'Daniel',
    Last_name: 'Moreno',
    edad: 30,
    email: 'asdasd@gmail.com',
    telefono: '3122334546',
    role: 'user',
  },
  {
    name: 'Pepito',
    Last_name: 'Perez',
    edad: 27,
    email: 'dasd@gmail.com',
    telefono: '3039576435',
    role: 'admin',
  },
  {
    name: 'Miguel',
    Last_name: 'Henriquez',
    edad: 55,
    email: 'gftrdf@gmail.com',
    telefono: '3107659043',
    role: 'user',
  },
  {
    name: 'Luis',
    Last_name: 'Silva',
    edad: 38,
    email: 'asdasd@gmail.com',
    telefono: '3122334546',
    role: 'admin',
  },
  {
    name: 'Leo',
    Last_name: 'Castro',
    edad: 28,
    email: 'llesos@gmail.com',
    telefono: '3167543129',
    role: 'user',
  },
];

router.get('/', (req, res) => {
  const indice = Math.floor(Math.random() * users.length);

  res.render('index', {
    user: users[indice],
    style: 'index.css',
    isAdmin: users[indice].role === 'admin',
    food,
  });
});

router.get('/register', (req, res) => {
  console.log(users);
  res.render('register');
});

router.post('/user', (req, res) => {
  const { name, email, pass } = req.body;

  users.push({ name, email, pass });

  res.render('register', { registroExitoso: true });
});

router.get('/socket', (req, res) => {
  res.render('socket');
});
export default router;
