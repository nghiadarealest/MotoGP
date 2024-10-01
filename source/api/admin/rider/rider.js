

async function fetchRider() {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/riders/getAll`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function fetchRiderByCategory(category) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/riders/getByCategory?category=${category}`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function fetchRiderById(id) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/riders/getById?id=${id}`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function updateRider(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/riders/update`,{
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

async function addRider(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/riders/add`,{
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

async function deleteRider(id) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/riders/delete?id=${id}`, {
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

export {fetchRider,addRider,deleteRider,updateRider,fetchRiderByCategory,fetchRiderById}