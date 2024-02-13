const getChunk = (number, chunkSize)  => {
  if (number < 0) {
    throw new Error("Number cannot be negative");
  }
  return Math.floor(number / chunkSize) + 1;
}


const num = 1268
const rand = Math.ceil(Math.random() * num)
console.log(`Random number: ${rand}`)
console.log(`Mod whatever func: ${getChunk(rand, 500)}`)
