const algorithmia = require ('algorithmia')
const algorithmiachave = require  ("../credencial/algorithmia.json").apiKey
const sentecesBoundaryDetection = require('sbd')
async function robot(content){
  await buscarConteudoWikipedia(content)
  limparConteudoemarcador(content)
  quebrarConteudoemSentenca(content)
 async function buscarConteudoWikipedia(content){
            const algorithmiaAuthenticated = algorithmia(algorithmiachave)
            const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
            const wikipediaResponde = await wikipediaAlgorithm.pipe(content.pesquisaTermo)
            const wikipediaContent = wikipediaResponde.get()
            
            content.sourceContentOriginal = wikipediaContent.content

      }
    function limparConteudoemarcador(content){
           //Variaveis 
            const semLinhaEmBrancoemarcador = removerLinhaemBrancoemarcador(content.sourceContentOriginal)
            const withoutDatesInParentheses = removeDatesInParentheses(semLinhaEmBrancoemarcador)
            content.sourceContentSanitized= withoutDatesInParentheses
          
            // função para remover linhas em branco e marcadores
             function removerLinhaemBrancoemarcador(text){
                  const todasAslinhas = text.split('\n')
            
                  // remover linhas em branco
                  const semLinhaEmBrancoemarcador = todasAslinhas.filter((line) => {
                        if(line.trim().length ===0|| line.trim().startsWith('=')){
                              return false
                        }
                        return true
                  })
                  return semLinhaEmBrancoemarcador.join(' ')
             }    
      }                
      
      function removeDatesInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
       
      }
     
          function quebrarConteudoemSentenca(content){
            content.sentences = []
            const sentences = sentecesBoundaryDetection.sentences(content.sourceContentSanitized)
            sentences.forEach((sentence) => {
                  content.sentences.push({
                    text: sentence,
                    keywords: [],
                    images: []
                  })
                })
      }
}

module.exports = robot