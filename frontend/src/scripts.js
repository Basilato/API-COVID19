/** 1º parte:

Você deverá criar um script (em sua linguagem de preferência) que, ao escolher um país (Brazil, France ou US),
 efetue a comunicação com o serviço descrito acima e retorne o número total de casos confirmados, recuperações
  e mortes (o serviço também traz os dados de cada estado e você pode ignorá-los).
2ª parte:

Você também deverá armazenar em um banco de dados (de sua preferência) a data de todos os acessos que seu
 script fez a Covid-19-API, bem como qual o país escolhido para a consulta.
3ª parte:

Você deverá criar uma interface gráfica que permita ao usuário escolher o país e visualizar os números de
 casos confirmados, recuperações e mortes. Além disso, a interface deve conter um aviso no rodapé, informando
  a data do último acesso à Covid-19-API.*/
  async function getRegistros() {
    try {
        const response = await fetch('http://localhost:3333/registros')
        const data = await response.json()
        var ultimo = data[data.length - 1];
        document.getElementById('idUltimo').innerHTML = ("Último acesso à Covid-19-API ") + ultimo.datab;
        apiReload(ultimo.pais);
    } catch (error) {
        console.log(error);
    }
}

function stopDefAction(evt) {
    evt.preventDefault();
    const name = document.querySelector("#name");

    const value = name.value;
    apiGet(value);
}

document.getElementById('send').addEventListener('click', stopDefAction, false);


async function apiReload(state) {
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${state}`)
        .then(function (response) {
            if (!response.ok) throw new Error('Erro ao executar requisição');
            return response.json();
        })
        .then(await function (apiResult) {
            document.getElementById('idh2').innerHTML = apiResult.All.country;
            document.getElementById('idLCasos').innerHTML = "Casos Confirmados";
            document.getElementById('idCasos').innerHTML = apiResult.All.confirmed;
            document.getElementById('idLRecuperados').innerHTML = "Casos Recuperados";
            document.getElementById('idRecuperados').innerHTML = apiResult.All.recovered;
            document.getElementById('idLMortos').innerHTML = "Fatalidades";
            document.getElementById('idMortos').innerHTML = apiResult.All.deaths;
            
         });

}


async function apiGet(state) {
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${state}`)
        .then(function (response) {
            if (!response.ok) throw new Error('Erro ao executar requisição');
            return response.json();
        })
        .then(await function (data) {
            resultadoTela(data);  
            
         });

}

function resultadoTela(apiResult) {
        
    if (apiResult.hasOwnProperty('Global') == true) {
        
        document.getElementById('idNE').innerHTML = "Busca ajustada como Global por não encontrar o pais desejado ";
        document.getElementById('idh2').innerHTML = "Global";
        document.getElementById('idLCasos').innerHTML = "Casos Confirmados";
        document.getElementById('idCasos').innerHTML = apiResult.Global.All.confirmed;
        document.getElementById('idLRecuperados').innerHTML = "Casos Recuperados";
        document.getElementById('idRecuperados').innerHTML = apiResult.Global.All.recovered;
        document.getElementById('idLMortos').innerHTML = "Fatalidades";
        document.getElementById('idMortos').innerHTML = apiResult.Global.All.deaths;

    } else {

        dataAtual = retornarData();
        postRegistros(dataAtual, apiResult.All.country);

        

    }

}

function retornarData() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;
    return (dataAtual);
}

function postRegistros(dataAtual, state) {
    
    try {
        var contrData = dataAtual;
        var contrPais = state;
     
        fetch("http://localhost:3333/registros", {
            method: 'POST',
            body: JSON.stringify({
                pais: contrPais,
                datab: contrData
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
    } catch (error) {
        console.log(error)
    }
    
}
