const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;



router.get('/', async (req, res) => {
  try {
    const userList = await userData.getAll();
    res.json(userList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {

  const { name, surname, number } = req.body;
  console.log(name);
  try {
    if (!number || !name || !surname)
      throw 'All field need to have valid values';
    if (name === "" || surname === "" || number == "")
      throw 'name, surname and number should not be be empty or null';
  } catch (e) {
    if (e && e.message) {
      res.status(400).json({ error: e.message });
    }
    else {
      res.status(400).json({ error: e });
    }
    return;
  }
  try {
    const restrauntList = await userData.create(number, name, surname);
    res.json(restrauntList);
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
