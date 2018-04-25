$(document).ready(function () {

  // Here we are provided an initial array of data.
  const table_data = [{
      first_name: 'Rose',
      last_name: 'Tyler',
      home: 'Earth'
    },
    {
      first_name: 'Zoe',
      last_name: 'Heriot',
      home: 'Space Station W3'
    },
    {
      first_name: 'Jo',
      last_name: 'Grant',
      home: 'Earth'
    },
    {
      first_name: 'Leela',
      last_name: null,
      home: 'Unspecified'
    },
    {
      first_name: 'Romana',
      last_name: null,
      home: 'Gallifrey'
    },
    {
      first_name: 'Clara',
      last_name: 'Oswald',
      home: 'Earth'
    },
    {
      first_name: 'Adric',
      last_name: null,
      home: 'Alzarius'
    },
    {
      first_name: 'Susan',
      last_name: 'Foreman',
      home: 'Gallifrey'
    }
  ];

  function displayTableDetails() {
    //table must be emptied for the add character function
    $("#tableData").empty();
    //this for loop will build out each row in the table dynamically with data from table_data array
    for (let i = 0; i < table_data.length; i++) {
      
      const tableDataRow = $("<tr>");
      //building each cell in the table
      const dataId = $("<td>").text(i);
      const firstName = $("<td>").text(table_data[i].first_name);
      const lastName = $("<td>").text(table_data[i].last_name);
      const home = $("<td>").text(table_data[i].home);
      //appending the cells to the row each
      const searchBtn = $("<button class='btn btn-success search' type='submit'>Search</button>");
      searchBtn.attr('id', i);
      const search = $("<td>").append(searchBtn);
      tableDataRow.append(dataId, firstName, lastName, home, search);
      //appending each row to the table
      $("#tableData").append(tableDataRow);
    }
  }
  displayTableDetails();

  $("#add-character").on("click", function (event) {

    event.preventDefault();
    // Setting the input value to a variable and then clearing the input
    firstName = $("#first-name").val().trim();
    if (firstName) {
    $("#first-name").val("");

    lastName = $("#last-name").val().trim();
    $("#last-name").val("");

    home = $("#home").val().trim();
    $("#home").val("");

    table_data.push({
      first_name: firstName,
      last_name: lastName,
      home: home
    });
    displayTableDetails();
    } else {
      alert('sorry we need a first name to add it to the table.')
    }
  });

  // Giphy search option
  $(document).on("click", ".search", function (event) {
    $("#images").empty();
    const index = $(this).attr('id');
    let searchTerm = "Doctor Who " + table_data[index].first_name + " " + (table_data[index].last_name ? table_data[index].last_name : " ");
    console.log(searchTerm);
    
    // Storing our giphy API URL for a random new image
    
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=GoEY1pjOIXX2XiJgXsUma6zZWKJjvSX0&limit=10";

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After the data from the AJAX request comes back
    .then(function (response) {

      // Saving the image_original_url property

      // Creating and storing an image tag
      var newImage = $("<img>");

      for (j = 0; j < response.data.length; j++) {
        $("#images").append(
          "<img src='" + response.data[j].images.original_still.url + "'" +
          "alt='" + response.data[j].slug + "'" +
          "data-still='" + response.data[j].images.original.url + "'" +
          "data-animate='" + response.data[j].images.original_still.url + "'" +
          "data-state='animate'" +
          "class='animalImage'>");
        $("#images").append("<p>" + response.data[j].rating + "</p>");
      }
      console.log(response);
    });
  });
});
