const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //Cambio - SIn esto funciona local
      useCreateIndex: true,
      useFindAndModify: false,
      //Fin cambio
    });

    console.log("Base de datos online");
  } catch (err) {
    console.log(err);
    throw new Error("Error al inicializar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
