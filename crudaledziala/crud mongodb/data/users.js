const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let exportedMethods = {
  async getAll() {
    const usersCollection = await users();
    let userList = await usersCollection.find({}).toArray();
    return userList;
  },

  async create(number, name, surname) {
    if (!number || !name || !surname)
      throw 'All field need to have valid values';
    if (name === "" || surname === "" || number == "")
      throw 'name, surname and number should not be be empty or null';

    const usersCollection = await users();
    let user = {
      number: number,
      surname: surname,
      name: name,
    };

    const insertInfo = await usersCollection.insertOne(user);
    if (insertInfo.insertedCount === 0) throw 'Could not add user';

    return { success: true };
  },


};

module.exports = exportedMethods;
