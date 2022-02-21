import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

const museums = [
  {
    name: "Victoria and Albert",
    city: "London",
  },
  {
    name: "The British Museum",
    city: "London",
  },
  {
    name: "RailWay Museum",
    city: "York",
  },
  {
    name: "The Fitzwilliam Museum",
    city: "Cambridge",
  },
  {
    name: "The National Gallery",
    city: "London",
  },
];
const works = [
  {
    name: "Tennis Rackets, sunglasses, manufactured by Oliver Goldsmith Eyewear, 1956, UK",
    picture:
      "https://assets-cdn.vam.ac.uk/2019/06/03/15/20/39/abb39590-0b62-4142-bca9-a9a3be201537/1280.jpg",
    museumId: 1,
  },
  {
    name: "Music-hall costume worn by May Moore Duprez, about 1910, England",
    picture:
      "https://assets-cdn.vam.ac.uk/2020/02/28/10/49/55/366387a3-438d-4470-b302-7f7e239f7ca8/1280.jpg",
    museumId: 1,
  },
  {
    name: "Brass head of an Ooni (king) of Ife, Nigeria 1300s -early 1400s",
    picture:
      "https://www.britishmuseum.org/sites/default/files/styles/bm_gallery_medium_700h/public/2019-10/Brass%20head%20with%20a%20beaded%20crown%20and%20plume%2C%20Ife%2C%20Nigeria.jpg?itok=oFhmm2R9",
    museumId: 2,
  },
  {
    name: "Limestone grave-relief",
    picture:
      "https://www.britishmuseum.org/sites/default/files/styles/bm_gallery_medium_700h/public/2020-02/Roman-gravestone-2000.jpg?itok=jrJbJYtg",
    museumId: 2,
  },
  {
    name: "Rocket",
    picture:
      "https://www.railwaymuseum.org.uk/sites/default/files/styles/11_7/public/2022-01/rocket_hero_new.jpg?h=61ce19a1&itok=mk48zv_v",
    museumId: 3,
  },
  {
    name: "Road Train",
    picture:
      "https://www.railwaymuseum.org.uk/sites/default/files/styles/11_7/public/2018-09/roadtrainhero_dan.jpg?h=e75ab034&itok=aYiPIOd0",
    museumId: 3,
  },
  {
    name: "Perceptions of People",
    picture:
      "https://content.fitz.ms/fitz-website/assets/103_LRG.jpg?key=directus-large-crop",
    museumId: 4,
  },
  {
    name: "A Distant View of Tivoli",
    picture:
      "https://www.nationalgallery.org.uk/media/35003/l-0839-00-000004-hd.jpg?center=0.40350877192982454,0.473568281938326&mode=crop&width=350&height=350&rnd=132385929364000000&bgcolor=fff",
    museumId: 5,
  },
  {
    name: "The Virgin and Child in an Apse with Two Angels",
    picture:
      "https://www.nationalgallery.org.uk/media/33725/n-2608-00-000047-hd.jpg?crop=0.33656335527775705,0.13531091742606155,0.33981803387824583,0.59406724772181541&cropmode=percentage&width=350&height=350&rnd=132385874981730000&bgcolor=fff",
    museumId: 5,
  },
];

const dropMuseums = db.prepare(`
DROP TABLE museums;
`);
const dropWorks = db.prepare(`
DROP table works;
`);

dropWorks.run();
dropMuseums.run();

const createMuseums = db.prepare(`
CREATE TABLE museums(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL
); 
`);
const createWorks = db.prepare(`
CREATE TABLE works(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    picture TEXT NOT NULL,
    museumId INTEGER NOT NULL,
    FOREIGN KEY(museumId) REFERENCES museums(id)
); 
`);
createMuseums.run();
createWorks.run();
const createMuseum = db.prepare(`
INSERT INTO museums (name, city) VALUES (?,?);
`);
const createWork = db.prepare(`
INSERT INTO works (name, picture, museumId) VALUES (?,?,?);
`);
for (const museum of museums) {
  createMuseum.run(museum.name, museum.city);
}
for (const work of works) {
  createWork.run(work.name, work.picture, work.museumId);
}
