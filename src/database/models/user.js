import Sequelize, { Model } from "sequelize"

class User extends Model {
    static init(sequelize) {
        super.init({
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    msg: "email alread exists!"
                },
                validate: {
                    isEmail: {
                        msg: "insert a valid email!"
                    },
                    notNull: {
                        msg: "email is required!"
                    }
                }
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "username not empty!"
                    },
                    notNull: {
                        msg: "username is required!"
                    }
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "pasword not empty"
                    },
                    notNull: {
                        msg: "password is required!"
                    }
                }
            },
            professional_level: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    customValidate(value){
                        if(!["estágio","júnior","pleno","sênior"].includes(value)){
                            throw new Error("professional_level must be one of these: estágio, júnior, pleno, sênior")
                        }
                    },
                    notNull: {
                        msg: "professional_level is required!"
                    }
                }
            },
            kind_of_work: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    customValidate(value){
                        if(!["home office", "presencial", "hibrido"].includes(value)){
                            throw new Error("kind_of_work must be one of these: home office, presencial, hibrido")
                        }
                    },
                    notNull: {
                        msg: "kind_of_work is required!"
                    },
                }
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            timestamps: false,
            tableName: "users",
            sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.Department, { foreignKey: "manager_uuid", as: "departments" })
        this.hasOne(models.UserDepartment, { foreignKey: "user_uuid", as: "users_departments" })
    }
}

export default User