import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],
      },
    },

    role: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async login => {
    let foundUser = await User.findOne({
      where: { username: login },
    });

    if (!foundUser) {
      foundUser = await User.findOne({
        where: { email: login },
      });
    }

    return foundUser;
  };
  User.beforeCreate(async createdUser => {
    createdUser.password = await createdUser.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    console.log('password', password);
    return bcrypt.compare(password, this.password);
  };

  return User;
};

export default user;
