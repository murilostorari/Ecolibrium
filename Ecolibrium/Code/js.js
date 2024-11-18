<span class="d-block d-md-inline-block align-super">
    <a href="https://murilostorari.vercel.app" target="_blank">
        <img src="https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Delttoria.png" alt="Logo" style="width: 120px; height: auto;">
    </a>
</span>

<script>
const Selectors = {
    FreeShippingMessage: '.free-shipping-message.font-medium.mb-4',
    MarkMessage: '.js-product-variants.mb-4 div:nth-child(1)', // Essa classe não será mais usada diretamente
    SkuMessage: '.font-small.opacity-60.mt-3.mb-2',
    FreeShippingTarget: '.js-product-form.mt-4',
    MarkMessageTarget: '.product-info .pt-md-3',
    SkuMessageTarget: '.js-product-variants-group.mb-3',
    TargetDiv: '.mb-4.font-medium',
    ProductSku: '.js-product-sku' // Classe que contém o SKU
};

function MoveElement(Element, Target, BeforeFirstChild = true) {
    if (Element && Target) {
        if (BeforeFirstChild) {
            Target.insertBefore(Element, Target.firstChild);
            console.log(`Elemento movido para o início com sucesso!`);
        } else {
            Target.appendChild(Element);
            console.log(`Elemento adicionado ao final com sucesso!`);
        }
    } else {
        console.log("Elemento ou destino não encontrado.");
    }
}

// Função para manipular o SKU e criar um label
function createLabelFromSku() {
    const skuDiv = document.querySelector(Selectors.ProductSku); // Supondo que o SKU esteja nesta div
    if (skuDiv) {
        const words = skuDiv.textContent.trim().split(" "); // Dividindo o SKU em palavras
        const lastWord = words.pop(); // Removendo e armazenando a última palavra
        console.log(`Última palavra do SKU removida: ${lastWord}`);
        
        // Atualizando o SKU original sem a última palavra
        const updatedSku = words.join(" "); // Reconstruindo a string sem a última palavra
        skuDiv.textContent = updatedSku; // Atualizando o HTML com o novo SKU sem a última palavra

        const labelDiv = document.createElement('label');
        labelDiv.className = 'form-label';
        labelDiv.innerHTML = `Marca: <strong class="js-insta-variation-label">${lastWord}</strong>`;
        console.log("Label criado com sucesso.");
        
        return labelDiv;
    }
    console.log("Div com o SKU do produto não encontrada.");
    return null; // Caso a div com o SKU não seja encontrada
}

// Movendo o "FreeShippingMessage" para o lugar certo
const FreeShippingMessage = document.querySelector(Selectors.FreeShippingMessage);
const FreeShippingTarget = document.querySelector(Selectors.FreeShippingTarget);
if (FreeShippingMessage && FreeShippingTarget) {
    FreeShippingTarget.style.setProperty("border-top", "1px solid rgba(57, 57, 57, .1)");
        FreeShippingTarget.style.setProperty("padding-top", "12px");
} else {
    console.log("Não foi possível encontrar 'FreeShippingMessage' ou 'FreeShippingTarget'.");
}

// Criando a nova div para agrupar SkuMessage e MarkMessage
const NewDiv = document.createElement('div');
NewDiv.style.display = "flex";
NewDiv.style.justifyContent = "space-between";
NewDiv.style.order = "1"; // Definindo a ordem da nova div

// Substituindo "MarkMessage" pelo label criado com a última palavra do SKU
const MarkMessageTarget = document.querySelector(Selectors.MarkMessageTarget);
const labelDiv = createLabelFromSku(); // Cria o label com a última palavra do SKU
if (labelDiv) {
    MoveElement(labelDiv, NewDiv); // Move o label criado para o alvo
} else {
    console.log("Não foi possível criar o label ou encontrar o alvo para movê-lo.");
}

// Estilizando o "SkuMessage" se ele existir
const SkuMessage = document.querySelector(Selectors.SkuMessage);
const SkuMessageTarget = document.querySelector(Selectors.SkuMessageTarget);
if (SkuMessage && NewDiv) {
    SkuMessage.style.setProperty("margin-top", "0", "important");
    SkuMessage.style.setProperty("font-size", "14px", "important");
    SkuMessage.style.setProperty("opacity", "1", "important");
    NewDiv.style.setProperty("padding-bottom", "6px");
    NewDiv.style.setProperty("margin-bottom", "12px");
    NewDiv.style.setProperty("border-bottom", "1px solid rgba(57, 57, 57, .1)");
    NewDiv.style.display = "flex";
    NewDiv.style.justifyContent = "space-between";
    // Inserir o SkuMessage antes do labelDiv
    MoveElement(SkuMessage, NewDiv, false);
}

// Adicionando SkuMessage e MarkMessage dentro da nova div
if (SkuMessage && MarkMessageTarget) {
    // Movendo o MarkMessage para dentro da nova div
    const MarkMessage = document.querySelector(Selectors.MarkMessage); // Pegando o MarkMessage
    if (MarkMessage) {
        NewDiv.appendChild(MarkMessage);  // MarkMessage vai ser o segundo
    } else {
        console.log("MarkMessage não encontrado.");
    }
    
    // Inserindo a nova div no MarkMessageTarget
    MarkMessageTarget.appendChild(NewDiv);
    console.log("Nova div criada e elementos adicionados com sucesso!");
} else {
    console.log("SkuMessage ou MarkMessageTarget não encontrados.");
}

const textosParaRemover = [
    "O pedido foi criado", 
    "Outro texto que você deseja remover", 
    "Texto qualquer aqui"
];

// Função para remover os textos indesejados da TargetDiv
function removerTextosIndesejados() {
    const targetDiv = document.querySelector('.d-grid.grid-md-auto-3.visible-when-content-ready .mb-4.font-medium');
    
    if (targetDiv) {
        targetDiv.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const textoAtual = node.nodeValue.trim();
                if (textosParaRemover.includes(textoAtual)) {
                    node.remove();
                    console.log(`Texto "${textoAtual}" removido com sucesso!`);
                }
            }
        });
    } else {
        console.log("TargetDiv não encontrada.");
    }
}

// Função para mover os ícones para as novas posições
function moverIcones() {
    const targetDiv = document.querySelector('.d-grid.grid-md-auto-3.visible-when-content-ready .mb-4.font-medium');
    
    if (targetDiv) {
        const divs = targetDiv.querySelectorAll('div'); // Seleciona todas as divs dentro de TargetDiv

        console.log("Total de divs encontradas na TargetDiv:", divs.length);  // Adicionando log para depurar
        
        divs.forEach((div, index) => {
            // Verifica se há um ícone SVG ou IMG dentro da div
            if (div.querySelector('svg') || div.querySelector('img')) {
                console.log(`Ícone encontrado no índice ${index}`);  // Adicionando log para depurar
                
                // Adiciona o ícone de data para o primeiro índice
                if (index === 0) {
                    div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Date-Icon.png)";  // ícone de data
                    console.log(`Ícone de Date aplicado ao índice ${index}`);
                }
                
                switch(index) {
                    case 1:  // "Estado" (Info-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Info-Icon.png)";
                        break;
                    case 2:  // "Pagamento" (Money-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Money-Icon.png)";
                        break;
                    case 3:  // "Meio de pagamento" (Payment-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Payment-Icon.png)";
                        break;
                    case 4:  // "Frete" (Truck-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Truck-Black.png)";
                        break;
                    case 5:  // "Endereço" (Location-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Location-Icon.png)";
                        div.style.backgroundPosition = "top left";
                        div.style.backgroundRepeat = "no-repeat";
                        div.style.backgroundSize = "18px 18px";
                        break;
                    default:
                        console.log("Ícone não encontrado no índice:", index);
                        break;
                }
            }
        });
    }
}

// Função para adicionar os ícones padrão caso não haja textos a remover
function adicionarIconesPadrao() {
    const targetDiv = document.querySelector('.d-grid.grid-md-auto-3.visible-when-content-ready .mb-4.font-medium');
    
    if (targetDiv) {
        const divs = targetDiv.querySelectorAll('div'); // Seleciona todas as divs dentro de TargetDiv

        divs.forEach((div, index) => {
            if (!(div.querySelector('svg') || div.querySelector('img'))) {
                console.log(`Ícone não encontrado no índice ${index}. Aplicando ícone padrão...`);

                switch(index) {
                    case 0:  // Ícone de Data
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Date-Icon.png)";
                        break;
                    case 1:  // Ícone de Estado (Info-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Info-Icon.png)";
                        break;
                    case 2:  // Ícone de Pagamento (Money-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Money-Icon.png)";
                        break;
                    case 3:  // Ícone de Meio de pagamento (Payment-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Payment-Icon.png)";
                        break;
                    case 4:  // Ícone de Frete (Truck-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Truck-Black.png)";
                        break;
                    case 5:  // Ícone de Endereço (Location-Icon)
                        div.style.backgroundImage = "url(https://raw.githubusercontent.com/murilostorari/Ecolibrium/main/Location-Icon.png)";
                        div.style.backgroundPosition = "top left";
                        div.style.backgroundRepeat = "no-repeat";
                        div.style.backgroundSize = "18px 18px";
                        break;
                    default:
                        console.log("Ícone não encontrado no índice:", index);
                        break;
                }
            }
        });
    }
}

// Função para verificar a presença dos textos indesejados
function verificarTextosEExecutarMovimento() {
    const targetDiv = document.querySelector('.d-grid.grid-md-auto-3.visible-when-content-ready .mb-4.font-medium');
    
    if (targetDiv) {
        let textosPresentes = false;

        // Verifica se algum texto da lista "textosParaRemover" está na TargetDiv
        targetDiv.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const textoAtual = node.nodeValue.trim();
                if (textosParaRemover.includes(textoAtual)) {
                    textosPresentes = true; // Se algum texto desejado for encontrado
                    console.log(`Texto "${textoAtual}" encontrado!`);
                }
            }
        });

        // Se algum texto indesejado foi encontrado, move os ícones e remove os textos
        if (textosPresentes) {
            console.log("Movendo os ícones e removendo textos...");
            moverIcones();  // Chama a função para mover os ícones
            removerTextosIndesejados();  // Chama a função para remover os textos
        } else {
            console.log("Nenhum texto indesejado encontrado. Adicionando ícones padrões...");
            adicionarIconesPadrao();  // Chama a função para adicionar os ícones padrões
        }
    }
}

// Função principal para executar todas as etapas
function executarProcesso() {
    // Verificar se há textos indesejados e mover os ícones se necessário
    verificarTextosEExecutarMovimento();
}

// Chama a função principal
executarProcesso();


document.querySelectorAll('#shoppingCartPage .cart-item').forEach(item => {
    // Verifica se existe um label de frete grátis no item
    const hasShippingLabel = item.querySelector('.mt-2.mb-1') !== null;
    
    if (hasShippingLabel) {
        // Seleciona o nome do item e aplica os estilos
        const itemName = item.querySelector('.cart-item-name');
        if (itemName) {
            itemName.style.maxHeight = '2.4em';
            itemName.style.width = '150px';
            itemName.style.display = 'block';
            itemName.style.webkitBoxOrient = 'vertical';
            itemName.style.webkitLineClamp = '2';
            itemName.style.lineHeight = '1.2em';
            itemName.style.overflow = 'hidden';
            itemName.style.textOverflow = 'ellipsis';
            itemName.style.marginBottom = '0.5rem';
            itemName.style.wordBreak = 'break-word';
        }
    }
});
</script>
