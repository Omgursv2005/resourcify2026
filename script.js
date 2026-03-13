const supabaseUrl = "https://atuxwrxuizzpdujhhfym.supabase.co"
const supabaseKey = "sb_publishable_hjbXUJLPtSgS9S0EvbXhFw__A4QE16S"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

let currentEmail = ""

async function registerUser(){

const name = document.getElementById("name").value
const email = document.getElementById("email").value

currentEmail = email

const { data, error } = await supabaseClient
.from("users")
.insert([{name,email}])

if(error){
console.log(error)
alert("Registration failed")
return
}

alert("Registered Successfully")

loadResources()
loadBookings()

}

async function loadResources(){

const { data } = await supabaseClient
.from("resources")
.select("*")

let html=""

data.forEach(r=>{

html += `
<div class="resource">
${r.name} (${r.type})
<button onclick="bookResource('${r.name}')">Book</button>
</div>
`

})

document.getElementById("resources").innerHTML = html

}

async function bookResource(name){

const date = new Date().toLocaleDateString()

const { data, error } = await supabaseClient
.from("bookings")
.insert([{
user_email: currentEmail,
resource_name: name,
date: date,
status: "Pending"
}])

if(error){
console.log(error)
alert("Booking failed")
return
}

alert("Resource Booked")

loadBookings()

}

async function loadBookings(){

const { data } = await supabaseClient
.from("bookings")
.select("*")
.eq("user_email",currentEmail)

let html=""

data.forEach(b=>{

html += `
<div class="resource">
${b.resource_name} - ${b.date} - ${b.status}
</div>
`

})

document.getElementById("bookings").innerHTML = html

}