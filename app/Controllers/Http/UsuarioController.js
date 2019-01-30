'use strict'

const Mail = use('Mail')
const Usuario = use('App/Models/Usuario')

class UsuarioController {

    async listar ({response}) {
        let usuarios = await Usuario.all()

        return response.json(usuarios)
    }

    async buscar ({params, response}) {
        const usuario = await Usuario.find(params.id)

        return response.json(usuario)
    }

    async buscarPorLogin ({request, response}) {
        const req = request.only(['login'])
        
        const usuario = await Usuario.query().where('login', 'LIKE', req.login).fetch()

        return response.json(usuario)
    }

    async salvar ({request, response}) {
        const usuarioInfo = request.only(['login', 'senha', 'email'])

        const usuario = new Usuario()
        usuario.login = usuarioInfo.login
        usuario.senha = usuarioInfo.senha
        usuario.email = usuarioInfo.email
    
        await usuario.save()
    
        return response.status(201).json(usuario)
    }

    async atualizar ({params, request, response}) {
        const usuarioInfo = request.only(['login', 'senha', 'email'])

        const usuario = await Usuario.find(params.id)
        if(!usuario) {
            return response.status(404).json({data: 'Usuario nao encontrado'})
        }
        usuario.login = usuarioInfo.login
        usuario.senha = usuarioInfo.senha
        usuario.email = usuarioInfo.email

        await usuario.save()

        return response.status(200).json(usuario)
    }

    async apagar ({params, response}) {
        const usuario = await Usuario.find(params.id)
        if(!usuario) {
            return response.status(404).json({data: 'Usuario nao encontrado'})
        }
        await usuario.delete()

        return response.status(204).json(null)
    }

    async notificar ({request, response}) {
        let usuarios = await Usuario.all()

        for(usuario in usuarios) {
            await Mail.send('emails.notificar', usuario, 
            (message) => {
                message
                    .to(usuario.email)
                    .from('twilite@twilite.com')
                    .subject('Twilite - Novo post')
            })
        }
    
        return 'Email enviado com sucesso!'
    }
    
}

module.exports = UsuarioController
