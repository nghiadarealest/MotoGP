import {fetchCalendar, updateCalendar, deleteCalendar, addCalendar} from '../api/admin/calendar/calendar.js'
import {fetchCountry,addCountry,deleteCountry,updateCountry} from '../api/admin/country/country.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const textNavs = $$('.nav-link')
const breadcrumb = $('.breadcrumb-item.active')
const table = $('.table')
const thead = $('.table> thead')
const tbody = $('.table> tbody')
const modalAdd = $('.modal-add')
const addButton = $('.add-button')


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
        // addButton.removeEventListener('click', showCalendarAddModal());
        // addButton.removeEventListener('click', showCountryAddModal());

        switch(this.textContent) {
            case 'Calendar':
                await fetchCalendarTable()
                modalAdd.innerHTML=''
                addButton.addEventListener("click", async(e) => {
                    e.preventDefault()
                    showCalendarAddModal()
                })
                addButton.click()
              break;
            case 'Country':
                await fetchCountryTable()
                modalAdd.innerHTML=''
                addButton.addEventListener("click", async(e) => {
                    e.preventDefault()
                    showCountryAddModal()
                })
                addButton.click()
              break;
            default:
          }
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
                                    <option selected>Choose...</option>
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
    <div class="modal fade " tabindex="-1" id="addModal" >
    <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Calendar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
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
                                    <option selected>Choose...</option>
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info add-data">Save</button>
                </div>
                </div>
                </div>

            </div>`
            
    const selectCountry = $$('.select-country')
    var dataCountry = await fetchCountry();
    dataCountry.forEach((e,index) => {
        selectCountry.forEach(s => {
            s.innerHTML += `
                <option value="${e._id}">${e.name}</option>
            `
        })
    }) 

    // const modal = new bootstrap.Modal(document.getElementById('add'));
    // modal.show();

    const addData = $('.add-data')
    addData.addEventListener("click", async(e) => {
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
            modal.hide();
        } else {
            alert('Data added failed')
        }
    });


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
    <div class="modal fade " tabindex="-1" id="addModal">
    <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Country</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-info add-data-country">Save</button>
                </div>
                </div>
                </div>

            </div>`
            
    // const modal = new bootstrap.Modal(document.getElementById('addCountry'));
    // modal.show();

    const addData = $('.add-data-country')
    addData.addEventListener("click", async(e) => {
        var isAdd = await addCountry({
            name: $('.c-name').value,
            image: $('.c-image').value, 
        }); 

        if(isAdd) {
            alert('Data added successfully')
            await fetchCountryTable()
            modal.hide();
        } else {
            alert('Data added failed')
        }
    });


}


// start 
await fetchCalendarTable()
modalAdd.innerHTML=''
addButton.addEventListener("click", async(e) => {
    showCalendarAddModal()
})
