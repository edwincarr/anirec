window.onload =async () => {
  const resp = await fetch("search.html");
  const search = await resp.text()
  const insert = document.getElementById('inject')
  insert.innerHTML = search
}
const animePageRender = (animeInformation) => {
  console.log(animeInformation)
}

export default animePageRender
