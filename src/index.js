const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = url_api => {
  xhttp.open('GET', url_api, false);
  xhttp.responseType ='json';
  return new Promise((response, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4){
        if (xhttp.status === 200){
          const res = JSON.parse(xhttp.responseText);
          return response(res);
        }else {
          return reject(new Error('Error has ocurred!'));
        }
      }
    }
    xhttp.send();
  })  
};



const getData = async url => {
  try {
    const first = await fetchData(url);
    const second = await fetchData(`${API}${first.results[0].id}`);
    const third = await fetchData(second.origin.url);

    console.log(`Personajes: ${first.info.count} `);
    console.log(`Primer Personaje: ${second.name}`);
    console.log(`Dimensión: ${third.dimension}`);
  } catch (error) {
    console.log(error);
  }
}

getData(API);



// fetchData(API,  (error1, data1) => {
//   if (error1) return console.error(`Error ${error1}` );
//   console.log('Primer Llamado...')
//   fetchData(API + data1.results[0].id, (error2, data2) => {
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     fetchData(data2.origin.url, (error3, data3) => {
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log(`Personajes: ${data1.info.count} `);
//       console.log(`Primer Personaje:  ${data2.name}`);
//       console.log(`Dimensión: ${data3.dimension}`);
//     });
//   });
// });