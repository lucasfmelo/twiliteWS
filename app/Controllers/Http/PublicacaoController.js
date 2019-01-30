'use strict'

const Publicacao = use('App/Models/Publicacao')

class PublicacaoController {

    async listar ({response}) {
        //let publicacoes = await Publicacao.query().orderBy('id', 'desc').fetch()
        let publicacoes = await Publicacao.query().innerJoin('usuarios', 'publicacaos.id_usuario', 'usuarios.id').orderBy('id', 'desc').fetch()

        return response.json(publicacoes)
    }

    async buscar ({params, response}) {
        const publicacao = await Publicacao.find(params.id)

        return response.json(publicacao)
    }

    async salvar ({request, response}) {
        const publicacaoInfo = request.only(['id_usuario', 'conteudo'])

        const publicacao = new Publicacao()
        publicacao.id_usuario = publicacaoInfo.id_usuario
        publicacao.conteudo = publicacaoInfo.conteudo
    
        await publicacao.save()
    
        return response.status(201).json(publicacao)
    }

    async atualizar ({params, request, response}) {
        const publicacaoInfo = request.only(['id_usuario', 'conteudo'])

        const publicacao = await Publicacao.find(params.id)
        if(!publicacao) {
            return response.status(404).json({data: 'Publicacao nao encontrada'})
        }
        publicacao.id_usuario = publicacaoInfo.id_usuario
        publicacao.conteudo = publicacaoInfo.conteudo

        await publicacao.save()

        return response.status(200).json(publicacao)
    }

    async apagar ({params, response}) {
        const publicacao = await Publicacao.find(params.id)
        if(!publicacao) {
            return response.status(404).json({data: 'Publicacao nao encontrada'})
        }
        await publicacao.delete()

        return response.status(204).json(null)
    }

}

module.exports = PublicacaoController
