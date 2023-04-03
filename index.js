const getColorBtn = document.getElementById("get-color-btn")
const colorInput = document.getElementById("color-dropper")
const colorMode = document.getElementById("color-option")
const colorTemplate = document.getElementById("color-palette-container")
const colorSelectorContainer = document.getElementById("color-selector-container")
const body = document.getElementById("body")

// Dark mode switch

const ball = document.getElementById("ball")
const light = document.getElementById("light")
const dark = document.getElementById("dark")
const toggle = document.getElementById("toggle")

let chosenColorInput = ""
let chosenColorMode = ""

colorInput.addEventListener("change", () =>{
    chosenColorInput = colorInput.value.replace("#", "")
})

colorMode.addEventListener("change", () =>{
    chosenColorMode = colorMode.value
})

getColorBtn.addEventListener("click", getColorScheme)

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

function getColorScheme(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColorInput}&mode=${chosenColorMode}&count=5`, options)
    .then(res => {
      if (res.ok) {
        console.log('SUCCESS');
        return res.json(); // Add a return statement here
      } else {
        console.log('NOT SUCCESS');
        throw new Error('Response not successful');
      }
    })
    .then(data => {
        // data.colors[0].image.bare
        // data.colors[0].hex.value
        
        colorTemplate.innerHTML = ``
        for (let color of data.colors){
             colorTemplate.innerHTML += `
                <div class="color-holder ">
                    <img class"color-img" src="${color.image.bare}">
                    <p class="color-hex " id="hex-value">${color.hex.value}</p>
                </div>
            `
        }
        const colorHolder = document.querySelectorAll('.color-holder');
        colorHolder.forEach(holder => {
          holder.addEventListener("click", function(){
            const hexValue = holder.querySelector(".color-hex").textContent;
            navigator.clipboard.writeText(hexValue)
              .then(() => alert(`Copied ${hexValue} to clipboard`))
          });
        });
        
    })
    .catch(error => console.log('ERROR', error));
}

toggle.addEventListener("click", () => {
  if (ball.style.left == "7px"){
      ball.style.left = "45px"
      ball.style.transition = ".3s linear";
      colorSelectorContainer.style.backgroundColor = "#111827";
      colorSelectorContainer.style.transition = ".3s linear";
      body.style.backgroundColor = "white";
      body.style.transition = ".3s linear";
      colorTemplate.style.backgroundColor = "#111827";
      colorTemplate.style.color = "white";
      colorTemplate.style.transition = ".3s linear";
      getColorBtn.classList.add("dark")
      colorMode.classList.add("dark")
  }
  else{
      ball.style.left = "7px";
      ball.style.transition = ".3s linear";
      colorSelectorContainer.style.backgroundColor = "white";
      colorSelectorContainer.style.transition = ".3s linear";
      body.style.backgroundColor = "#111827";
      body.style.transition = ".3s linear";
      colorTemplate.style.backgroundColor = "white";
      colorTemplate.style.color = "#111827";
      colorTemplate.style.transition = ".3s linear";
      getColorBtn.classList.remove("dark")
      colorMode.classList.remove("dark")
  }
})