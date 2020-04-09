messageOne = document.querySelector('#message-1')
messageTwo = document.querySelector('#message-2')


const fetchingaction=(searchValue) =>{
    fetch('/weather?search='+searchValue).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                messageOne.textContent  = data.error
                messageTwo.textContent  =''

            }else{
                messageOne.textContent  = data[0].location
                messageTwo.textContent  = data[0].forecast
    
            }
        })
    })
    
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    messageOne.textContent ='Loading...'
    e.preventDefault()
    const location = search.value
    fetchingaction(location)
})


