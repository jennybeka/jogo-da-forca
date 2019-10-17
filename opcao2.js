(function(){
    let biblioteca = new Array('oi','to');
/*     ('walter', 'aline', 'cecilia', 'rodrigo', 'cidades', 'coraçao', 'freud', 'jonatas', 
    'rafael', 'sorriso', 'javascript','sofrimento','mozilla','php','manga','mosquito', 'nina', 'lewis','einstein'); */
    console.log(biblioteca);
    let qtd;
    let posiDaPalavra;
    let palavraAleatoria;
    let quantiaDeCaixa;
    let letrasErradas = [];
    let acertos = [];
    let erros = 0; 
    const errosMax = 7;
    let trocarPalavra;
    let letra;
    let letraJ;
    let jogar;
    let mensagem;
    let letrasDigitadas;
    var objCaixa;
    var jogando = false;


    var bonecoAparece;
    let boneco;
    

    trocarPalavra = document.querySelector('#trocarPalavra');
    letra = document.querySelector('letra');
    letraJ = document.querySelector('#letraJ');
    jogar = document.querySelector('#jogar');
    mensagem = document.querySelector('#mensagem');
    letrasDigitadas = document.querySelector('#letrasDigitadas');
    boneco = document.querySelector('#boneco');
    
    function gerarPalavra(){
        qtd = biblioteca.length -1; //para não acessar uma posição que não existe

        posiDaPalavra = Math.round(Math.random()*qtd); 
        palavraAleatoria = biblioteca[posiDaPalavra];
        console.log(palavraAleatoria);
        console.log(posiDaPalavra);
    }

    function init(){
        jogar.addEventListener("click", verificar);
        trocarPalavra.addEventListener("click", trocaDePalavra);
         desenho();
     } 

    function gerarCaixas(){
        quantiaDeCaixa = palavraAleatoria.length;
        console.log(quantiaDeCaixa);
    }
    
    function imprimirCaixas() {
        for (var i = 0; i < 16; i++){
            objCaixa = document.getElementById('letra'+ i).value +"";
            objCaixa = document.getElementById('letra'+ i).style.display = "none";
        } 
        for (var i = 0; i < quantiaDeCaixa; i++){
            objCaixa = document.getElementById('letra'+ i).style.display = "inline-block";
        } 
        
    }

    function trocaDePalavra(){
        gerarPalavra();
        gerarCaixas();
        imprimirCaixas();
        desenho();
        letraJ.focus(); 
        ganhouJogo();
        reset();
    }
    
    function desenho(jogando){
            for (let i = 1; i <= errosMax; i++){
                bonecoAparece = document.getElementById('d'+ i).style.display = "none";
            } 
            for (let i = 1; i <= erros; i++){
                bonecoAparece = document.getElementById('d'+ i).style.display = "block";
            } 
            if(erros==7){
                mensagem.innerHTML = `Que pena! Você perdeu.<br> 
                A palavra era ${palavraAleatoria}.
                Tenta mais uma vez..
                `
                document.getElementById("letraJ").setAttribute("disabled", "disabled");
            }    
           
    }

    function gerarIndice(){
     var indice =[];
      for(let i = 0; i < palavraAleatoria.length; i++){
         if(palavraAleatoria[i]==letraJ.value){
            indice.push(i);
         }
     } return indice;
    }
 
    function verificar(){
       
      var indice2 = gerarIndice();//ele recomeça com o indice em branco, assim não preciso zera-lo
      if(indice2.length == 0){
          erros++;
         //erro a letra nao existe
         letrasErradas.push(letraJ.value);
         letrasDigitadas.innerHTML = "Letras digitadas: "+ letrasErradas;
         
         letraJ.value="";
      } else {//aqui a letra existe acertou
          for(let i = 0; i < indice2.length; i++){
            var caixa = document.getElementById('letra'+ indice2[i]);
            caixa.value = letraJ.value;   
          } 
       }
       acertos.push(letraJ.value);
        letraJ.value="";
      //criar funçao que verifica se o jogo pode continuar
        desenho();    
        ganhouJogo();
   }

  function ganhouJogo(){
    
   if( acertos.join("").localeCompare(objCaixa.length)){
        mensagem.innerHTML = "aff";
   }
    console.log(acertos);
    
  }

  function reset(){
      //jogando = false;
      
      //mensagem.innerHTML= ""; testando isso
  
  }


















window.addEventListener('load',init);
})();       