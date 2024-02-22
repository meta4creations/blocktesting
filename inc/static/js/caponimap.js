const createMap = ({ lat, lng }) => {
  return new google.maps.Map(document.getElementById("caponi-map"), {
    center: { lat, lng },
    zoom: mtphrblocktestingVars.mapData.mapGuide ? 21 : 19,
  });
};

const createMarker = ({ map, position, icon }) => {
  if (!map || !position) {
    return false;
  }
  if (icon) {
    return new google.maps.Marker({ map, position, icon });
  } else {
    return new google.maps.Marker({ map, position });
  }
};

const getCurrentPosition = ({ onSuccess, onError = () => {} }) => {
  if ("geolocation" in navigator === false) {
    return onError(new Error("Geolocation is not supported by your browser."));
  }

  return navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

const getPositionErrorMessage = (code) => {
  switch (code) {
    case 1:
      return "Permission denied.";
    case 2:
      return "Position unavailable.";
    case 3:
      return "Timeout reached.";
    default:
      return null;
  }
};

// New function to track user's location.
const trackLocation = ({ onSuccess, onError = () => {} }) => {
  if ("geolocation" in navigator === false) {
    return onError(new Error("Geolocation is not supported by your browser."));
  }

  // Use watchPosition instead.
  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
};

function init() {
  const initialPosition = { lat: 44.80463418750519, lng: -93.1522540512496 };
  const map = createMap(initialPosition);
  //const home = createMarker({ map, position: initialPosition });

  let userIcon = false;
  if (mtphrblocktestingVars.userData.icon) {
    userIcon = {
      url: mtphrblocktestingVars.userData.icon,
      size: new google.maps.Size(50, 50),
      anchor: new google.maps.Point(25, 25),
    };
    //userIcon = mtphrblocktestingVars.userData.icon;
  }
  const userMarker = mtphrblocktestingVars.mapData.mapGuide
    ? createMarker({ map, position: initialPosition, icon: userIcon })
    : null;
  const $info = document.getElementById("caponi-map__info");
  const $description = document.getElementById("caponi-map__description");
  const $title = document.getElementById("caponi-map__description__title");
  const $image = document.getElementById("caponi-map__description__image");
  const $materials = document.getElementById(
    "caponi-map__description__materials"
  );
  const $artist = document.getElementById("caponi-map__description__artist");
  const $date = document.getElementById("caponi-map__description__date");
  const $information = document.getElementById("caponi-map__description__info");
  const $contentScroll = document.getElementById(
    "caponi-map__description__content__scroll"
  );
  const $footer = document.getElementById("caponi-map__description__footer");
  const $readmore = document.getElementById(
    "caponi-map__description__readmore"
  );

  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(44.80357, -93.15436),
    new google.maps.LatLng(44.80588, -93.1503)
  );
  let image = mtphrblocktestingVars.mapData.overlay
    ? mtphrblocktestingVars.mapData.overlay
    : false;
  //let image = 'https://developers.google.com/maps/documentation/javascript/';
  //image += "examples/full/images/talkeetna.png";

  /**
   * The custom USGSOverlay object contains the USGS image,
   * the bounds of the image, and a reference to the map.
   */
  if (image) {
    class USGSOverlay extends google.maps.OverlayView {
      bounds;
      image;
      div;
      constructor(bounds, image) {
        super();
        this.bounds = bounds;
        this.image = image;
      }
      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      onAdd() {
        this.div = document.createElement("div");
        this.div.style.borderStyle = "none";
        this.div.style.borderWidth = "0px";
        this.div.style.position = "absolute";

        // Create the img element and attach it to the div.
        const img = document.createElement("img");

        img.src = this.image;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.position = "absolute";
        this.div.appendChild(img);

        // Add the element to the "overlayLayer" pane.
        const panes = this.getPanes();

        panes.overlayLayer.appendChild(this.div);
      }
      draw() {
        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        const overlayProjection = this.getProjection();
        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        const sw = overlayProjection.fromLatLngToDivPixel(
          this.bounds.getSouthWest()
        );
        const ne = overlayProjection.fromLatLngToDivPixel(
          this.bounds.getNorthEast()
        );

        // Resize the image's div to fit the indicated dimensions.
        if (this.div) {
          this.div.style.left = sw.x + "px";
          this.div.style.top = ne.y + "px";
          this.div.style.width = ne.x - sw.x + "px";
          this.div.style.height = sw.y - ne.y + "px";
        }
      }
      /**
       * The onRemove() method will be called automatically from the API if
       * we ever set the overlay's map property to 'null'.
       */
      onRemove() {
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          delete this.div;
        }
      }
      /**
       *  Set the visibility to 'hidden' or 'visible'.
       */
      hide() {
        if (this.div) {
          this.div.style.visibility = "hidden";
        }
      }
      show() {
        if (this.div) {
          this.div.style.visibility = "visible";
        }
      }
      toggle() {
        if (this.div) {
          if (this.div.style.visibility === "hidden") {
            this.show();
          } else {
            this.hide();
          }
        }
      }
      toggleDOM(map) {
        if (this.getMap()) {
          this.setMap(null);
        } else {
          this.setMap(map);
        }
      }
    }

    // https://developers.google.com/maps/documentation/javascript/customoverlays
    const overlay = new USGSOverlay(bounds, image);
    overlay.setMap(map);
  }

  // Add the artwork pins
  for (const artworkId in mtphrblocktestingVars.artworkData) {
    const artwork = mtphrblocktestingVars.artworkData[artworkId];
    const position = {
      lat: parseFloat(artwork.lat),
      lng: parseFloat(artwork.lng),
    };
    const icon = artwork.icon ? artwork.icon : false;
    const marker = createMarker({ map, position: position, icon: icon });
    marker.addListener("click", (e) => {
      $title.innerHTML = artwork.title;
      $image.innerHTML = "";
      $materials.innerHTML = "";
      $artist.innerHTML = "";
      $date.innerHTML = "";
      $information.innerHTML = "";
      if (artwork.image) {
        $image.innerHTML = artwork.image;
        $image.style.display = "block";
      } else {
        $image.style.display = "none";
      }
      if (artwork.materials) {
        $materials.innerHTML =
          "<strong>Materials:</strong> " + artwork.materials;
        $materials.style.display = "block";
      } else {
        $materials.style.display = "none";
      }
      if (artwork.artist) {
        $artist.innerHTML = "<strong>Artist:</strong> " + artwork.artist;
        $artist.style.display = "block";
      } else {
        $artist.style.display = "none";
      }
      if (artwork.date) {
        $date.innerHTML = "<strong>Date:</strong> " + artwork.date;
        $date.style.display = "block";
      } else {
        $date.style.display = "none";
      }
      if (artwork.description) {
        $information.innerHTML = artwork.description;
        $information.style.display = "block";
      } else {
        $information.style.display = "none";
      }
      $description.style.display = "block";
      if (artwork.readmore) {
        $footer.style.display = "block";
        $readmore.href = artwork.readmore;
      } else {
        $footer.style.display = "none";
        $readmore.href = "#";
      }
    });
  }

  // Use the new trackLocation function.
  if (mtphrblocktestingVars.mapData.mapGuide) {
    trackLocation({
      onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
        userMarker.setPosition({ lat, lng });
        map.panTo({ lat, lng });
        // Print out the user's location.
        //$info.textContent = `Lat: ${lat} Lng: ${lng}`;
        $info.textContent = "";
        // Don't forget to remove any error class name.
        $info.classList.remove("error");
      },
      onError: (err) => {
        // Print out the error message.
        $info.textContent = `Error: ${
          getPositionErrorMessage(err.code) || err.message
        }`;
        // Add error class name.
        $info.classList.add("error");
      },
    });
  }

  jQuery("#caponi-map__description__close").on("click", function (e) {
    e.preventDefault();
    $description.style.display = "none";
    $image.innerHTML = "";
    $materials.innerHTML = "";
    $artist.innerHTML = "";
    $date.innerHTML = "";
    $information.innerHTML = "";
  });
}
