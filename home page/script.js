import { setData, getData, removeData } from "../utils/storage.js"


window.addEventListener("scroll", ()=>{
    const navbar = document.querySelector("#navbar");
    const arrowUp = document.querySelector(".back-to-top")
    if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
        navbar.classList.add("bg-dark", "shadow");
        arrowUp.style.visibility = "visible"
    }else{
        navbar.classList.remove("bg-dark", "shadow")
    arrowUp.style.visibility = "hidden"

    }
})

const exit = document.querySelector(".door");
exit.addEventListener("click", ()=>{
    removeData();
    window.location.replace("/sign up/sign up.html")
})


const offers = document.querySelectorAll(".offer");
const bag = document.querySelector(".bag")


offers.forEach(offer=>{
    offer.addEventListener("click",async(e)=>{
const token = getData("user");
if(token){
    const badge = document.createElement("span");
          badge.classList.add("position-absolute","bg-warning", "top-0", "start-25", "translate-middle", "p-2", "border", "border-warning", "rounded-circle")
          const spanInBadge = document.createElement("span")
          spanInBadge.textContent = "New alerts"
          spanInBadge.classList.add("visually-hidden");
          badge.append(spanInBadge);
          bag.appendChild(badge);
          
    const foodPrice = offer.firstElementChild.innerText;
    console.log(foodPrice);
    const foodName = offer.previousElementSibling.innerText;

    const objectShop = {
        name : foodName,
        price : foodPrice,
        number : 1
    }
     await addToList(objectShop, token)
}else{
    const isTrue=confirm('please login/sign up first')
            if(isTrue){
                window.location.replace('/sign up/sign up.html')
            }
}

      
    })
})

const addToList = async(object, userId)=>{
try{
    let isPlus = false
    const res = await fetch(`https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks/${userId}`);
    const data = await res.json();
    const newData = data.shopping;
    console.log(newData);
    if(newData.length > 0){
        newData.forEach(obj=>{
            if(obj.name === object.name){
                obj.number++
                isPlus = true
            }
        })
    }
    if(!isPlus){
        newData.push(object)
    }
    const res1=await fetch(`https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks/${userId}`, {
        method:'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({shopping:newData})
    })
    const data1=await res1.json()
    console.log(data1);
}catch(e){
    console.log(e);
}

}