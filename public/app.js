$("#new-entry").on("click", function () {
  console.log("new submission!!!");
  $.ajax({
    type: "POST",
    url: "/projects/newProject",
    dataType: "json",
    data: {
      title: $("#titleINPUT").val(),
      date: $("#dateINPUT").val(),
      idea: $("#ideaINPUT").val(),
      setting: $("#settingINPUT").val(),
      location: $("#locationINPUT").val(),
      author: $("#authorINPUT").val(),
      imgLink: $("#imgLinkINPUT").val(),
      comments: [""],
      created: Date.now()
    }
  })
    .then(function (data) {
      console.log(data);
      getEntries();
      $("#titleINPUT").val(""),
        $("#dateINPUT").val(""),
        $("#ideaINPUT").val(""),
        $("#settingINPUT").val(""),
        $("#locationINPUT").val(""),
        $("#authorINPUT").val(""),
        $("#imgLinkINPUT").val("")
    }
    );
  return false;
});

// ==============POST ALL PROJECTS==============
function getEntries() {
  $("#entries").empty();
  $.getJSON("/entries", function (data) {
    console.log(data[1].comments.length);
    for (var i = 0; i < data.length; i++) {
      $("#entries").prepend(
        '<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">' +
        '<div class="card">' +
        '<div class="card-header">' +
        '<h3 class="card-title titleSPOT">' + data[i].title + '</h3></div>' +
        '<div class="card-body">' +
        '<p class="card-text floatR">Date: <span class="dateSPOT">' + data[i].date + '</span></p>' +
        '<h5 class="card-text">Idea:</h5><br>' +
        '<p class="card-text ideaSPOT">' + data[i].idea + '</p>' +
        '<h5 class="card-text settingSPOT">Setting:</h5>' +
        '<p class="card-text">' + data[i].setting + '</p>' +
        '<h5 class="card-text">Location:</h5>' +
        '<p class="card-text locationSPOT">' + data[i].location + '</p>' +
        '<p class="card-text author floatR"><img src="/assets/images/icon.svg" alt="icon"><span class="authorSPOT ">' + " " +  data[i].author + '</span></p>' +
        '<img class="imgLinkSpot" src="' + data[i].imgLink + '" alt="photo">' + '<br><br>' +
        '<button class="btn btn-danger floatR deleter" data-id="' + data[i]._id + '">DELETE</button>' +
        '<button class="btn btn-secondary"  href="/comments/" data-id="' + data[i]._id + '">Comments</button><br>' +
        // ============COMMENTS===========
        '<div id="comments"><br><h5>Comments</h5></div><br>' +         
        '<div class="input-group"><input type="text" class="form-control" id="commentINPUT" aria-label="Text input with dropdown button"></div><br>' +
        '<div class="input-group"><select class="custom-select" id="commentName" aria-label="Example select with button addon">' +
        '<option selected>Choose...</option><option value="Trent: <br>">Trent</option><option value="Rob: <br>">Rob</option>' +
        '<option value="Thomas: <br>">Thomas</option><option value="Bob: <br>">Bob</option><option value="Jess: <br>">Jess</option></select>' +
        '<div class="input-group-append"><button class="btn btn-outline-secondary commenter" data-id="' + data[i]._id + '" type="button">POST</button></div></div>' +
        '</div></div></div></div></div>')
        console.log("index: " + i);
      for (var j = 1; j < data[i].comments.length; j++) {
        console.log("whoops" + j);
        $("#comments").append(
          '<br><p class="singleComment">' + data[i].comments[j] + '</p>')}
    };
  });
}

// ==============DELETE==============
$(document).on("click", ".deleter", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    type: "DELETE",
    url: "/delete/" + thisId
  }); 
  getEntries();
});

// ==============COMMENT==============
$(document).on("click", ".commenter", function () {  
  var thisId = $(this).attr("data-id");
  var thisComment = $(this).val("");
  $.ajax({
    type: "POST",
    url: "/newComment/" + thisId,
    dataType: "json",
    data: 
      { 
        comments: $('#commentName').val() + $('#commentINPUT').val()
      }    
  }); 
  getEntries();
});

getEntries();