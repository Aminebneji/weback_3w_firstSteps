import flowersJson from './flowers.json'; 
import '../css/index.css'; 
function importAllImages() {
  const images = {};

  const req = require.context("../asset", true, /\.(jpg|jpeg|png|gif|svg)$/);

  req.keys().forEach((key) => {
    const imageName = key.replace("./", "");
    images[imageName] = key;
    console.log(images)
  });

  return images;
}

async function getFlowers() {
  try {
 
    const data = flowersJson;

    const flowersListElement = document.getElementById('flowersList');
    

    if (data && data.photos && Array.isArray(data.photos)) {
      data.photos.forEach(flower => {
        const flowerDiv = document.createElement('div');
        flowerDiv.classList.add('flower'); 

        const image = document.createElement('img');
        image.classList.add('flower-img'); 
    
        const flowerInfo = document.createElement('p');
        flowerInfo.classList.add('flower-name'); 
    
        flowerInfo.innerHTML = `id: ${flower.id} | Nom: ${flower.nom_fleur}`;
    
        const importedImages = importAllImages(); 
        const myImage = new Image();
        myImage.src = importedImages[flower.nom_fleur];
        console.log(myImage.src);
        
        image.src = `../images/${flower.nom_fleur}.jpg`;
        image.alt = flower.nom_fleur;
    
        flowerDiv.appendChild(flowerInfo);
        flowerDiv.appendChild(image);
    
        flowersListElement.appendChild(flowerDiv);
      });
    } else {
      flowersListElement.innerHTML = 'Aucune donnée de fleur trouvée.';
    }
  } catch (error) {
    console.error('Une erreur s\'est produite : ', error);
  }
}

getFlowers();