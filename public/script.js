let users = [];
let availability = [];
let events = [];

/* ---------------- LOAD DATA ---------------- */
async function loadUsers() {
  users = await fetch("/users").then(r => r.json());
  renderUsers();
}

async function loadAvailability() {
  availability = await fetch("/availability").then(r => r.json());
  renderAvailability();
}

async function loadEvents() {
  events = await fetch("/events").then(r => r.json());
  renderEvents();
}

/* ---------------- TABS ---------------- */
function showTab(i){
  document.querySelectorAll(".tab").forEach((t,idx)=>{
    t.classList.toggle("active", idx===i);
  });
  document.querySelectorAll(".panel").forEach((p,idx)=>{
    p.classList.toggle("active", idx===i);
  });
}

/* ---------------- USERS ---------------- */
async function addUser(){
  let u=document.getElementById("newUser").value;
  if(!u) return;

  await fetch("/users", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ username:u })
  });

  loadUsers();
}

function renderUsers(){
  let sel=document.getElementById("userSelect");
  let list=document.getElementById("userList");

  sel.innerHTML="";
  list.innerHTML="";

  users.forEach(u=>{
    sel.innerHTML+=`<option>${u}</option>`;
    list.innerHTML+=`<div>${u}</div>`;
  });
}

/* ---------------- AVAILABILITY ---------------- */
async function addAvailability(){
  let username=document.getElementById("userSelect").value;
  let date=document.getElementById("availDate").value;
  let start=+document.getElementById("start").value;
  let end=+document.getElementById("end").value;

  await fetch("/availability", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ username, date, start, end })
  });

  loadAvailability();
}

function renderAvailability(){
  let box=document.getElementById("availList");
  box.innerHTML="";

  availability.forEach(a=>{
    box.innerHTML+=`<div>${a.username} ${a.date} (${a.start}-${a.end})</div>`;
  });
}

/* ---------------- EVENTS ---------------- */
async function addEvent(){
  let title=document.getElementById("eventTitle").value;
  let date=document.getElementById("eventDate").value;
  let desc=document.getElementById("eventDesc").value;

  await fetch("/events", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ title, date, desc })
  });

  loadEvents();
}

function renderEvents(){
  let box=document.getElementById("eventList");
  box.innerHTML="";

  events.forEach(e=>{
    box.innerHTML+=`<div><b>${e.title}</b> ${e.date}</div>`;
  });
}

/* ---------------- CALENDAR ---------------- */
function renderCalendar(){
  let cal=document.getElementById("calendar");
  cal.innerHTML="";

  let now=new Date();
  let year=now.getFullYear();
  let month=now.getMonth();

  let first=new Date(year,month,1).getDay();
  let days=new Date(year,month+1,0).getDate();

  for(let i=0;i<first;i++){
    cal.appendChild(document.createElement("div"));
  }

  for(let d=1;d<=days;d++){
    let div=document.createElement("div");
    div.className="day";

    let date=`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

    div.innerHTML=d;

    div.onclick=()=>showDay(date);

    cal.appendChild(div);
  }
}

/* ---------------- DAY INFO ---------------- */
function showDay(date){
  let box=document.getElementById("dayInfo");
  box.innerHTML=`<h3>${date}</h3>`;

  events.filter(e=>e.date===date).forEach(e=>{
    box.innerHTML+=`<div>📌 ${e.title}</div>`;
  });

  let avail = availability.filter(a=>a.date===date);
  if(avail.length){
    box.innerHTML+=`<hr><b>Availability:</b>`;
    avail.forEach(a=>{
      box.innerHTML+=`<div>${a.username}: ${a.start}-${a.end}</div>`;
    });
  }
}

/* ---------------- DELETE ---------------- */
async function deleteEvent(){
  let title=document.getElementById("delEvent").value;

  await fetch("/events", {
    method:"DELETE",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ title })
  });

  loadEvents();
}

async function deleteUser(){
  let username=document.getElementById("delUser").value;

  await fetch("/users", {
    method:"DELETE",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ username })
  });

  loadUsers();
  loadAvailability();
}

async function deleteAvailability(){
  let date=document.getElementById("delDate").value;
  let username=document.getElementById("delUser2").value;

  await fetch("/availability", {
    method:"DELETE",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ username, date })
  });

  loadAvailability();
}

/* ---------------- INIT ---------------- */
loadUsers();
loadAvailability();
loadEvents();
renderCalendar();
