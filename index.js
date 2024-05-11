const listQuery = `
query($id: Int, $chunk: Int) {
  MediaListCollection(userId: $id, status_in:PLANNING, perChunk: 500, chunk:$chunk, type:ANIME){
    lists{
      name
      entries {
        media {
          id
          title {
            english,
            romaji
          }
          description
          coverImage{
            large
          }
        }
      }
    }
  }
}
`
const listVars = {}

const userQuery = `
query($userName: String) {
  User(name:$userName){
    id
    statistics{
      anime{
        statuses{
          count
          status
        }
      }
    }
  }
}
`
const userVars = {}

const query = async(query, variables) => {
  const url = "https://graphql.anilist.co"
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }

  return fetch(url, options)
}

const getChunk = (number, chunkSize)  => {
  return Math.floor(number / chunkSize);
}

//main function
const getInfo = async(event) => {
  event.preventDefault(); //prevents website from reloading after form submitting

  userVars.userName = document.getElementById("username").value

  const userResult = await query(userQuery, userVars).then(e => e.json())

  const user = userResult.data.User
  const randomID = getRandomID(user)

  listVars.id = user.id
  listVars.chunk = getChunk(randomID, 500)

  const animeResult = await query(listQuery, listVars).then(e => e.json())
  console.log(randomID)
  const animeRecommendation = animeResult.data.MediaListCollection.lists[0].entries[randomID].media

  console.log(animeRecommendation)
  return animeRecommendation
}

const getRandomID = (userInformation) => {
  let count
  const lists = userInformation.statistics.anime.statuses
  console.log(lists)
  for(let i = 0;i<lists.length;i++){
    if(lists[i].status == "PLANNING"){
      count = lists[i].count
    }
  }

  return Math.ceil(Math.random()*count)
}

let button = document.getElementById('button')

const main = async (e) => {
  const {id, title, coverImage} = await getInfo(e)
  const animeTitle = document.getElementById('animeTitle')
  const animeImage = document.getElementById('animeImage')
  const animeLink = document.getElementById('animeLink')
  if(title.english == null){
    animeTitle.innerHTML = title.romaji
  }else {
    animeTitle.innerHTML = title.english
  }
  animeImage.src = coverImage.large
  animeLink.href = `https://anilist.co/anime/${id}`
}

button.addEventListener('click', async(e) =>{
  await main(e)
  window.location.assign('/#result');
})
