

async function fetchCountry() {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/countries/getAll`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function updateCountry(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/countries/update`,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        const res = await response.json()

        if(res.status) {
            return true;
        } else{ 
            return false;
        }
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function addCountry(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/countries/add`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const res = await response.json()

          if(res.status) {
              return true;
          } else{ 
              return false;
          }
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function deleteCountry(id) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/countries/delete?id=${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const res = await response.json()

        if(res.status) {
            return true;
        } else{ 
            return false;
        }
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

export {fetchCountry,addCountry,deleteCountry,updateCountry}