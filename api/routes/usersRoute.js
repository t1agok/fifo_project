const express = require('express');
const { User } = require('../models');
const router = express.Router();
const userController = require('../controllers/userController');
const { signup, login, verifyToken, getProtectedData } = userController;
const userAuth = require('../middleware/userAuth');

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup);

//login route
router.post('/login', login);

router.post('/logout', (req, res) => {
    res.clearCookie('jwt', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/protected', verifyToken, getProtectedData);

router.post('/usersRoute', async (req, res, next) => {
  try {
    const { username, password, email, full_name, role } = req.body;
    if (!username || !password || !email || !full_name || !role) {
      return res.status(400).send('Missing required fields');
    }
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
});
  

router.get('/usersRoute', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error); 
  }
});

router.get('/usersRoute/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/usersRoute/:id', async (req, res, next) => {
  try {
    await User.update(req.body, { where: { user_id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/usersRoute/:id', async (req, res, next) => {
  try {
    await User.destroy({ where: { user_id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
