// AJAX function which calls the itunes API 
function getTrack(){

    var title = document.getElementById('track');
    var url= `https://itunes.apple.com/search?term=${title.value}`;
  
    $.ajax({url:url, dataType:"jsonp"}).then(data => {
      console.log(data.results[0]);
      var contain = document.getElementById("infoDiv");
      contain.innerHTML = "";
  
      // creating divs to hold each element
      var tn_spot = document.createElement("div");
      var an_spot = document.createElement("div");
      var tt_spot = document.createElement("div");
      var tg_spot = document.createElement("div");
      var rd_spot = document.createElement("div");
  
      // assigning data from the API
      var track_name = data.results[0].trackName;
      var artist_name = data.results[0].artistName;
      var track_type = data.results[0].kind
      var track_genre = data.results[0].primaryGenreName
      var release_date = data.results[0].releaseDate
  
      // setting ID attributes
      tn_spot.setAttribute("id", "track_name");
      an_spot.setAttribute("id", "artist_name");
      tt_spot.setAttribute("id", "track_type");
      tg_spot.setAttribute("id", "track_genre");
      rd_spot.setAttribute("id", "release_date");
  
      // setting the value of the DIVS
      tn_spot.value = track_name;
      an_spot.value = artist_name;
      tt_spot.value = track_type;
      tg_spot.value = track_genre;
      rd_spot.value = release_date;
  
      // setting the innerHTML to what we want
      tn_spot.innerHTML = "<strong>Track Name: </strong>" + track_name;
      an_spot.innerHTML = "<strong>Artist Name: </strong>" + artist_name;
      tt_spot.innerHTML = "<strong>Track Type: </strong>" + track_type;
      tg_spot.innerHTML = "<strong>Track Genre: </strong>" + track_genre;
      rd_spot.innerHTML = "<strong>Release Date: </strong>" + release_date;
  
      // appending divs to 
      contain.appendChild(tn_spot);
      contain.appendChild(an_spot);
      contain.appendChild(tt_spot);
      contain.appendChild(tg_spot);
      contain.appendChild(rd_spot);
  
      var myBtn = document.getElementById("myBtn");
      myBtn.setAttribute("style", "visbility: show");
  
    })
    
  }
  
  function openModal(){
    console.log("in function");
    // get modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  
    // get the button to open modal
    var btn = document.getElementById("myBtn");
  
    // get the span element that closes modal
    var span = document.getElementsByClassName("close")[0];
  
    // close the modal when user clicks on "No" 
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    // close the modal when user clicks anywhere outside of it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  
  }
  
  //AJAX which posts to the backend
  function addTrack(){
  
    //getting the different elements by ID
    const track_name = document.getElementById("track_name").value
    const artist_name = document.getElementById("artist_name").value
    const track_type = document.getElementById("track_type").value
    const track_genre = document.getElementById("track_genre").value
    const release_date = document.getElementById("release_date").value
  
    console.log(document.getElementById("track_name"));
  
    // converting the different elements to JSON
    const data = {track_name: track_name, artist_name: artist_name, track_type: track_type, track_genre: track_genre, release_date: release_date}
  
    // connects to the backend API call through this link
    // needs the window.location.href to redirect after the POST
    var url = `http://localhost:3000/add`;
    $.ajax({url:url, dataType:"jsonp", type: "POST", data: data}).then().done(window.location.href = "/searches")
  }