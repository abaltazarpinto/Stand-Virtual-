			let carro1 = new Carro("BMW", 105, "Amarelo", 35000, "A5", 2018, "Gasolina", 10 , 15000, "particular");
			let carro2 = new Carro("Mercedes", 155, "Azul", 55000, "Benz", 2019, "Diesel", 6, 100000, "Stand"); 
			let listaCarros = [carro1, carro2]; 


		function atualizarLista() {
			const divCarros = document.querySelector("div.row.aln-center");
			divCarros.innerHTML = "";
			for (const carro of listaCarros) {
				divCarros.innerHTML += carro.mostrar(); 
			}
		}

		window.onload = function () {
			lerMarcas(); 
			lerCarros(); 
		}; 

		function criarNovoCarro() {
			let marca = document.formulario_carro.marca_carro.value;
			let modelo = document.formulario_carro.modelo_carro.value;
			let ano = parseInt(document.formulario_carro.ano_fabrico.value);
			let combustivel = document.formulario_carro.combustivel_carro.value;
			let cor = document.formulario_carro.cor_carro.value;
			let cavalos = parseInt(document.formulario_carro.numero_cavalos.value);
			let preco = parseFloat(document.formulario_carro.preco_carro.value);
			let mes = document.formulario_carro.mes_fabrico.value;
			let kilometros = document.formulario_carro.kilometros_carro.value;

			let novoCarro = new Carro(0, marca, cavalos, cor, preco, modelo, ano, combustivel,mes, kilometros);
			adicionarCarroAPI(novoCarro);

			location.reload(true);

			//listaCarros.push(novoCarro);

    //atualizarLista();
	}

		function lerCarros(parametrosFiltros = "") {
			fetch("https://www.formabase.com/api/stand/search/?" + parametrosFiltros )
				.then(function (resposta) {
					return resposta.json();
				})
				.then(function (carrosAPI) {
					console.log(carrosAPI); 
					listaCarros = []; 
					for (const carro of carrosAPI) {
						let novoCarro = new Carro(carro.id, carro.marca, carro.n_cavalos, carro.cor, carro.preco, carro.modelo, carro.ano, carro.combustivel, carro.mes, carro.kilometro, carro.venda, carro.imagem); 
						listaCarros.push(novoCarro); 
					}
					atualizarLista(listaCarros);
				
					const listaBotoesRemover = document.querySelectorAll(".remover");
					
					for (const botaoRemover of listaBotoesRemover) {
							botaoRemover.addEventListener("click", function () {
								let id = parseInt(this.previousElementSibling.innerText) 
								
								if ( id <= 21) {
									alert(`Não pode remover os carros de venda pelo stand, apenas os particulares`)
								}
								else if ( 
									
									confirm("Tem a certeza que pretende remover este carro?") === true) {
									let id = parseInt(this.previousElementSibling.innerText);
										removerCarro(id);
											}
								});
						}
					}	
				)} 

					
		function filtrar() {
			
				let marca = document.formularioFiltrar.marcaCarro.value;
				let modelo = document.formularioFiltrar.modeloCarro.value;
				let ano = parseInt(document.formularioFiltrar.anoFabrico.value);
				let cor = document.formularioFiltrar.corCarro.value;
				let combustivel = document.formularioFiltrar.combustivelCarro.value;
				let venda = document.formularioFiltrar.vendaCarro.value;
				let parametros = [];

			if (marca !== "") {
			parametros.push(`marca=${marca}`);
			}
			if (modelo !=="") {
				parametros.push(`modelo=${modelo}`);
			}
			if (!isNaN(ano)) {
				parametros.push(`cor=${cor}`);
			}
			if (combustivel !== "") {
				parametros.push(`combustivel=${combustivel}`);
			}
			if (venda !== "") {
				parametros.push(`venda=${venda}`); 
			}

			let parametrosFinais = parametros.join("&"); 

			lerCarros(parametrosFinais); 

		 
		};

		function lerMarcas() {
			fetch("https://www.formabase.com/api/stand/search/obtermarcas.php")
			.then(function (response) {
				return response.json(); 
			})
			.then(function (arrayMarcas) {
				console.log(arrayMarcas);
				let lista = document.formulario_carro.marca_carro; 
				lista.innerHTML = ""; 
				for (let marca of arrayMarcas) {
					lista.innerHTML += `<option value="${marca}">${marca}</option>`; 
				}
			});
		};

		function adicionarCarroAPI(novoCarro) {
			let informacoesCarro = [];
					informacoesCarro.push(`marca=${novoCarro.marca}`);
					informacoesCarro.push(`modelo=${novoCarro.modelo}`);
					informacoesCarro.push(`n_cavalos=${novoCarro.numeroCavalos}`);
					informacoesCarro.push(`combustivel=${novoCarro.combustivel}`);
					informacoesCarro.push(`cor=${novoCarro.cor}`);
					informacoesCarro.push(`ano=${novoCarro.anoOrigem}`);
					informacoesCarro.push(`mes=${novoCarro.mesOrigem}`);
					informacoesCarro.push(`kilometro=${novoCarro.numeroKilometros}`);
					informacoesCarro.push(`preco=${novoCarro.preco}`);

			fetch("https://www.formabase.com/api/stand/add/", {
					method: "post",
					headers: {
			"Content-type": "application/x-www-form-urlencoded;"
			},
				body: 
				//informação a inserir
				informacoesCarro.join("&")
		})
				.then(function (response) {
				return response.text();
			})
				.then(function (mensagem) {
						alert(mensagem);
						lerCarros();
			});
			}

			function removerCarro(id) {
				fetch("https://www.formabase.com/api/stand/remove/", {
						method: "post",
						headers: {
							"Content-type": "application/x-www-form-urlencoded;"
					},
				body:
						`id=${id}`
				})
						.then(function (response) {
							return response.text();
				})
						.then(function (mensagem) {
							alert(mensagem);
							lerCarros();
				});
				}
		