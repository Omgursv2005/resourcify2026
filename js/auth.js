async function register(){

const name=document.getElementById("name").value
const email=document.getElementById("email").value
const password=document.getElementById("password").value

const {data,error}=await supabase.auth.signUp({

email:email,
password:password

})

if(error){

alert(error.message)
return

}

await supabase.from("users").insert([{

id:data.user.id,
name:name,
email:email,
role:"user"

}])

alert("Registration successful")

}

async function login(){

const email=document.getElementById("login_email").value
const password=document.getElementById("login_password").value

const {data,error}=await supabase.auth.signInWithPassword({

email:email,
password:password

})

if(error){

alert(error.message)
return

}

window.location="dashboard.html"

}

async function logout(){

await supabase.auth.signOut()

window.location="index.html"

}
