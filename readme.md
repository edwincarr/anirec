# GraphQL Query

```
  query {
  MediaListCollection(userId: 797175, status_in:PLANNING, perChunk: 100, chunk:1, type:ANIME){
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
```
