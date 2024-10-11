import {fetchCalendar, updateCalendar, deleteCalendar, addCalendar} from '../api/admin/calendar/calendar.js'
import {fetchCountry,addCountry,deleteCountry,updateCountry} from '../api/admin/country/country.js'
import {addTeam,deleteTeam,fetchTeam,updateTeam,fetchTeamByCategory} from '../api/admin/team/team.js'
import {addRider,deleteRider,fetchRider,updateRider, fetchRiderByCategory} from '../api/admin/rider/rider.js'
import {addCalendarRider,deleteCalendarRider,fetchCalendarRider} from '../api/admin/calendarRider/calendarRider.js'


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const textNavs = $$('.nav-link')
const breadcrumb = $('.breadcrumb-item.active')
const table = $('.table')
const thead = $('.table> thead')
const tbody = $('.table> tbody')
const modalAdd = $('.modal-add')
const addButton = $('.add-button')
const modalFooter = $('.modal-footer')
const filter = $('.filter')

if(localStorage.getItem("username") !='admin') {
    window.location.href = "/source/main.html";
}


textNavs.forEach(async(textNav) => {
    textNav.addEventListener('click', async function(event) {
        event.preventDefault()
        // Remove the 'active' class from all tab links
        if ($('.nav-link.active')) {
            $('.nav-link.active').classList.remove('active');
        }
        // Add the 'active' class to the clicked tab link
        this.classList.add('active');
        breadcrumb.innerHTML = this.textContent;

        $('.navbar-toggler').click()
        let func

        filter.innerHTML = ''
        addButton.style.display='block'

        switch(this.textContent) {
            case 'Calendar':
                await fetchCalendarTable()
                modalAdd.innerHTML=''
                func = showCalendarAddModal

              break;
            case 'Country':
                await fetchCountryTable()
                modalAdd.innerHTML=''
                func = showCountryAddModal
              break;
            case 'Team':
                await fetchTeamTable()
                modalAdd.innerHTML=''
                func = showTeamAddModal
                handleAddFilterTeam()
                break;
            case 'Rider':
                await fetchRiderTable()
                modalAdd.innerHTML=''
                func = showRiderAddModal
                handleAddFilterRider()
                break;
            case 'Calendar&Rider':
                await fetchCalendarRiderTable()
                handleAddFilterCalendarRider()
                func = showCalendarRiderAddModal
                break;
            default:
          }

        addButton.addEventListener("click", async(e) => {
            func()
        })
    });
})

// calendar
const fetchCalendarTable = async() => {
    try {

        let data = await fetchCalendar();
        if(data.length == 0) {
            thead.innerHTML=``
            tbody.innerHTML=``
            return
        }; 
        console.log(data)

        thead.innerHTML= `
            <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Country</th>
            <th scope="col">Location</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Image</th>
            </tr>
        `

        tbody.innerHTML = ''
        data.forEach((el,index) => {
            let startDate = new Date(el.startDate);
            let endDate = new Date(el.endDate);
            tbody.innerHTML += `
              <tr class="${el._id}">
                <th scope="row">${index +1}</th>
                <td>${el.title}</td>
                <td><img src="${el.countryId.image}" class="flag"/></td>
                <td>${el.location}</td>
                <td>${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}</td>
                <td>${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}</td>
                <td><img src="${el.image}" alt="" class="image"/></td>
                <td>
                    <button type="button" class="btn btn-outline-info edit-button">Edit</button>
                    <button type="button" class="btn btn-outline-danger " data-bs-toggle="modal" data-bs-target="#delete${el._id}">Delete</button>
                </td>
                <div class="modal fade modal-update" id="${el._id}" tabindex="-1" ></div>
                <div class="modal fade modal-delete" tabindex="-1" id="delete${el._id}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Delete!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>You want to confirm delete this ?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger delete-button" id="${el._id}" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
              </tr>
            `
        })

        const editButton = $$('.edit-button')
        const deleteButton = $$('.delete-button')

        data.forEach((el, index) =>{
            editButton[index].addEventListener("click", () => {
                showCalendarUpdateModal(el)
            });

            deleteButton[index].addEventListener("click", async(e) => {
                await deleteCalendar(el._id)
                await fetchCalendarTable();
            })
        })
              
    } catch (error) {
        console.error(error)
    }
}

const showCalendarUpdateModal = async(el) => {
    let startDate = new Date(el.startDate);
    let endDate = new Date(el.endDate);

    document.getElementById(`${el._id}`).innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Calendar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row ">
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control c-title" value="${el.title}">
                            </div>
                             <div class="col-md-6">
                                <label class="form-label">Location</label>
                                <input type="text" class="form-control c-location" value="${el.location}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label class="form-label">Start</label>
                                <input type="date" class="date form-control c-start" style="width: 200px" value="${startDate.getFullYear()}-${(startDate.getMonth()+1).toString().padStart(2, '0')}-${(startDate.getDate()).toString().padStart(2, '0')}"/>
                            </div>
                             <div class="col-md-6">
                                <label class="form-label">End</label>
                                <input type="date" class="date form-control c-end" style="width: 200px" value="${endDate.getFullYear()}-${(endDate.getMonth()+1).toString().padStart(2, '0')}-${(endDate.getDate()).toString().padStart(2, '0')}"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label class="form-label">Country</label>
                                <select class="form-select select-country c-country">
                                    
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label class="form-label">Image</label>
                                <input type="text" class="form-control c-image" value="${el.image}">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Layout</label>
                                <input type="text" class="form-control c-layout" value="${el.layout}">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Sponsor</label>
                                <input type="text" class="form-control c-sponsor" value="${el.sponsorImage}">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info save-data">Save changes</button>
                </div>
                </div>
            </div>
           
            `

    const selectCountry = $$('.select-country')
    let dataCountry = await fetchCountry();
    dataCountry.forEach((e,index) => {
        selectCountry.forEach(s => {
            s.innerHTML += `
                <option value="${e._id}">${e.name}</option>
            `
        })
    }) 

    const options = $$('.select-country option')
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == `${el.countryId._id}`) {
            options[i].selected = true;
        }
    }

    const modal = new bootstrap.Modal(document.getElementById(`${el._id}`));
    if(document.getElementById(`${el._id}`).classList.contains('modal-update')) modal.show()

    const saveData = $('.save-data')
    saveData.addEventListener("click", async(e) => {
        let isUpdate = await updateCalendar({
            id: el._id,
            title: $('.c-title').value,
            location: $('.c-location').value, 
            startDate: $('.c-start').value, 
            endDate: $('.c-end').value, 
            image: $('.c-image').value, 
            layout: $('.c-layout').value, 
            sponsorImage: $('.c-sponsor').value, 
            countryId: $('.c-country').value
        }); 

        if(isUpdate) {
            alert('Data updated successfully')
            await fetchCalendarTable()
            modal.hide();
        }else {
            alert('Data updated failed')
        }
    });
}

const showCalendarAddModal = async() => {
    modalAdd.innerHTML = `
        <form class="row ">
            <div class="row ">
                <div class="col-md-6">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control c-title">
                </div>
                    <div class="col-md-6">
                    <label class="form-label">Location</label>
                    <input type="text" class="form-control c-location" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label">Start</label>
                    <input type="date" class="date form-control c-start" style="width: 200px" />
                </div>
                    <div class="col-md-6">
                    <label class="form-label">End</label>
                    <input type="date" class="date form-control c-end" style="width: 200px" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label class="form-label">Country</label>
                    <select class="form-select select-country c-country">
                        
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label class="form-label">Image</label>
                    <input type="text" class="form-control c-image" >
                </div>
                <div class="col-md-4">
                    <label class="form-label">Layout</label>
                    <input type="text" class="form-control c-layout" >
                </div>
                <div class="col-md-4">
                    <label class="form-label">Sponsor</label>
                    <input type="text" class="form-control c-sponsor" >
                </div>
            </div>
        </form>
               

            `
    modalFooter.innerHTML =`<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info add-data-calendar" data-bs-dismiss="modal">Save</button>`
    const selectCountry = $$('.select-country')
    let dataCountry = await fetchCountry();
    dataCountry.forEach((e,index) => {
        selectCountry.forEach(s => {
            s.innerHTML += `
                <option value="${e._id}">${e.name}</option>
            `
        })
    }) 
    
    const addData = $('.add-data-calendar')
    if(addData) addData.addEventListener("click", handleAddCalendar);
}

const handleAddCalendar = async(e) => {
    let isAdd = await addCalendar({
        title: $('.c-title').value,
        location: $('.c-location').value, 
        startDate: $('.c-start').value, 
        endDate: $('.c-end').value, 
        image: $('.c-image').value, 
        layout: $('.c-layout').value, 
        sponsorImage: $('.c-sponsor').value, 
        countryId: $('.c-country').value
    }); 

    if(isAdd) {
        alert('Data added successfully')
        await fetchCalendarTable()
        // modal.hide();
    } else {
        alert('Data added failed')
    }
}

// country
const fetchCountryTable = async() => {
    try {

        let data = await fetchCountry();
        if(data.length == 0) {
            thead.innerHTML=``
            tbody.innerHTML=``
            return
        }; 

        console.log(data)

        thead.innerHTML= `
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            </tr>
        `

        tbody.innerHTML = ''
        data.forEach((el,index) => {
            tbody.innerHTML += `
              <tr class="${el._id}">
                <th scope="row">${index +1}</th>
                <td>${el.name}</td>
                <td><img src="${el.image}" class="flag"/></td>
                <td>
                    <button type="button" class="btn btn-outline-info edit-button">Edit</button>
                    <button type="button" class="btn btn-outline-danger " data-bs-toggle="modal" data-bs-target="#delete${el._id}">Delete</button>
                </td>
                <div class="modal fade modal-update" id="${el._id}" tabindex="-1" ></div>
                <div class="modal fade modal-delete" tabindex="-1" id="delete${el._id}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Delete!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>You want to confirm delete this ?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger delete-button" id="${el._id}" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
              </tr>
            `
        })

        const editButton = $$('.edit-button')
        const deleteButton = $$('.delete-button')

        data.forEach((el, index) =>{
            editButton[index].addEventListener("click", () => {
                showCountryUpdateModal(el)
            });

            deleteButton[index].addEventListener("click", async(e) => {
                await deleteCountry(el._id)
                await fetchCountryTable();
                
            })
        })
              
    } catch (error) {
        console.error(error)
    }
}

const showCountryUpdateModal = async(el) => {

    document.getElementById(`${el._id}`).innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Country</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row ">
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control c-name" value="${el.name}">
                            </div>
                             <div class="col-md-6">
                                <label class="form-label">Location</label>
                                <input type="text" class="form-control c-image" value="${el.image}">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info save-data">Save changes</button>
                </div>
                </div>
            </div>
           
            `
    const modal = new bootstrap.Modal(document.getElementById(`${el._id}`));
    if(document.getElementById(`${el._id}`).classList.contains('modal-update')) modal.show()

    const saveData = $('.save-data')
    saveData.addEventListener("click", async(e) => {
        let isUpdate = await updateCountry({
            id: el._id,
            name: $('.c-name').value,
            image: $('.c-image').value, 
        }); 

        if(isUpdate) {
            alert('Data updated successfully')
            await fetchCountryTable()
            modal.hide();
        }else {
            alert('Data updated failed')
        }
    });
}

const showCountryAddModal = async() => {
    modalAdd.innerHTML = `
        <form class="row ">
            <div class="row ">
                <div class="col-md-6">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control c-name">
                </div>
                    <div class="col-md-6">
                    <label class="form-label">Image</label>
                    <input type="text" class="form-control c-image" >
                </div>
            </div>
        </form>
                `
    modalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info add-data-country" data-bs-dismiss="modal">Save</button>`
    const addData = $('.add-data-country')
    if(addData) addData.addEventListener("click", handleAddCountry);
}

const handleAddCountry = async(e) => {
    let isAdd = await addCountry({
        name: $('.c-name').value,
        image: $('.c-image').value, 
    }); 

    if(isAdd) {
        alert('Data added successfully')
        await fetchCountryTable()
    } else {
        alert('Data added failed')
    }
}

//Team 
const fetchTeamTable = async(category) => {
    try {
        let data
        if(category) {
            data = await fetchTeamByCategory(category);
        } else {
            data = await fetchTeamByCategory($('.filter-category')?.value || 'MotoGP');
        }
        if(data.length == 0) {
            thead.innerHTML=``
            tbody.innerHTML=``
            return
        }; 
        console.log(data)

        thead.innerHTML= `
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Category</th>
            <th scope="col">Color</th>
            </tr>
        `

        tbody.innerHTML = ''
        data.forEach((el,index) => {
            tbody.innerHTML += `
              <tr class="${el._id}">
                <th scope="row">${index +1}</th>
                <td>${el.name}</td>
                <td><img src="${el.image}" class="flag"/></td>
                <td>${el.category}</td>
                <td><input type="color" value="${el.color}" disabled style="padding: 0"/></td>
                <td>
                    <button type="button" class="btn btn-outline-info edit-button">Edit</button>
                    <button type="button" class="btn btn-outline-danger " data-bs-toggle="modal" data-bs-target="#delete${el._id}">Delete</button>
                </td>
                <div class="modal fade modal-update" id="${el._id}" tabindex="-1" ></div>
                <div class="modal fade modal-delete" tabindex="-1" id="delete${el._id}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Delete!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>You want to confirm delete this ?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger delete-button" id="${el._id}" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
              </tr>
            `
        })

        const editButton = $$('.edit-button')
        const deleteButton = $$('.delete-button')

        data.forEach((el, index) =>{
            editButton[index].addEventListener("click", () => {
                showTeamUpdateModal(el)
            });

            deleteButton[index].addEventListener("click", async(e) => {
                await deleteTeam(el._id)
                await fetchTeamTable();
                
            })
        })
              
    } catch (error) {
        console.error(error)
    }
}

const showTeamUpdateModal = async(el) => {

    document.getElementById(`${el._id}`).innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Team</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row ">
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control c-name" value="${el.name}">
                            </div>
                             <div class="col-md-6">
                                <label class="form-label">Location</label>
                                <input type="text" class="form-control c-image" value="${el.image}">
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Category</label>
                                <select class="form-select select-category c-category">
                                    
                                    <option value="MotoGP">MotoGP</option>
                                    <option value="Moto2">Moto2</option>
                                    <option value="Moto3">Moto3</option>
                                    <option value="MotoE">MotoE</option>
                                </select>
                            </div>
                             <div class="col-md-2">
                                <label class="form-label">Color</label>
                                <input type="color" value="${el.color}" style="padding: 0" class="c-color form-control"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info save-data">Save changes</button>
                </div>
                </div>
            </div>
            `
    const options = $$('.select-category option')
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == `${el.category}`) {
            options[i].selected = true;
        }
    }

    const modal = new bootstrap.Modal(document.getElementById(`${el._id}`));
    if(document.getElementById(`${el._id}`).classList.contains('modal-update')) modal.show()

    const saveData = $('.save-data')
    saveData.addEventListener("click", async(e) => {
        let isUpdate = await updateTeam({
            id: el._id,
            name: $('.c-name').value,
            image: $('.c-image').value,
            category: $('.select-category').value,
            color: $('.c-color').value
        }); 

        if(isUpdate) {
            alert('Data updated successfully')
            await fetchTeamTable()
            modal.hide();
        }else {
            alert('Data updated failed')
        }
    });
}

const showTeamAddModal = async() => {
    modalAdd.innerHTML = `
        <form class="row ">
            <div class="row ">
                <div class="col-md-6">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control c-name">
                </div>
                    <div class="col-md-6">
                    <label class="form-label">Image</label>
                    <input type="text" class="form-control c-image" >
                </div>
            </div>
            <div class="row ">
                <div class="col-md-6">
                    <label class="form-label">Category</label>
                    <select class="form-select select-category c-category">
                        
                        <option value="MotoGP">MotoGP</option>
                        <option value="Moto2">Moto2</option>
                        <option value="Moto3">Moto3</option>
                        <option value="MotoE">MotoE</option>
                    </select>
                </div>
                    <div class="col-md-2">
                    <label class="form-label">Color</label>
                    <input type="color" style="padding: 0" class="c-color form-control"/>
                </div>
            </div>
        </form>
                `
    modalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info add-data-team" data-bs-dismiss="modal">Save</button>`
    const addData = $('.add-data-team')
    if(addData) addData.addEventListener("click", handleAddTeam);
}

const handleAddTeam = async(e) => {
    let isAdd = await addTeam({
        name: $('.c-name').value,
        image: $('.c-image').value, 
        category: $('.select-category').value,
        color: $('.c-color').value
    }); 

    if(isAdd) {
        alert('Data added successfully')
        await fetchTeamTable()
    } else {
        alert('Data added failed')
    }
}

const handleAddFilterTeam = async() => {
    const filter = $('.filter')
    filter.innerHTML = ''

    filter.innerHTML = `
    <div class="col-md-2">
        <label class="form-label">Category</label>
        <select class="form-select filter-category">
            
            <option value="MotoGP">MotoGP</option>
            <option value="Moto2">Moto2</option>
            <option value="Moto3">Moto3</option>
            <option value="MotoE">MotoE</option>
        </select>
    </div>
    `

    const filterCategory = $('.filter-category')
    filterCategory.addEventListener('change', async() => {
        fetchTeamTable(filterCategory.value)
    })
}

// rider
const fetchRiderTable = async(category) => {
    try {
        let data
        if(category){
            data = await fetchRiderByCategory(category);
        } else {
            data = await fetchRiderByCategory($('.filter-category')?.value || 'MotoGP');
        }
        if(data.length == 0) {
            thead.innerHTML=``
            tbody.innerHTML=``
            return
        };  

        console.log(data)

        thead.innerHTML= `
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Hashtag</th>
            <th scope="col">Category</th>
            <th scope="col">Team</th>
            <th scope="col">Country</th>
            </tr>
        `

        tbody.innerHTML = ''
        data.forEach((el,index) => {
            tbody.innerHTML += `
              <tr class="${el._id}">
                <th scope="row">${index +1}</th>
                <td>${el.name}</td>
                <td><img src="${el.image}" class="flag"/></td>
                <td>${el.hashtag}</td>
                <td>${el.category}</td>
                <td>${el.teamId.name}</td>
                <td><img src="${el.countryId.image}" alt="" class="image"/></td>
                <td>
                    <button type="button" class="btn btn-outline-info edit-button">Edit</button>
                    <button type="button" class="btn btn-outline-danger " data-bs-toggle="modal" data-bs-target="#delete${el._id}">Delete</button>
                </td>
                <div class="modal fade modal-update" id="${el._id}" tabindex="-1" ></div>
                <div class="modal fade modal-delete" tabindex="-1" id="delete${el._id}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm Delete!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>You want to confirm delete this ?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger delete-button" id="${el._id}" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
              </tr>
            `
        })

        const editButton = $$('.edit-button')
        const deleteButton = $$('.delete-button')

        data.forEach((el, index) =>{
            editButton[index].addEventListener("click", () => {
                showRiderUpdateModal(el)
            });

            deleteButton[index].addEventListener("click", async(e) => {
                await deleteRider(el._id)
                await fetchRiderTable();
            })
        })
              
    } catch (error) {
        console.log(error)
    }
}

const showRiderUpdateModal = async(el) => {
    let startDate = new Date(el.startDate);
    let endDate = new Date(el.endDate);

    document.getElementById(`${el._id}`).innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Rider</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row ">
            <div class="row ">
                <div class="col-md-4">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control c-name" value=${el.name}>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Hashtag</label>
                    <input type="text" class="form-control c-hashtag" value=${el.hashtag}>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Number</label>
                    <input type="text" class="form-control c-number" value=${el.number}>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label class="form-label">Country</label>
                    <select class="form-select select-country c-country">
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Category</label>
                    <select class="form-select select-category c-category">
                        <option value="MotoGP">MotoGP</option>
                        <option value="Moto2">Moto2</option>
                        <option value="Moto3">Moto3</option>
                        <option value="MotoE">MotoE</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Team</label>
                    <select class="form-select select-team c-team">
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <label class="form-label">Image</label>
                    <input type="text" class="form-control c-image" value=${el.image}>
                </div>
                 <div class="col-md-4">
                    <label class="form-label">Point</label>
                    <input type="text" class="form-control c-point" value="0" disabled value=${el.point}>
                </div>
            </div>
        </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info save-data">Save changes</button>
                </div>
                </div>
            </div>
           
            `

    const selectCountry = $$('.select-country')
    let dataCountry = await fetchCountry();
    dataCountry.forEach((e,index) => {
        selectCountry.forEach(s => {
            s.innerHTML += `
                <option value="${e._id}">${e.name}</option>
            `
        })
    }) 

    const selectCategorys = $$('.select-category ')
    selectCategorys.forEach((selectCategory,index) => {
        selectCategory.addEventListener('change', async() =>{
            let dataTeam = await fetchTeamByCategory($('.c-category').value);
            const selectTeams = $$('.select-team');
            selectTeams.forEach((selectTeam, i) => {
                if(index == i){
                    console.log(selectTeam)
                    selectTeam.innerHTML = ''
                    dataTeam.forEach((e,index) => {
                            selectTeam.innerHTML += `
                            <option value="${e._id}">${e.name}</option>
                        `
                        }) 
                }
            })
        })
    })
   

    const selectTeam = $$('.select-team');
    let dataTeam = await fetchTeamByCategory($('.c-category').value);
    dataTeam.forEach((e,index) => {
        selectTeam.forEach(s => {
            s.innerHTML += `
                <option value="${e._id}">${e.name}</option>
            `
        })
    })

    const optionCountries = $$('.select-country option')
    for (let i = 0; i < optionCountries.length; i++) {
        if (optionCountries[i].value == `${el.countryId._id}`) {
            optionCountries[i].selected = true;
        }
    }

    const optionCategory = $$('.select-category option')
    for (let i = 0; i < optionCategory.length; i++) {
        if (optionCategory[i].value == `${el.category}`) {
            optionCategory[i].selected = true;
        }
    }

    const optionTeams= $$('.select-team option')
    for (let i = 0; i < optionTeams.length; i++) {
        if (optionTeams[i].value == `${el.teamId._id}`) {
            optionTeams[i].selected = true;
        }
    }

    const modal = new bootstrap.Modal(document.getElementById(`${el._id}`));
    if(document.getElementById(`${el._id}`).classList.contains('modal-update')) modal.show()

    const saveData = $('.save-data')
    saveData.addEventListener("click", async(e) => {
        let isUpdate = await updateRider({
            id: el._id,
            name: $('.c-name').value,
            hashtag: $('.c-hashtag').value, 
            number: $('.c-number').value, 
            category: $('.c-category').value, 
            countryId: $('.c-country').value, 
            teamId: $('.c-team').value, 
            image: $('.c-image').value, 
            point: $('.c-point').value
        }); 

        if(isUpdate) {
            alert('Data updated successfully')
            await fetchRiderTable()
            modal.hide();
        }else {
            alert('Data updated failed')
        }
    });
}

const showRiderAddModal = async() => {
    modalAdd.innerHTML = `
        <form class="row ">
            <div class="row ">
                <div class="col-md-4">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control c-name">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Hashtag</label>
                    <input type="text" class="form-control c-hashtag" >
                </div>
                <div class="col-md-4">
                    <label class="form-label">Number</label>
                    <input type="text" class="form-control c-number" >
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label class="form-label">Country</label>
                    <select class="form-select select-country c-country">
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Category</label>
                    <select class="form-select select-category c-category">
                        <option value="MotoGP">MotoGP</option>
                        <option value="Moto2">Moto2</option>
                        <option value="Moto3">Moto3</option>
                        <option value="MotoE">MotoE</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Team</label>
                    <select class="form-select select-team c-team">
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <label class="form-label">Image</label>
                    <input type="text" class="form-control c-image" >
                </div>
                 <div class="col-md-4">
                    <label class="form-label">Point</label>
                    <input type="text" class="form-control c-point" value="0" disabled>
                </div>
            </div>
        </form>
               

            `
    modalFooter.innerHTML =`<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info add-data-rider" data-bs-dismiss="modal">Save</button>`
    
    const selectCountry = $$('.select-country')
    let dataCountry = await fetchCountry();
    dataCountry.forEach((e,index) => {
        selectCountry.forEach(s => {
            s.innerHTML += `
                <option value="${e._id}">${e.name}</option>
            `
        })
    }) 

    const selectCategory = $('.select-category ')
    selectCategory.addEventListener('change', async() =>{
        const selectTeam = $('.select-team');
        selectTeam.innerHTML=''
        let dataTeam = await fetchTeamByCategory($('.c-category').value);
        dataTeam.forEach((e,index) => {
            selectTeam.innerHTML += `
            <option value="${e._id}">${e.name}</option>
        `
        }) 
    })

    const selectTeam = $$('.select-team');
    let dataTeam = await fetchTeamByCategory($('.c-category').value);
    dataTeam.forEach((e,index) => {
        selectTeam.forEach(s => {
            s.innerHTML += `
                <option value="${e._id}">${e.name}</option>
            `
        })
    })
    
    const addData = $('.add-data-rider')
    if(addData) addData.addEventListener("click", handleAddRider);
}

const handleAddRider = async(e) => {
    let isAdd = await addRider({
        name: $('.c-name').value,
        hashtag: $('.c-hashtag').value, 
        number: $('.c-number').value, 
        category: $('.c-category').value, 
        countryId: $('.c-country').value, 
        teamId: $('.c-team').value, 
        image: $('.c-image').value, 
        point: $('.c-point').value
    }); 

    if(isAdd) {
        alert('Data added successfully')
        await fetchRiderTable()
        // modal.hide();
    } else {
        alert('Data added failed')
    }
}

const handleAddFilterRider = async() => {
    const filter = $('.filter')
    filter.innerHTML = ''

    filter.innerHTML = `
    <div class="col-md-2">
        <label class="form-label">Category</label>
        <select class="form-select filter-category">
            
            <option value="MotoGP">MotoGP</option>
            <option value="Moto2">Moto2</option>
            <option value="Moto3">Moto3</option>
            <option value="MotoE">MotoE</option>
        </select>
    </div>
    `

    const filterCategory = $('.filter-category')
    filterCategory.addEventListener('change', async() => {
        fetchRiderTable(filterCategory.value)
    })
}

//Calendar&Rider
const fetchCalendarRiderTable = async(category,session,calendarId) => {
    try {
        let data
        if(category && session && calendarId){
            data = await fetchCalendarRider(calendarId,session,category);
        } else {
            data = await fetchCalendarRider($('.filter-calendar')?.value || "66f170e0dc1fa1dd4a86f419",$('.filter-session')?.value || "RAC",$('.filter-category')?.value || 'MotoGP');
        }
        if(data.length == 0) {
            thead.innerHTML=``
            tbody.innerHTML=``
            return
        }; 

        console.log(data)

        thead.innerHTML= `
            <tr>
            <th scope="col " class="col-add" style="cursor: pointer">+</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Session</th>
            </tr>
        `

        tbody.innerHTML = ''
        let subTable = ``
        data.forEach((el,index) => {
            tbody.innerHTML += `
              <tr class="${el._id}">
                <th scope="row">${index +1}</th>
                <td>${el.calendarId.title}</td>
                <td>${el.category}</td>
                <td>${el.session}</td>
                <td>
                    <button type="button" class="btn btn-outline-danger delete-button" data-bs-toggle="modal" data-bs-target="#delete${el._id}">Delete</button>
                </td>
              </tr>
            `
            subTable+= `<div class="table-rider">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Hashtag</th>
                                <th scope="col">TimeFinish</th>
                                <th scope="col">Point</th>
                            </tr>
                    `
            el.riders.forEach((r,index) => {
                subTable += `
                    <tr class="${r._id}">
                        <th scope="row">${index +1}</th>
                        <td>${r.riderId.name}</td>
                        <td>${r.riderId.hashtag}</td>
                        <td>${r.timeFinish}</td>
                        <td>${r.point}</td>
                    </tr>
                `
            })

            subTable += ` 
                    </div>
                    `
            tbody.innerHTML +=subTable
        })

        const deleteButton = $$('.delete-button')

        data.forEach((el, index) =>{
            deleteButton[index].addEventListener("click", async(e) => {
                await deleteCalendarRider(el._id)
                await fetchCalendarRiderTable();
            })
        })
              
    } catch (error) {
        console.log(error)
    }
}

const showCalendarRiderAddModal = async() => {
    modalAdd.innerHTML = `
        <form class="row">
        <div class="row-calendarrider">
            <div class="row">
                <div class="col-md-4">
                    <label class="form-label">Category</label>
                    <select class="form-select select-category c-category">
                        
                        <option value="MotoGP">MotoGP</option>
                        <option value="Moto2">Moto2</option>
                        <option value="Moto3">Moto3</option>
                        <option value="MotoE">MotoE</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Session</label>
                    <select class="form-select select-session c-session">
                        <option  value="RAC">RAC</option>
                        <option  value="PR">PR</option>
                        <option  value="WUP">WUP</option>
                        <option  value="SPR">SPR</option>
                        <option  value="Q2">Q2</option>
                        <option  value="Q1">Q1</option>
                        <option  value="FP2">FP2</option>
                        <option  value="FP1">FP1</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Calendar</label>
                    <select class="form-select select-calendar c-calendar">
                    </select>
                </div>
            </div>
            <div class="form-floating">
                <textarea class="form-control c-riders" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" 
        >
        [{
            "riderId": "66f0e6db06bdea6aa9ed23a3", 
            "timeFinish": "01:51.111"
        }, 
        {
            "riderId": "66f0e44806bdea6aa9ed2397", 
            "timeFinish": "01:51.116"
        },
        {
            "riderId": "66f0eadd06bdea6aa9ed23b9", 
            "timeFinish": "01:51.121"
        },
        {
            "riderId": "66f0e82206bdea6aa9ed23ab", 
            "timeFinish": "01:51.112"
        }, 
        {
            "riderId": "66f0e95606bdea6aa9ed23b1", 
            "timeFinish": "01:51.122"
        },
        {
            "riderId": "66f0eb0506bdea6aa9ed23bb", 
            "timeFinish": "01:51.222"
        },
        {
            "riderId": "66f0eb6a06bdea6aa9ed23bd", 
            "timeFinish": "01:51.232"
        },
        {
            "riderId": "66f0ea6e06bdea6aa9ed23b7", 
            "timeFinish": "01:51.332"
        },
        {
            "riderId": "66f0ea1c06bdea6aa9ed23b5", 
            "timeFinish": "01:51.432"
        },
        {
            "riderId": "66f0eb8d06bdea6aa9ed23bf", 
            "timeFinish": "01:51.532"
        },
        {
            "riderId": "66f0e33f06bdea6aa9ed2395", 
            "timeFinish": "01:51.592"
        },
        {
            "riderId": "66f0e4c806bdea6aa9ed2399", 
            "timeFinish": "01:51.612"
        },
        {
            "riderId": "66f0e87806bdea6aa9ed23ad", 
            "timeFinish": "01:51.662"
        },
         {
            "riderId": "66f0e5d106bdea6aa9ed239d", 
            "timeFinish": "01:51.762"
        },
         {
            "riderId": "66f0e55d06bdea6aa9ed239b", 
            "timeFinish": "01:51.782"
        },
        {
            "riderId": "66f0e61b06bdea6aa9ed239f", 
            "timeFinish": "01:51.812"
        },
        {
            "riderId": "66f0e73e06bdea6aa9ed23a5", 
            "timeFinish": "01:51.872"
        },
         {
            "riderId": "66f0e78906bdea6aa9ed23a7", 
            "timeFinish": "01:52.172"
        },
         {
            "riderId": "66f0e8db06bdea6aa9ed23af", 
            "timeFinish": "01:52.192"
        },
         {
            "riderId": "66f0e7e006bdea6aa9ed23a9", 
            "timeFinish": "01:52.492"
        },
         {
            "riderId": "66f0eb0506bdea6aa9ed23bb", 
            "timeFinish": "01:52.682"
        },
         {
            "riderId": "66f0e99f06bdea6aa9ed23b3", 
            "timeFinish": "01:53.182"
        }]</textarea>
                <label for="floatingTextarea2" >Result</label>
            </div>
        </div>

        </form>
            `
    modalFooter.innerHTML =`<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info add-data-calendarrider" data-bs-dismiss="modal">Save</button>`
    
    const filterCalendar = $('.select-calendar')
    const dataCalendar = await fetchCalendar();
    dataCalendar.forEach(e => {
        filterCalendar.innerHTML +=`
            <option  value="${e._id}">${e.title}</option>
        `
    }) 

    // handleFillDataSelectRider()

    $('.select-category').addEventListener('change', async() => {
        const dataRiderC = await fetchRiderByCategory($('.select-category').value);
        filterRider.innerHTML = '';
        dataRiderC.forEach(e => {
        filterRider.innerHTML +=`
            <option  value="${e._id}">${e.name}</option>
        `
    }) 
    })

    const addData = $('.add-data-calendarrider')
    if(addData) addData.addEventListener("click", handleAddCalendarRider);
}

const handleAddCalendarRider = async(e) => {
    let isAdd = await addCalendarRider({
        category: $('.c-category').value,
        session: $('.c-session').value, 
        calendarId: $('.c-calendar').value, 
        riders: JSON.parse($('.c-riders').value), 
    }); 

    if(isAdd) {
        alert('Data added successfully')
        await fetchCalendarRiderTable()
        // modal.hide();
    } else {
        alert('Data added failed')
    }
}

const handleAddFilterCalendarRider = async() => {
    const filter = $('.filter')
    filter.innerHTML = ''

    filter.innerHTML = `
    <div class="row">
    <div class="col-md-2">
        <label class="form-label">Category</label>
        <select class="form-select filter-category">
            
            <option value="MotoGP">MotoGP</option>
            <option value="Moto2">Moto2</option>
            <option value="Moto3">Moto3</option>
            <option value="MotoE">MotoE</option>
        </select>
    </div>
    <div class="col-md-2">
        <label class="form-label">Session</label>
        <select class="form-select filter-session">
            <option  value="RAC">RAC</option>
            <option  value="PR">PR</option>
            <option  value="WUP">WUP</option>
            <option  value="SPR">SPR</option>
            <option  value="Q2">Q2</option>
            <option  value="Q1">Q1</option>
            <option  value="FP2">FP2</option>
            <option  value="FP1">FP1</option>
        </select>
    </div>
    <div class="col-md-3">
        <label class="form-label">Calendar</label>
        <select class="form-select filter-calendar">
        </select>
    </div>
    </div>
    `
    const filterSession = $('.filter-session')
    filterSession.addEventListener('change', async() => {
        fetchCalendarRiderTable(filterCategory.value)
    })

    const filterCalendar = $('.filter-calendar')
    const dataCalendar = await fetchCalendar();
    dataCalendar.forEach(e => {
        filterCalendar.innerHTML +=`
            <option  value="${e._id}">${e.title}</option>
        `
    }) 
    filterCalendar.addEventListener('change', async() => {
        fetchCalendarRiderTable(filterCategory.value)
    })

    const filterCategory = $('.filter-category')
    filterCategory.addEventListener('change', async() => {
        fetchCalendarRiderTable(filterCategory.value)
    })
}

// const handleAddInputRider = () => {
//     buttonAdd.addEventListener('click', () => {

//         rowCalendarRider.innerHTML += `
//             <div class="row list-rider"> 
//                 <div class="col-md-4">
//                     <select class="form-select select-rider" style="margin: 10px 0;">
//                     </select>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="input-group">
//                         <input type="number" class="form-control" placeholder="mm" maxlength="2">
//                         <span class="input-group-text">:</span>
//                         <input type="number" class="form-control" placeholder="ss" maxlength="2">
//                         <span class="input-group-text">.</span>
//                         <input type="number" class="form-control" placeholder="ooo" maxlength="3">
//                     </div>
//                 </div>
//             </div>
//         `
//         handleAddInputRider()
//         handleFillDataSelectRider()
//     })

// }

// const handleFillDataSelectRider = async() => {
//     const filterRiders = $$('.select-rider')
//     const dataRider = await fetchRiderByCategory($('.select-category').value);
//     filterRiders.forEach((r,index) => {
//         r.innerHTML = '';
//         dataRider.forEach(e => {
//             r.innerHTML +=`
//             <option  value="${e._id}">${e.name}</option>
//         `
//         })
        
//     }) 
// }


// start 
await fetchCalendarTable()
modalAdd.innerHTML=''
addButton.addEventListener("click", async(e) => {
    showCalendarAddModal()
})
