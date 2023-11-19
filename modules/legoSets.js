require("dotenv").config();

const Sequelize = require("sequelize");

const DB_USER = process.env.DB_USER;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

// set up sequelize to point to our postgres database
let sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

const Theme = sequelize.define(
  "Theme",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false, // Disables createdAt and updatedAt
  }
);

const Set = sequelize.define(
  "Set",
  {
    set_num: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    num_parts: {
      type: Sequelize.INTEGER,
    },
    theme_id: {
      type: Sequelize.INTEGER,
    },
    img_url: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false, // Disables createdAt and updatedAt
  }
);

Set.belongsTo(Theme, { foreignKey: "theme_id" });

function initialize() {
  return sequelize
    .sync()
    .then(() => {
      console.log("Database synced");
    })
    .catch((err) => {
      console.error("Error syncing database:", err);
      throw err;
    });
}

function getAllSets() {
  return Set.findAll({ include: [Theme] });
}

function getSetByNum(setNum) {
  return Set.findOne({
    where: { set_num: setNum },
    include: [Theme],
  }).then((set) => {
    if (!set) throw new Error("Unable to find requested set");
    return set;
  });
}

function getSetsByTheme(theme) {
  return Set.findAll({
    include: [
      {
        model: Theme,
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${theme}%`,
          },
        },
      },
    ],
  }).then((sets) => {
    if (sets.length === 0) throw new Error("Unable to find requested sets");
    return sets;
  });
}

// addSet(setData)
function addSet(setData) {
  return Set.create(setData).catch((err) => {
    throw new Error(err.errors[0].message);
  });
}

// getAllThemes()
function getAllThemes() {
  return Theme.findAll();
}

function editSet(set_num, setData) {
  return Set.update(setData, { where: { set_num } })
    .then(() => {
      /* ... */
      return "Update successful";
    })
    .catch((err) => {
      throw new Error(err.errors[0].message);
    });
}

function deleteSet(set_num) {
  return Set.destroy({
    where: { set_num },
  })
    .then(() => {
      return "Deleted successfully";
    })
    .catch((err) => {
      throw new Error(err.errors[0].message);
    });
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
  addSet,
  getAllThemes,
  editSet,
  deleteSet,
};
