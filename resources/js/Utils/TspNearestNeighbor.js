export function tspNearestNeighbor (coords) {
  let current = coords[0];
  let unvisited = coords.slice(1);
  let path = [current];

  while (unvisited.length > 0) {
    let closest = null;
    let closestDistance = Number.MAX_VALUE;
    for (let i = 0; i < unvisited.length; i++) {
      let distance = getDistance(current, unvisited[i]);
      if (distance < closestDistance) {
        closest = unvisited[i];
        closestDistance = distance;
      }
    }
    current = closest;
    unvisited.splice(unvisited.indexOf(closest), 1);
    path.push(current);
  }
  return path;
}

function getDistance (x, y) {
  let lat1 = x.lat;
  let lng1 = x.lng;
  let lat2 = y.lat;
  let lng2 = y.lng;

  let dlat = (lat2 - lat1) * (Math.PI / 180);
  let dlng = (lng2 - lng1) * (Math.PI / 180);
  let a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dlng / 2) * Math.sin(dlng / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = 6371 * c;

  return d;
};
