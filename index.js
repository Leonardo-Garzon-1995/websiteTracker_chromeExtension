let myLeads = []
const InputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("unorder-list")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)   // by passing in the argument -myLeads- inside the () of the function render(), I'm reasigning a new parameter to the function, that is changing render(leads) for render(myLeads)
}


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })    
})

function render(leads) {  
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
            </li>
        `
    }  

    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

inputBtn.addEventListener("click", function() {
    myLeads.push(InputEl.value)
    InputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log( localStorage.getItem("myLeads") )
} )




