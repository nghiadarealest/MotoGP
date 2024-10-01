import {fetchCalendar, updateCalendar, deleteCalendar, addCalendar} from '../api/admin/calendar/calendar.js'
import {fetchCountry,addCountry,deleteCountry,updateCountry} from '../api/admin/country/country.js'
import {addTeam,deleteTeam,fetchTeam,updateTeam,fetchTeamByCategory} from '../api/admin/team/team.js'
import {addRider,deleteRider,fetchRider,updateRider, fetchRiderByCategory} from '../api/admin/rider/rider.js'


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
        var func

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

        var data = await fetchCalendar();
        if(data.length == 0) return; 

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
            var startDate = new Date(el.startDate);
            var endDate = new Date(el.endDate);
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
    var startDate = new Date(el.startDate);
    var endDate = new Date(el.endDate);

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
    var dataCountry = await fetchCountry();
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
        var isUpdate = await updateCalendar({
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
    var dataCountry = await fetchCountry();
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
    var isAdd = await addCalendar({
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

        var data = await fetchCountry();
        if(data.length == 0) return; 

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
        var isUpdate = await updateCountry({
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
    var isAdd = await addCountry({
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
        var data
        if(category) {
            data = await fetchTeamByCategory(category);
        } else {
            data = await fetchTeamByCategory($('.filter-category')?.value || 'MotoGP');
        }
        if(data.length == 0) return; 

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
        var isUpdate = await updateTeam({
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
    var isAdd = await addTeam({
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
        var data
        if(category){
            data = await fetchRiderByCategory(category);
        } else {
            data = await fetchRiderByCategory($('.filter-category')?.value || 'MotoGP');
        }
        if(data.length == 0) return; 

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
    var startDate = new Date(el.startDate);
    var endDate = new Date(el.endDate);

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
    var dataCountry = await fetchCountry();
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
            var dataTeam = await fetchTeamByCategory($('.c-category').value);
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
    var dataTeam = await fetchTeamByCategory($('.c-category').value);
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
        var isUpdate = await updateRider({
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
    var dataCountry = await fetchCountry();
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
        var dataTeam = await fetchTeamByCategory($('.c-category').value);
        dataTeam.forEach((e,index) => {
            selectTeam.innerHTML += `
            <option value="${e._id}">${e.name}</option>
        `
        }) 
    })

    const selectTeam = $$('.select-team');
    var dataTeam = await fetchTeamByCategory($('.c-category').value);
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
    var isAdd = await addRider({
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

// start 
await fetchCalendarTable()
modalAdd.innerHTML=''
addButton.addEventListener("click", async(e) => {
    showCalendarAddModal()
})
