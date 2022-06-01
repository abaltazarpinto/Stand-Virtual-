

class Carro {
    

    constructor(idCarro,marcaCarro, numeroCavalosCarro, corCarro, precoCarro, modeloCarro, anoOrigemCarro, combustivelCarro, mesOrigemCarro, numeroKilometrosCarro, vendaCarro, imagemCarro) {
      
        this.id = idCarro; 
        this.marca = marcaCarro;
        this.numeroCavalos = numeroCavalosCarro;
        this.cor = corCarro;
        this.preco = precoCarro;
        this.modelo = modeloCarro;
        this.anoOrigem = anoOrigemCarro,
        this.combustivel = combustivelCarro; 
        this.mesOrigem = mesOrigemCarro;
        this.numeroKilometros = numeroKilometrosCarro;
        this.venda = vendaCarro;
        this.imagem = imagemCarro; 
        //this.definirImagem(); 
    }
    // Retorna o HTML necessário para que as informações do carro sejam apresentadas corretamente
    
    
    mostrar() {
        return `
            <div class="col-4 col-12-medium">
            <div class="item">
                     <p hidden>${this.id}</p>
                     <img src="stand_virtual/images/delete.png" alt="" class="icon remover"/>
                    <p class="nome">${this.marca} ${this.modelo}</p>
                    <figure>
                        <img src="https://www.formabase.com/api/stand/images/${this.imagem}" alt="">
                        <figcaption>${this.preco}€</figcaption>
                    </figure>
            
                    <div id="info">
                        <table>
                            <tr>
                                <td>Nº Cavalos</td>
                                <td><strong>${this.numeroCavalos}</strong></td>
                            </tr>
                            <tr>
                                <td>Cor</td>
                                <td><strong>${this.cor}</strong></td>
                            </tr>
                            <tr>
                                <td>Data de Fabrico </td>
                                <td><strong>${this.mesOrigem}- ${this.anoOrigem}</strong></td>
                            </tr>
                            <tr>
                                <td>Ano de Fabrico</td>
                                <td><strong>${this.anoOrigem}</strong></td>
                            </tr>
                            <tr>
                                <td>Combustivel</td>
                                <td><strong>${this.combustivel}</strong></td>
                            </tr>
                            <tr>
                                <td>Nº de Kilometros</td>
                                <td><strong>${this.numeroKilometros} km</strong></td>
                            </tr>
                            <tr>
                                <td>Venda Por</td>
                                <td><strong>${this.venda}</strong></td>
                             </tr>
                            
                        </table>
                    <div>
                </div>
            </div>
        `;
    }

    //Atribui ao campo imagem, o nome da imagem correspondente à marca escolhida no formulário    
    
    definirImagem() {
        this.imagem = this.marca.toLowerCase() + ".png"; 
    }

}




