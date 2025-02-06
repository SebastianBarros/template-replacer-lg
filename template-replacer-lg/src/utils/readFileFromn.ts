export const getTextFromFile = (path: string) => fetch(path)
  .then(response => response.text())
  .then((data) => {
    console.log(data)
  })