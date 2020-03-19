const readline = require('readline-sync')
function start(){
    const content = {}
    content.pesquisaTermo = PerguntaEretornaTermo()
    content.prefixo = PerguntaEretornaPrefixo()
    function    PerguntaEretornaTermo(){
        return readline.question(' Type a Wikipedia Search term: ')
    }
    
    function PerguntaEretornaPrefixo(){
        const prefixos = ['Who is?','What is?',' The history.', ]
        const SelecionarPrefixoIndex =readline.keyInSelect(prefixos,"Choose one option.")
        const SelecionarPrefixoText = prefixos[SelecionarPrefixoIndex]
        
        return SelecionarPrefixoText

    }
   
    console.log(content)
}
start()