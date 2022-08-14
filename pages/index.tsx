import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import db from '../data/pokemons.json'
import axios from  'axios'
import { Loading } from './components/Loading'


const Home: NextPage = () => {

  const [search, setSearch] = useState<string>("")
  const [pokemonData, setPokemonData] = useState()
  const [type, setType] = useState<string | null>(null)
  const [hasError, setHasError] = useState<boolean | null>(null)
  const [isSendingRequest, setIsSendindRequest] = useState<boolean>(false)
  const [isRequestDone, setIsRequestDone] = useState<boolean>(false)
  const [codeError, setCodeError] = useState<number | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [height, setHeight] = useState<string | null>(null)
  const [weight, setWeight] = useState<string | null>(null)


  const setErrorModalAppear = () =>{

    setIsSendindRequest(false)
    setHasError(true)
    return false

  }

  const setPokeModalAppear = () =>{

    setHasError(false)
    setIsSendindRequest(false)
    //@ts-ignore
    setIsRequestDone(true)

    return "ok"

  }

  const handleSearch = async(event:any) => {

    event.preventDefault()

    setIsRequestDone(false)
    setIsSendindRequest(true)

    let validationPattern =  /^[A-Za-z][^0-9]/i;
   
    if(validationPattern.test(search)){

        try{

          let regex = /\w{6}/
          let firstLetterRegex = /^\w{1}/
          let regexed = firstLetterRegex.exec(regex.exec(search)!.toString())!.toString()
          regexed = regexed!.replace(/^\w{1}/, regexed.toLowerCase())

          const pokemon = db.results.filter(pokemon => {
            
            return pokemon.name.match(regexed+'')
  
          })
          console.log(pokemon)
          const {data} = await axios.get(pokemon[0].url)

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
         
          let firstLetter = firstLetterRegex.exec(data.name.toString())
          let nName = data.name.toString().replace(/^\w{1}/, firstLetter?.toString().toUpperCase())
          setName(nName)

          setPokemonData(data)
          
          setType(data.types[0].type.name) 
          setTimeout(setPokeModalAppear, 800)
          
        }catch(err:any){

          setTimeout(setErrorModalAppear, 400)
          setCodeError(401)

        }
        
     }else{

      setTimeout(setErrorModalAppear, 400)
        setCodeError(404)


      }
   
  }

  return (
    <div className={` main transition-colors duration-1000 ease-in-out bg-${type === null ? 'default' : type === 'water' ? 'water' : type === 'fire' ? 'fire' : 'leaf'} font-body max-w-full  min-h-screen`}>
      <Head>
        <title>PokeRegEx</title>
        <link rel="icon" href="/pokebola.png" />
      </Head>

      <div className='flex -mt-[3rem] h-auto  w-full max-w-4xl flex-col items-center  '>
        <h1 className=' text-white mb-[4.413rem] font-semibold text-[2.3rem] md:text-[3.125rem]'>
          PokeRegEx
        </h1>
        <div className='w-full flex items-center flex-col'>
          <div className='text-left max-w-[30rem] w-[18rem] md:w-full'>
            <h3 className='text-[1.2rem] md:text-[1.5rem] font-light text-white'>
              Nome de um pokemon
            </h3>
          </div>
          <input
          className='text-[1rem] md:text-[1.25rem] mb-[0.940rem] focus:shadow-outline focus:outline-none border-[1px] border-[#444444] text-[#565353] placeholder:text-[#BBB] pl-7 rounded-[0.4rem] h-[2.8rem] md:h-[3.2rem] max-w-[30rem] w-[18rem] md:w-full'
          placeholder='Bulbasauro'
          type='text'
          onChange={(event)=> setSearch(event.target.value)}
          />
          <button
          className='text-[1.013rem] items-center justify-center flex hover:bg-[#444444] transition-colors duration-200 text-white bg-[#565353] text-center rounded-[0.4rem] h-[2.8rem] md:h-[3.2rem] max-w-[30rem] w-[18rem] md:w-full'
          onClick={()=> {
            setHasError(false)
            setCodeError(null)
            handleSearch(event)

          }}
          >
            {isSendingRequest ? <Loading/> : 'Buscar'}
          </button>
          {
            !isRequestDone ? null :
            type !== null ? (
              
            <div className={`bg-white mt-5 slide-on rounded-lg max-w-[45rem] w-[18rem] md:w-full h-[29.2rem] md:h-[22.8rem]`}>
              <div className='flex items-center  flex-col justify-center'>
                <img
                //@ts-ignore
                src={ pokemonData?.sprites.front_default}
                //@ts-ignore
                alt={name}
                className=" max-w-[15.348rem]  mb-8 w-[8rem] md:w-[10rem] h-auto"
                />
                {/* @ts-ignore */}
                <h3 className='text-[1.3rem] -mt-9'>{name} - {pokemonData.id}</h3>
              </div>
              <div className='flex flex-wrap justify-center mt-4 text-lg  h-[7rem] flex-row'>
                <div className='flex  flex-col justify-center'>
                  {/* @ts-ignore */}
                  <h3 className='m-2 md:m-5'>Altura: {height} m</h3>
                   {/* @ts-ignore */}
                  <h3 className='m-2 md:m-5'>Peso: {weight} kg</h3>
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='flex m-5 flex-row justify-center'>
                    {/* @ts-ignore */}
                    <h3 >Tipo: </h3><span className={`bg-${type === 'water' ? 'pill-water' : type === 'fire' ? 'pill-fire' : 'pill-leaf'} text-white ml-4  pt-1 pb-1 pl-2 pr-2 rounded`}>{pokemonData.types[0].type.name}</span>
                  </div>
                  {/* @ts-ignore */}
                  <div className='flex  md:m-5 m-2 flex-row  flex-wrap justify-center'>
                    {/* @ts-ignore */}
                    <h3>Habilidades: </h3><span className={`bg-${type === 'water' ? 'pill-water' : type === 'fire' ? 'pill-fire' : 'pill-leaf'} text-white ml-4 p-1 rounded`}>{pokemonData.abilities[0].ability.name}</span><span className={`bg-${type === 'water' ? 'pill-water' : type === 'fire' ? 'pill-fire' : 'pill-leaf'} text-white ml-4 p-1 rounded`}>{pokemonData.abilities[1].ability.name}</span>
                  </div>
                </div>
              </div>
            </div>

            )
            :
            null
          }

          {hasError ?
          codeError === null ?
          null
          :
          (
            <div className="bg-red-100 absolute slide-on mt-40  easy rounded-lg py-3 md:py-5  px-6 mb-4 text-base text-red-700 " role="alert">
              {codeError === 404 ? 'Não são permitidos números' : 'Houve um erro, tente novamente!'}
            </div>
          )
            :
            null
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home
