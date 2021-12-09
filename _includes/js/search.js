const submit = document.querySelector('.submit')
const searchString = document.querySelector('#search-str')
const resultTemplate = document.querySelector('.js-result')

let fuse = null

submit.addEventListener('click', (e) => {

  e.preventDefault()
  const resultSearch = fuse.search(searchString.value)
  resultTemplate.innerHTML = ''

  for (let i = 0; i < resultSearch.length; i++) {
    resultTemplate.innerHTML += `<li> ${i + 1}. <a href="${resultSearch[i].item.url}">${resultSearch[i].item.title}</a></li>`
  }

})

const getAllDataFromSite = () => {
  return new Promise((resolve, reject) => {
    fetch('/search.json').then(function(response) {
      return response.json();
    }).then(function(response) {
      resolve(response.search)
    })
  })
}

getAllDataFromSite().then((data) => {
  fuse = new Fuse(data, {
    keys: ['title', 'text']
  })
})