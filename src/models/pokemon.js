const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : {
        msg : 'Le nom est déja pris'
      },
      validate :{
        notEmpty : {msg: 'le nom ne peut pas etre null.'},
        notNull :{msg:'Le nom est une propriete requise.'}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt : {msg:'Utiliser uniquement des nombres entier pour les points de vie.'},
        notNull : {msg : 'les points de vie sont une propriété requise.'},
        min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
        },
        max: {
          args: [999],
          msg: 'Les points de vie doivent être inférieures ou égales à 999.'
        },
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt : {msg:'Utiliser uniquement des nombres entier pour les points de degat.'},
        notNull : {msg : 'les points de vie sont une propriété requise.'}
      },
      min: {
        args: [0],
        msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
      },
      max: {
        args: [999],
        msg: 'Les points de vie doivent être inférieures ou égales à 999.'
      },
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl : {msg:'Utiliser uniquement un URL valide.'},
        notNull : {msg : 'les points de vie sont une propriété requise.'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return this.getDataValue('types').split(',')
      },
      set(types){
        this.setDataValue('types', Array.isArray(types) ? types.join() : types)
      },
      validate :{
        isTypesValid(value) {
          // Accepter soit un tableau, soit une chaîne non vide
          const typesArr = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [];
          if (!Array.isArray(typesArr) || typesArr.length === 0 || typesArr[0] === '') {
            throw new Error('Un pokémon doit au moins avoir un type.');
          }
        
          if(value.split(',').length > 3){
            throw new Error('Un pokémon ne peux pas avoir plus de trois type.')
          }
          value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type pokémon doit appartenir à la liste suivante: ${validTypes}`)
              }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}