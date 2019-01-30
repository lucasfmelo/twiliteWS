'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublicacaoSchema extends Schema {
  up () {
    this.create('publicacaos', (table) => {
      table.increments()
      table.string('id_usuario').nullable()
      table.string('conteudo').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('publicacaos')
  }
}

module.exports = PublicacaoSchema
