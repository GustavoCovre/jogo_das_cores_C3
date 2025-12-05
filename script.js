// LISTA DE CORES E DICAS
const colors = {
    neon: ["Cor bem chamativa", "Muito presente em letreiros"],
    jade: ["Nome de pedra preciosa", "Tonalidade verde"],
    malva: ["Tons lilás", "Nome começa com M"],
    carmim: ["Tom forte avermelhado", "Usado em tintas e cosméticos"],
    âmbar: ["Cor inspirada em resina fossilizada", "Mistura de amarelo com marrom"],
    obsidiana: ["Nome de rocha vulcânica", "Tom escuro, quase preto"],
    menta: ["Cor refrescante", "Tonalidade verde-clara"],
    petróleo: ["Cor azul esverdeado escuro", "Lembra cor de combustível"]
};

const colorNames = Object.keys(colors);
let secretColor = colorNames[Math.floor(Math.random()*colorNames.length)];
let attempts = 3;
let hintCount = 0; 

const input = document.getElementById("colorInput");
const result = document.getElementById("result");
const tries = document.getElementById("tries");
const guessButton = document.getElementById("guessButton");
const restart = document.getElementById("restart");
const hintButton = document.getElementById("hintButton");


const normalize = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

// VERIFICA RESPOSTA
guessButton.addEventListener("click",()=>{
    const guess = normalize(input.value);

    if(!guess){
        info("Nenhum comando detectado", false);
        return;
    }

    if(guess===normalize(secretColor)){
        info(`✔ Acesso Garantido - Cor era: ${secretColor}`, true);
        endGame();
        return;
    }

    attempts--;
    tries.textContent = attempts;

    if(attempts>0){
        info("✖ Cor incorreta, tente novamente.", false);
    }else{
        info(`💀 Acesso negado. Cor correta: ${secretColor}`, false);
        endGame();
    }
});

// DICAS
hintButton.addEventListener("click",()=>{
    if(hintCount < 2){
        result.textContent = `💡 DICA ${hintCount+1}: ${colors[secretColor][hintCount]}`;
        result.className="output";
        hintCount++;
    }else{
        result.textContent = "⚠ Sem mais dicas disponíveis!";
    }
});

// FINALIZA O JOGO
function endGame(){
    input.disabled=true;
    guessButton.disabled=true;
    hintButton.disabled=true;
    restart.style.display="block";
}

// REINICIA O JOGO
restart.addEventListener("click",()=>{
    secretColor = colorNames[Math.floor(Math.random()*colorNames.length)];
    attempts = 3;
    hintCount = 0;

    input.disabled=false;
    guessButton.disabled=false;
    hintButton.disabled=false;

    input.value="";
    tries.textContent=attempts;
    result.textContent="";
    restart.style.display="none";
});

// EXIBE MENSAGENS
function info(msg, success=false){
    result.textContent = msg;
    result.className = "output " + (success ? "success":"error");
}
