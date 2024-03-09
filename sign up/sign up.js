import { setData, getData, removeData } from "../utils/storage.js"

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

const signInForm = document.querySelector(".signIn");
const signUpForm = document.querySelector(".signUp");

signUpForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    let emailInput = signUpForm.elements.username.value
    // console.log(emailInput);
    let fullNameInput = signUpForm.elements.name.value
    let passwordInput = signUpForm.elements.password.value
    let phoneNumber = signUpForm.elements.phone.value;

    
    const newData = await checkUser(emailInput.trim())
    console.log(newData);
    if(newData.statusCode === 201){
        if(passwordInput.length < 8){
            alert("your password must be more than 8 characters")
        }else{
            const result = await postUser(fullNameInput.trim(), emailInput.trim(), passwordInput.trim(), phoneNumber.trim());
        alert("signed up successfuly");
        setTimeout(()=>{
         setData(result)
         window.location.replace("/home page/index.html")
        }, 2000)
     }
  }
  emailInput = "";
  fullNameInput = "";
  passwordInput = "";
  phoneNumber = "";

// window.location.reload()
})

const checkUser = async(email1)=>{
    const res = await fetch("https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks")
    const data = await res.json();
    let newData
    data.forEach(object =>{
        console.log(object.email);
        if(object.email === email1){
            newData = {
                statusCode : 409,
                message : "this email is already exist! "
            }
        }else{
            newData={
                statusCode : 201,
                message : "signed up successfuly"
            }
        }
    })
    return newData
}


const postUser = async(fullName, email, password, phoneNumber)=>{
 const res = await fetch("https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks", {
    method : "POST",
    body : JSON.stringify({
        fullName,
        email,
        password,
        phoneNumber,
        shopping : []
    }),
    headers: {
        "Content-Type": "application/json"
    }
 })
 const data = res.json()
 return data
}


signInForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    let emailInput = signInForm.elements.username1.value;
    let passwordInput = signInForm.elements.password1.value;
    let resultArray = await checkUserLogIn(emailInput.trim(), passwordInput.trim());
     
    if(resultArray.length < 1){
        alert("email or password incorrect")
    }else{
        setTimeout(()=>{
            setData(resultArray[0])
            window.location.replace("./index.html")       
        },2000)
    }
    emailInput = "";
    passwordInput = "";
})

const checkUserLogIn = async(email, password)=>{
    const res = await fetch("https://65d20dfb987977636bfbe2d4.mockapi.io/feedbacks");
    const data = await res.json();
    const arr = []
    data.forEach(object=>{
        if(object.email === email && object.password === password){
            console.log("done");
            arr.push(object);
            alert("logged in successfuly")
        }
    })
    return arr
}