const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/DATN');
    console.log('System : Connect success');
  } catch (error) {
    console.log('System : Connect fail : ', error);
  }
}

module.exports = { connect };
