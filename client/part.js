const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const part = urlParams.get('part');

console.log(part);

fetch(`/info/${part}`, {
  method: "GET", 
  header: {
    "Content-Type": "application/json; charset=utf-8"
  }
})
.then((response) => response.json())
.then((jsonTemp) => {
  json = jsonTemp;
  let div = document.getElementById("hello");
  div.innerHTML = json;
})