let map;
let markers = [];

function initMap() {
    const mapOptions = {
        center: { lat: 40.10789164639515, lng: 46.04158226806454 },
        zoom: 14,
        mapTypeId: 'terrain',
        tilt: 45,
        gestureHandling: "cooperative",
        heading: 90
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    async function fetchMarkersAndDisplay() {
        const response = await fetch('/api/v1/markers/all');
        const data = await response.json();

        data.forEach(marker => {
            const mapMarker = new google.maps.Marker({
                position: { lat: marker.latitude, lng: marker.longitude },
                map: map,
                title: marker.title,
                label: marker.description,
                icon: getIcon(marker.type)
            });
            markers.push(mapMarker);
        });
    }

    fetchMarkersAndDisplay();
}

function getIcon(type) {
    if (type === 'restaurant') {
        return 'https://maps.google.com/mapfiles/kml/pal4/icon61.png';
    } else {
        return 'https://maps.google.com/mapfiles/kml/pal4/icon60.png';
    }
}

window.onload = initMap;