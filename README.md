# PokeRegEx
Uma pokedex desenvolvida com a pokeapi, feita utilizando regex(Regular Expressions) para o trabalho de Teoria da Computação

![image](https://user-images.githubusercontent.com/66142358/184545663-e0ceb3a4-ddba-4b18-bb55-a9bfbbf5c0bb.png)
![image](https://user-images.githubusercontent.com/66142358/184545644-8a911e5a-f1d7-4113-af84-6831d5e5a565.png)
![image](https://user-images.githubusercontent.com/66142358/184545654-f51be7de-00a8-411d-8cc9-f8484c8e93f9.png)
![image](https://user-images.githubusercontent.com/66142358/184545658-6caa98d7-094d-4801-9c4a-9e1612eddef8.png)

Como é projeto simples para portfolio que será também utilizado para trabalho, o banco de dados é limitado somente para os 9 primeiros pokemons da pokedex

## Problema que é resolvido

Atualmente websites estão em alta como nunca no mundo da programação, e conceitos de experiência do usuário e design são importantíssimos para definir o sucesso do projeto, assim como, garantir que os dados estejam no formato correto ou sejam salvos formatados. E para garantir que isso aconteça, utilizamos expressões regulares(regex) para controlar esses dados e como são exibidos. Nesse projeto temos uma pokedex que recebe o nome de um pokemon, verifica se condiz com o padrão, faz as mudanças necessárias para ser utilizado como filtro, filtra em um json com pokemons pré-determinados, caso encontre algum, pega a url do restante dos dados e faz uma requisição para completar a pokedex. Esses dados vem em json porém não estão formatados, sendo assim, o sistema aplica alguns regex e formata-os para que siga o design projetado

## Verifica se segue o padrão
```vs-code

let validationPattern =  /^[A-Za-z][^0-9]/i;
if(validationPattern.test(search)){

...

}else{

...
}

```

## Faz as formatações necessárias para que possa ser usado como filtro
```vs-code

let regex = /\w{6}/
let firstLetterRegex = /^\w{1}/
let regexed = regex.exec(search)!.toString()
let fRegexed = firstLetterRegex.exec(regexed)!.toString()
regexed = regexed!.toString().replace(/^\w{1}/, fRegexed.toLowerCase())

```

## Formata os dados vindos da requisição
```vs-code

let digitOneRegex = /^\d{1}/
let digitTwoRegex = /\d{1}$/

let digitOne = digitOneRegex.exec(data.weight.toString())
let digitTwo = digitTwoRegex.exec(data.weight.toString())
setWeight(digitOne+","+digitTwo)

let h2 = digitTwoRegex.exec(data.height.toString())
var h1

let test = /\d{2}/
if(test.test(data.height.toString())){

h1 = digitOneRegex.exec(data.height.toString())

}else{

h1 = digitOneRegex.exec(data.height.toString()) === h2 ? digitOneRegex.exec(data.height.toString()) : "0" 

}
setHeight(h1 + ',' + h2)

//regex criado acima
let firstLetter = firstLetterRegex.exec(data.name.toString())
let nName = data.name.toString().replace(/^\w{1}/, firstLetter?.toString().toUpperCase())
setName(nName)

```

## Iniciando

Antes de tudo é necessário possuir: git instalado no seu sistema, o ambiente node(gerenciador de pacotes e tudo mais), gerenciador de pacotes yarn(opcional)

## Clonando o repositório

```bash
git clone https://github.com/LeonardoFariaOliveira/PokeRegEx.git
```

## Instalando dependências 

OBS: Caso não possua yarn utilize: npm install

```bash
cd pokeregex
yarn
```

## Executando

OBS: Caso não possua yarn utilize: npm run dev

```bash
yarn dev
```
Após isso o ambiente estará rodando em http://localhost:3000/
