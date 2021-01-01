
function initMap() {
    // The location of Uluru
    //37.770372, -122.386959
    const pos = { lat: 37.770372, lng: -122.386959 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: pos,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: pos,
      map: map,
    });
  }
