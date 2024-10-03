

async function fetchCalendarRider(calendarId, session, category) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/calendarRider/getByCalendarCategorySession?calendarId=${calendarId}&session=${session}&category=${category}&year=2024`);
        const data = await response.json();
        return data; // Return the fetched data (calendar)
    } catch (e) {
        console.log(e); // Handle errors
        return undefined; // Or return a default value for error cases
    }
}

async function addCalendarRider(data) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/calendarRider/add`,{
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

async function deleteCalendarRider(id) {
    try {
        const response = await fetch(`https://motogp.onrender.com/api/calendarRider/delete?id=${id}`, {
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

export {addCalendarRider,fetchCalendarRider,deleteCalendarRider}