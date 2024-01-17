const base = document.querySelector("#base");
const p = document.createElement("p");
p.innerHTML = "paragraph dynamic";
p.classList.add("red-paragraph")
base.appendChild(p);