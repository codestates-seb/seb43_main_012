// 참조
// import fetch from 'node-fetch';

// export async function getFlight(filterBy = {}) {
//   let queryResult = '';
//   if (filterBy.departure.length) queryResult +=  `?departure=${filterBy.departure}`;
//   if (filterBy.destination.length) queryResult += queryResult.length ? `&destination=${filterBy.destination}`: `?destination=${filterBy.destination}`;

//   const filtered = await fetch(`http://ec2-13-124-90-231.ap-northeast-2.compute.amazonaws.com:81/flight${queryResult}`,
//     {method: 'GET'})
//     .then(resp => resp.json())
//     .then(json=> json)
//   return filtered;
// }
