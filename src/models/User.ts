import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// User.init(
//   {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     first_name: { type: DataTypes.STRING, allowNull: false },
//     last_name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true,

//     validate: {

//       valid : function (email: string | string[]) {
//         if (!email.includes('@')) {
//           throw new Error('please enter a valid email address');
//         }
//   }}}},


User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        valid(value: string) {
          if (!value.includes('@')) {
            throw new Error('Please enter a valid email address');
          }
        },
      },
    },
  },


  
  {
    sequelize,
    tableName: "Users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
