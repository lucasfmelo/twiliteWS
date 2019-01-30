'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('usuarios', 'UsuarioController.salvar')
  Route.get('usuarios', 'UsuarioController.listar')
  Route.get('usuarios/:id', 'UsuarioController.buscar')
  Route.post('usuarios/buscar', 'UsuarioController.buscarPorLogin')
  Route.put('usuarios/:id', 'UsuarioController.atualizar')
  Route.delete('usuarios/:id', 'UsuarioController.apagar')
  Route.post('usuarios/notificar', 'UsuarioController.notificar')

  Route.post('publicacoes', 'PublicacaoController.salvar')
  Route.get('publicacoes', 'PublicacaoController.listar')
  Route.get('publicacoes/:id', 'PublicacaoController.buscar')
  Route.put('publicacoes/:id', 'PublicacaoController.atualizar')
  Route.delete('publicacoes/:id', 'PublicacaoController.apagar')
}).prefix('api/v1')