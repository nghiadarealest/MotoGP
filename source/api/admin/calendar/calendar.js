
async function fetchCalendar(year) {
    if (!year) year = 2024;

    try {
        const response = await fetch(`https://motogp.onrender.com/api/calendars/getAll?year=${year}`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function updateCalendar(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/calendars/update`,{
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

async function addCalendar(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/calendars/add`,{
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

async function deleteCalendar(id) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/calendars/delete?id=${id}`, {
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

export {fetchCalendar, updateCalendar, deleteCalendar, addCalendar}