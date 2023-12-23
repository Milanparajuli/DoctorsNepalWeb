if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("Latitude: " + latitude);
      console.log("Longitude: " + longitude);

      localStorage.setItem("Latitude", latitude);
      localStorage.getItem("Latitude");
      localStorage.setItem("Longitude", longitude);
      localStorage.getItem(longitude);
    },
    function(error) {
      console.error("Error getting location:", error);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}
