// Liste des types valides qu'un pokémon peut avoir
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

// Définition du modèle 'Pokemon' avec Sequelize
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    // Identifiant unique auto-incrémenté pour chaque pokémon
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Nom du pokémon
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Champ obligatoire
      unique: {
        msg: 'Le nom est déjà pris.'
      },
      validate: {
        // La longueur du nom doit être comprise entre 1 et 25 caractères
        len: {
          args: [1, 25],
          msg: 'Le nom doit contenir entre 1 et 25 caractères.'
        },
        notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        notNull: { msg: 'Le nom est une propriété requise.'}
      }
    },
    // Points de vie du pokémon (hp)
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false, // Champ obligatoire
      validate: {
        // Doit être un entier
        isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
        // Valeurs minimales et maximales acceptées
        min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
        },
        max: {
          args: [999],
          msg: 'Les points de vie doivent être inférieures ou égales à 999.'
        },
        notNull: { msg: 'Les points de vie sont une propriété requise.'}
      }
    },
    // Points de dégâts du pokémon (cp)
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false, // Champ obligatoire
      validate: {
        // Doit être un entier
        isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégâts.' },
        // Valeurs minimales et maximales acceptées
        min: {
          args: [0],
          msg: 'Les points de dégâts doivent être supérieurs ou égales à 0.'
        },
        max: {
          args: [99],
          msg: 'Les points de dégâts doivent être inférieures ou égales à 99.'
        },
        notNull: { msg: 'Les points de dégâts sont une propriété requise.'}
      }
    },
    // URL de l'image du pokémon
    picture: {
      type: DataTypes.STRING,
      allowNull: false, // Champ obligatoire
      validate: {
        // Doit être une URL valide
        isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' },
        notNull: { msg: 'L\'image est une propriété requise.'}
      }
    },
    // Types du pokémon, sous forme de chaîne de caractères séparés par des virgules
    types: {
      type: DataTypes.STRING,
      allowNull: false, // Champ obligatoire
      // Permet de récupérer les types sous forme de tableau lors de l'accès à l'objet
      get() {
        return this.getDataValue('types').split(',')
      },
      // Permet de stocker les types sous forme de chaîne de caractères lors de la sauvegarde
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        // Validation personalisée pour vérifier la cohérence des types
        isTypesValid(value) {
          if(!value) {
            throw new Error('Un pokémon doit au moins avoir un type.')
          }
          // Un pokémon ne peut pas avoir plus de 3 types
          if(value.split(',').length > 3) {
            throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
          }
          // Chaque type doit appartenir à la liste des types valides
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
    // Options du modèle : ajoute un champ 'created' pour la date de création, mais pas de champ 'updated'
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}