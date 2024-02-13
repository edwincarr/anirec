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
query($id: Int) {
  MediaListCollection(userId: $id, status_in:PLANNING, perChunk: 500, chunk:1, type:ANIME){
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
const names = {
  userName: "ghostcix"
}

query(userQuery, names).then(handleResponse).then(handleData).then(handleError);

function handleResponse(response) {
  return response.json().then(function(json){
    return response.ok ? json : Promise.reject(json);
  });
}
function handleData(data) {
  console.log(data)
}
function handleError(error) {
  alert('Error, check console');
  console.error(error)
}
