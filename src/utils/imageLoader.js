export default function (images) {
  return Promise.all(images.map(item => new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.src = item
    img.onload = () => resolve(item)
    img.onerror = reject
  })))
}
