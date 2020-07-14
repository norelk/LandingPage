$(document).ready(() => {
    $('#update-row').hide();
    $('.no-data-row').hide();

    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

$('table tbody').on( "click", (e) => {
    if (e.target.className === "btn btn-primary delete-row-btn") {
        deleteRowById(e.target.dataset.id);
    }
    if (e.target.className === "btn btn-primary edit-row-btn") {
        handleEditRow(e.target.dataset.id);
    }
});

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function loadHTMLTable(data) { 

    if (data.length === 0) {
        $('.no-data-row').show(1000);
         return;
    }
    let tableHtml = "";

    data.forEach(({id, full_name, email, phone_number, city, check1, check2}) => {

        tableHtml += `<tr class='text-right'>`;
        tableHtml += `<td>${full_name}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${phone_number}</td>`;
        tableHtml += `<td class="cityCell">${city}</td>`;
        check1 === 1 ? 
            tableHtml += `<td><img src="/client/images/v.png" class="img-fluid v-table-img"></td>` : 
            tableHtml += `<td></td>`;      
        check2 === 1 ? 
            tableHtml += `<td><img src="/client/images/v.png" class="img-fluid v-table-img"></td>` : 
            tableHtml += `<td></td>`; 
        tableHtml += `<td><button class="btn btn-primary delete-row-btn" data-id=${id}>מחק</button></td>`;
        tableHtml += `<td><button class="btn btn-primary edit-row-btn" data-id=${id}>ערוך</button></td>`;

        tableHtml += "</tr>";
       
    });
    $('table tbody').html(tableHtml);
}

function handleEditRow(id) {
    $('#update-row').show(1000);
    $('#update-fname-input').data("id", id)

    fetch('http://localhost:5000/get/'+ id)
    .then(response => response.json())
    .then(data => LoadHTMLRow(data['data']));

}

function LoadHTMLRow(data) {
    $('#update-fname-input').val(data[0].full_name);
    $('#update-email-input').val(data[0].email);
    $('#update-phone-input').val(data[0].phone_number);
    $('#update-city-input').val(data[0].city);
    $('#update-check1-input').val(data[0].check1);
    $('#update-check2-input').val(data[0].check2);
}

$('#update-row-btn').on( "click", () => {
    const updateFnameInput = $('#update-fname-input');
    const updateEmailInput = $('#update-email-input');
    const updatePhoneInput = $('#update-phone-input');
    const updateCityInput = $('#update-city-input');

    fetch('http://localhost:5000/update/', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateFnameInput.data("id"),
            full_name: updateFnameInput.val(),
            email: updateEmailInput.val(),
            phone_number: updatePhoneInput.val(),
            city: updateCityInput.val()
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
});

// --------------Pie Chart ---------------------------//
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        let data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ["בית אריה",100],
          ["שוהם",1],
          ["תל אביב",1]
          
        ]);

        let options = {
          title: 'חלוקה לפי ערים'
        };

        let chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
