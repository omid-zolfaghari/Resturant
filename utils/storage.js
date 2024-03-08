function setData(data){
    localStorage.setItem("user", JSON.stringify(data.id))
}

function getData(term){
   const data = localStorage.getItem(term);
   return JSON.parse(data)
}

function removeData(){
    localStorage.removeItem("user")
}
export{setData, getData, removeData}