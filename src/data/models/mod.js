import { characters } from "./characters.js";
import { plants } from "./plants.js";
import { rocks } from "./rocks.js";
import { trees } from "./trees.js";
import { weapons } from "./weapons.js";
import { cloud } from "./cloud.js";

export function getDataArray() {
  const dataArray = []
  for (const key in characters) {
    dataArray.push(characters[key])
  }
  for (const key in plants) {
    dataArray.push(plants[key])
  }
  for (const key in rocks) {
    dataArray.push(rocks[key])
  }
  for (const key in trees) {
    dataArray.push(trees[key])
  }
  for (const key in weapons) {
    dataArray.push(weapons[key])
  }
  dataArray.push(cloud)
  return dataArray
}
export { characters, cloud, plants, rocks, trees, weapons };
export default {
  cloud,
  characters,
  plants,
  rocks,
  trees,
  weapons,
};