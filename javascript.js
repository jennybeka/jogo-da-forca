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
    let letrasCertas = [];
    let erros = 0; 
    const errosMax = 7;
    let trocarPalavra;
    let letra;
    let letraJ;
    let jogar;
    let mensagem;
    let letrasDigitadas;
    var objCaixa;
    var venceu = false;
	

    var bonecoAparece;
    let boneco;

    trocarPalavra = document.querySelector('#trocarPalavra');
    //letra = document.querySelector('letra'); //desnecessário
    letraJ = document.querySelector('#letraJ');
    jogar = document.querySelector('#jogar');
    mensagem = document.querySelector('#mensagem');
    letrasDigitadas = document.querySelector('#letrasDigitadas');
   // boneco = document.querySelector('#boneco'); //desnecessário
    
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
            objCaixa = document.getElementById('letra'+ i).value = "";
            objCaixa = document.getElementById('letra'+ i).style.display = "none";
        } 
        for (var i = 0; i < quantiaDeCaixa; i++){
            objCaixa = document.getElementById('letra'+ i).style.display = "inline-block";
        } 
        
    }

    function trocaDePalavra(){
        if (venceu == true) {
			resetar()
		}
		gerarPalavra();
        gerarCaixas();
        imprimirCaixas();
        desenho();
        letraJ.focus(); 
    }
    
    function desenho(){
            for (let i = 1; i <= errosMax; i++){
                bonecoAparece = document.getElementById('d'+ i).style.display = "none";
            } 
            for (let i = 1; i <= erros; i++){
                bonecoAparece = document.getElementById('d'+ i).style.display = "block";
            } 
            if(erros==errosMax){
                mensagem.innerHTML = `Que pena! Você perdeu.<br> 
                A palavra era ${palavraAleatoria}.
                Tenta mais uma vez..
                `
                letraJ.setAttribute("disabled", "disabled");
            }    
           
    }

    function encontraPosiPalavra(vetorPosicao){
     for(let i = 0; i < palavraAleatoria.length; i++){
         if(palavraAleatoria[i]==letraJ.value){
            vetorPosicao.push(i);
         }
     } return vetorPosicao;
    }
 
    function verificar(){
      if (letraJ.value == "") {
		  alert("Espaço não é um valor válido. Insira uma letra.");
	  } else {
		  
			var posiPalavra = []; //Sempre que "verificar" é chamado, o vetor é reiniciado, assim as letras seguintes não guardam as posições das letras anteriores
			posiPalavra = encontraPosiPalavra(posiPalavra);
			if(posiPalavra.length == 0){
				erros++;
				//erro a letra nao existe
				letrasErradas.push(letraJ.value);
				
			} else {//aqui a letra existe acertou
				for(let i = 0; i < posiPalavra.length; i++){
					// posiPalavra é o vetor que contém as posições da palavra aleatória em que a letra testada existe. Exemplo: banana, ao testar "a", posiPalavra conterá [1,3,5]
					var caixa = document.getElementById('letra'+ posiPalavra[i]);
					caixa.value = letraJ.value;   
					letrasCertas[posiPalavra[i]] = (letraJ.value);
					console.log("Letras certas: "+letrasCertas);
				} 
			}
			
			letraJ.value="";
			let todasLetras = [];
			todasLetras = letrasErradas.concat(letrasCertas);
			letrasDigitadas.innerHTML = "Letras digitadas: "+ todasLetras; // TODO: Incluir letras certas tambem
			//criar funçao que verifica se o jogo pode continuar
			desenho();   
			validaGanhouJogo();
	  }
   }

  function validaGanhouJogo(){

		//converter para string antes de comparar
		let letrasCertasString = letrasCertas.join("");
		
		if (letrasCertasString == palavraAleatoria) { //como letrasCertas recebe as letras na posição exata, podemos comparar os dois vetores normalmente, pois quando ganhar, será igual
			letraJ.setAttribute("disabled", "disabled");
			mensagem.innerHTML = `Muito bem! Você venceu!<br> 
                A palavra era "${palavraAleatoria}".<br>
				Clique em "Gerar Palavra" para jogar de novo.`
			venceu = true;
		}
		
  }

  function resetar(){
	  venceu = false; // como o jogo recomeçou, temos que indicar que o jogador ainda nao venceu
	  erros = 0; // os erros precisam ser reiniciados
	  letraJ.removeAttribute("disabled", "disabled");// a caixa precisa ser hab
	  letrasErradas = [];
	  letrasCertas = [];
	  letrasDigitadas.innerHTML = "";
	  mensagem.innerHTML = "";
      //jogando = false;
      
      //mensagem.innerHTML= ""; testando isso
  
  }


















window.addEventListener('load',init);
})();       