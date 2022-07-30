const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')
const austellungen = [
  {
    path: 'raeberstoeckli-2011',
    title: 'Räberstöckli 2011',
  },
  {path: 'salgesch-2012', title: 'Salgesch 2012'},
  {path: 'raeberstoeckli-2013', title: 'Räberstöckli 2013'},
  {path: 'raeberstoeckli-2015', title: 'Räberstöckli 2015'},
  {path: 'rothushalle-2017', title: 'Rothushalle 2017'},
  {path: 'raeberstoeckli-2019', title: 'Räberstöckli 2019'},
]
const allImages = []

const scrapeAusstellung = async ausstellung => {
  const images = []
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()

    await page.goto(`https://bollier.ch/${ausstellung}.html`)
    await page.setViewport({width: 1440, height: 744})
    await navigationPromise

    await page.waitForSelector('.ImageInclude')
    await page.waitForSelector('.SSSlideCaption')

    let ausstellungImages = await page.$$eval('.ImageInclude', images => {
      return images.map(image => {
        return {
          src: image.dataset.src,
          width: image.dataset.width,
          height: image.dataset.height,
        }
      })
    })

    let allCaptions = await page.$$eval('.SSSlideCaption p', captions => {
      return captions.map(caption => caption.textContent)
    })

    ausstellungImages.forEach((image, i) => {
      images.push({
        src: image.src.split('?')[0],
        title: allCaptions[i].split('-')[0].trim(),
        description: `${allCaptions[i].split('-')[1].trim()} ${allCaptions[i]
          .split('-')[2]
          .trim()}`,
        width: parseInt(image.width),
        height: parseInt(image.height),
      })
    })
    await browser.close()
  } catch (e) {
    console.log(`Error while fetching workable job titles ${e.message}`)
  }
  return images
}

async function fetchAll() {
  for (const ausstellung of austellungen) {
    const images = await scrapeAusstellung(ausstellung.path)
    allImages.push({
      title: ausstellung.title,
      images: images,
    })
  }
}

async function generateImageOutput() {
  await fetchAll()
  var jsonContent = JSON.stringify(allImages)
  fs.writeFile('output.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.')
      return console.log(err)
    }

    console.log('JSON file has been saved.')
  })
}
generateImageOutput()
