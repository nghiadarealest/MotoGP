

async function fetchTeam() {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/teams/getAll`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function fetchTeamByCategory(category) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/teams/getByCategory?category=${category}`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function fetchTeamById(id) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/teams/getById?id=${id}`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function updateTeam(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/teams/update`,{
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

async function addTeam(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/teams/add`,{
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

async function deleteTeam(id) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/teams/delete?id=${id}`, {
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

export {fetchTeam,addTeam,deleteTeam,updateTeam,fetchTeamByCategory,fetchTeamById}