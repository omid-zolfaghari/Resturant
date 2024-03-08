import { setData, getData, removeData } from "../utils/storage.js";

window.addEventListener("scroll", ()=>{
    const navbar = document.querySelector("#navbar");
    const arrowUp = document.querySelector(".back-to-top")
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        navbar.classList.add("bg-dark", "shadow")
        arrowUp.style.visibility = "visible"

    }else{
        // navbar.classList.remove("bg-dark", "shadow")
        arrowUp.style.visibility = "hidden"

    }
})

const exit = document.querySelector(".door");
exit.addEventListener("click", ()=>{
    removeData();
    window.location.replace("/sign up/sign up.html")
})

const main = document.querySelector("main")
// main.style.backgroundColor = "gray"


const cart = async()=>{
    const token = getData("user")
    const res =await fetch(`https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks/${token}`)
    const data = await res.json();
    const shopping = data.shopping

const finish = document.createElement("button");
finish.classList.add("btn", "btn-success", "my-5", "w-25")
finish.textContent = "pay";

    shopping.forEach(obj=>{
        
        const parentSection = document.createElement("section");
        parentSection.classList.add("my-5", "py-5")
        main.append(parentSection)
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("container", "py-1", "w-50");
        parentSection.appendChild(containerDiv);
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        containerDiv.append(rowDiv);
        const columnDiv = document.createElement("div");
        columnDiv.classList.add("col-md-12");
        rowDiv.appendChild(columnDiv);
        const parentCard = document.createElement("div");
        parentCard.classList.add("card");
        columnDiv.appendChild(parentCard);
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.textContent = "Senso :)"
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "bg-dark");
        
        parentCard.append(cardHeader, cardBody);
        const h5 = document.createElement("h2");
        h5.classList.add("card-title", "text-center", "text-white");
        h5.textContent = obj.name
        cardBody.appendChild(h5)
       const parentOfbtns = document.createElement("div");
       parentOfbtns.classList.add("d-flex", "justify-content-between", "w-25")
        cardBody.appendChild(parentOfbtns)
        const plusBtn = document.createElement("button")
        plusBtn.classList.add("btn", "btn-warning", "plus")
        plusBtn.textContent = "+"
        const numbersOfOrder = document.createElement("span");
        numbersOfOrder.textContent = obj.number;
        numbersOfOrder.classList.add("fw-bold", "text-light", "fs-3")
        const minusBtn = document.createElement("button");
        minusBtn.classList.add("btn", "btn-warning");
        minusBtn.textContent = "-"
        parentOfbtns.append(plusBtn, numbersOfOrder, minusBtn);
        const foodPrice = document.createElement("h5");
        foodPrice.textContent = `${obj.price} $`;
        foodPrice.classList.add("text-end", "text-white", "display-5")
        cardBody.append(foodPrice);
        let totalPrice = obj.number * obj.price;
        const totalPriceDiv = document.createElement("div");
        
        totalPriceDiv.textContent = `Total : ${totalPrice} $`;
        totalPriceDiv.classList.add("center","fs-3", "text-warning");
        cardBody.appendChild(totalPriceDiv)

        containerDiv.appendChild(finish)
        
        if(obj.number === 0){
            minusBtn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
        }
        
        plusBtn.addEventListener("click", async()=>{
        const res = await fetch(`https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks/${token}`);
            const data = await res.json();
            const newData = data.shopping;
    

            newData.forEach(obj=>{
                if(obj.name === h5.textContent){
                    obj.number++
                    numbersOfOrder.textContent = obj.number;
                    totalPrice = obj.number * obj.price;
                  totalPriceDiv.textContent = `total : ${totalPrice} $`;
                }

                if(minusBtn.disabled = true){
                    minusBtn.disabled = false
                }
         })
       
         const response = await fetch(`https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks/${token}`, {
           method : "PUT",
           body : JSON.stringify({
               shopping : newData
           }),
           headers : {
               "Content-Type": "application/json"
           }
       })
       const data3 = await response.json();
       return data3
           
        })
        minusBtn.addEventListener("click", async()=>{
            const res = await fetch(`https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks/${token}`);
                const data = await res.json();
                const newData = data.shopping;
                
                newData.forEach(obj=>{

                    if(obj.name === h5.textContent){
                        obj.number--
                        numbersOfOrder.textContent = obj.number;
                        totalPrice = obj.number * obj.price;
                        totalPriceDiv.textContent = `total : ${totalPrice} $`;

                        if(obj.number === 0){
                            // minusBtn.disabled = true
                            minusBtn.parentElement.parentElement.parentElement.remove()
                        }
                    }
                    
                })
                
             const response = await fetch(`https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks/${token}`, {
               method : "PUT",
               body : JSON.stringify({
                   shopping : newData
               }),
               headers : {
                   "Content-Type": "application/json"
               }
           })
           const data3 = await response.json();
           return data3
               
            })
    })


    
}
cart()

