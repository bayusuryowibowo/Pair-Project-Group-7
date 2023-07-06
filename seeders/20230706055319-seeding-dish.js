'use strict';
const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data/dishes.json','utf-8')).map((e)=>{
  e.createdAt = e.updatedAt = new Date()
  return e
})



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Dishes", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Dishes")
  }
};
