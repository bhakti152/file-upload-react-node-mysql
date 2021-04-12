module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("informations", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    picture: {
      type: DataTypes.BLOB("long"),
    },
    file: {
      type: DataTypes.BLOB("long"),
    },
  });

  return Image;
};
