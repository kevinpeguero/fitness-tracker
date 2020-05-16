count = 0;



// This function will display all created workouts
function getPrevious() {
  // Empty any results currently on the page
  $("#prev-workout").empty();
  // Grab all of the current Workouts
  $.get("/all", function(data) {
    // For each note...
    // console.log(data);

    // Creates modal form to make new exercise
    let exerciseModalForm = $(`  <form action="/submit/" method="POST">
                    <div class="form-group">
                        <input type="text" name="exerciseName" class="form-control" id="exercise-name"
                            placeholder="Enter Exercise">
                    </div>
                    <div class="form-group">
                        <input type="text" name="setNum" class="form-control" id="set-number" placeholder="Enter Sets">
                    </div>
                    <div class="form-group">
                        <input type="text" name="repNum" class="form-control" id="rep-number" placeholder="Enter Reps">
                    </div>
                    <div class="form-group">
                        <input type="text" name="weight" class="form-control" id="weight"
                            placeholder="Enter Weight in Pounds">
                    </div>
                    <button type="submit" class="add btn btn-outline-primary btn-block">Add
                        Exercise
                    </button>
                </form>`);

    $(".modal-content").append(exerciseModalForm);

    // Loops through all workouts and displays them
    
    for (let i = 0; i < data.length; i++) {
      var dateobj = new Date(data[i].created);
      count++;
      console.log(count);
      let colDiv = $("<div>");
      colDiv.addClass("col-md-3 text-center");
      $("#prev-workout").append(colDiv);

      let cardDiv = $(
        '<div class="card shadow mb-3" style="background-color: #0380fc">'
      );
      $(colDiv).append(cardDiv);

      let cardBody = $('<div class="card-body">');
      $(cardDiv).append(cardBody);

      let h2 = $('<h2 class="text-white">');
      h2.addClass("workout-name");
      h2.html(`${data[i].name}`);
      $(cardBody).append(h2);

      let time = $('<h6 class="text-white">');
      time.addClass("workout-name");
      time.html(dateobj.toDateString());
      $(cardBody).append(time);

      let viewBtn = $(
        `<button class="btn btn-light btn-block my-5" data-toggle="collapse" href="#exerciseCollapse${count}" role="button" aria-expanded="false" aria-controls="collapseExample">`
      );
      viewBtn.html("View Exercises");
      $(cardBody).append(viewBtn);

      let addBtn = $(
        `<button class="btn btn-outline-light btn-block my-5" data-id="${data[i]._id}"  data-toggle="modal" data-target="#add-exercise">`
      );

      addBtn.html("Add Exercise");
      $(cardBody).append(addBtn);

      let removeBtn = $(
        `<button class="delete btn btn-outline-danger btn-block my-5" data-id="${data[i]._id}">`
      );

      removeBtn.html("Remove Workout");
      cardBody.append(removeBtn);

      // Loops through all exercises and displays them their workout cards
      let item = data[i].exercises;
      for (var j = 0; j < item.length; j++) {
        console.log(item[j]);
        let cardCollapse = $(
          `<div class="collapse" id="exerciseCollapse${count}">`
        );
        $(viewBtn).append(cardCollapse);

        let h3 = $("<h3>");
        h3.html(`Exercise: ${item[j].exerciseName}`);
        $(cardCollapse).append(h3);

        let set = $("<p>");
        set.html(`Sets: ${item[j].setNum}`);
        $(cardCollapse).append(set);

        let rep = $("<p>");
        rep.html(`Reps: ${item[j].repNum}`);
        $(cardCollapse).append(rep);

        let weight = $("<p>");
        weight.html(`Weight: ${item[j].weight}`);
        $(cardCollapse).append(weight);
      }
    }
  });
}

$("#prev-workout").on("click", ".delete", function(event) {
  event.preventDefault();
  console.log("click");
  let id = $(this).attr("data-id");

  console.log(id);
  $.ajax("/delete/" + id, {
    type: "DELETE"
  }).then(function(resp) {
    console.log(resp);
    location.reload();
  });
});

// getToday();
getPrevious();

//SCROLL SPY

$("body").scrollspy({ target: "#main-nav" });

// Add smooth scrolling
$("#main-nav a").on("click", function(e) {
  // Check for a hash value
  if (this.hash !== "") {
    // Prevent default behavior
    e.preventDefault();

    // Store hash
    const hash = this.hash;

    // Animate smooth scroll
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top
      },
      900,
      function() {
        // Add hash to URL after scroll
        window.location.hash = hash;
      }
    );
  }
});

$("#add-exercise").on("show.bs.modal", function(event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var id = button.data("id"); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find("form").attr("action", "submit/" + id);
});
