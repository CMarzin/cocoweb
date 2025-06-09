const darkCheckbox = document.querySelector('.dark-checkbox')
const lightCheckbox = document.querySelector('.light-checkbox')
console.log(darkCheckbox)
console.log(lightCheckbox)

if (localStorage.getItem("color-scheme") === "dark") {
  darkCheckbox.checked = true;
} else {
  lightCheckbox.checked = true;
}

darkCheckbox.addEventListener('click', (e) => {
  if (darkCheckbox.checked) {
    localStorage.setItem("color-scheme", "dark");
  }
})

lightCheckbox.addEventListener('click', (e) => {
  if (lightCheckbox.checked) {
    localStorage.setItem("color-scheme", "light");
  }
})