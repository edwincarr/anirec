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

const listQuery = `
query($id: Int, $chunk: Int) {
  MediaListCollection(userId: $id, status_in:PLANNING, perChunk: 500, chunk:$chunk, type:ANIME){
    lists{
      name
      entries {
        media {
          id
          title {
            userPreferred
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

const listVars = {
  id: 797175,
  chunk: 1
}

// query(userQuery, userVars).then(handleResponse).then(handleData).then(handleError);
// query(listQuery, listVars).then(handleResponse).then(handleData).then(handleError);

function handleResponse(response) {
  return response.json().then(function(json){
    return response.ok ? json : Promise.reject(json);
  });
}
function handleData(data) {
  console.log(data)
}
// function handleError(error) {
//   alert('Error, check console');
//   console.error(error)
// }

const getChunk = (number, chunkSize)  => {
  return Math.floor(number / chunkSize) + 1;
}

const getInfo = async(event) => {
  event.preventDefault();

  //let list = document.getElementById("website-list").value;

  const userVars = {
    userName: document.getElementById("username").value
  }

  const result = await query(userQuery, userVars).then(e => e.json())
  const userInf = result.data.User
  console.log(result.data.User)
  const lists = userInf.statistics.anime.statuses
  let count;

  for(let i = 0;i<lists.length;i++){
    if(lists[i].status == "PLANNING"){
      count = lists[i].count
    }
  }
  const randAnimeId = Math.ceil(Math.random()*count)
  const listVars = {
    id: userInf.id,
    chunk: getChunk(randAnimeId, 500)
  }
  const randAnime = await query(listQuery, listVars).then(e => e.json())
  console.log(randAnime)
}
