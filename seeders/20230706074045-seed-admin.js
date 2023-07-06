'use strict';
const fs = require('fs')
const bcrpyt = require('bcryptjs')
const salt = bcrpyt.genSaltSync(10);

const data = JSON.parse(fs.readFileSync('./data/admin.json','utf-8')).map((e)=>{
  e.createdAt = e.updatedAt = new Date()
  e.password = bcrpyt.hashSync(e.password,salt)
  return e
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users")
  }
};
