window.addEventListener("scroll", ()=>{
    const navbar = document.querySelector("#navbar");
    const arrowUp = document.querySelector(".back-to-top")
    
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        navbar.classList.add("bg-dark", "shadow")
        arrowUp.style.visibility = "visible"

    }else{
        navbar.classList.remove("bg-dark", "shadow")
        arrowUp.style.visibility = "hidden"
        
    }
})

const exit = document.querySelector(".door");
exit.addEventListener("click", ()=>{
    removeData();
    window.location.replace("./sign up.html")
})

const form = document.querySelector("form");

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    const fullName = form.elements.name
    const email = form.elements.mail
    const describe = form.elements.describe
    
    const res = await fetch("https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks", {
        method : "POST" ,
        body: JSON.stringify({
            fullName : fullName.value,
            email : email.value,
            describtion : describe.value
        }),
        headers: {"content-type": "application/json; charset=UTF-8"}
    })
    const data = await res.json();
    // console.log(data);
    fullName.value = ""
    email.value = ""
    describe.value = ""

    return data
})