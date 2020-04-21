const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
    weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location = search.value
    messageOne.textContent='loading'
    messageTwo.textContent=''
    
    async function API(url){
        const baseUrl = 'http://localhost:3000/weather'
        const response = await fetch(baseUrl+url)
        const data = await response.json()
        return data
    }
    API('?address= '+location).then(data =>{
        if(data.error){
           messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
        }
    })
  
})