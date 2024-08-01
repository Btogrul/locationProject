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
        try {
            const response = await fetch('/api/v1/markers/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
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
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchMarkersAndDisplay();
}

function getIcon(type) {
    switch (type) {
        case 'restaurant':
            return 'https://maps.google.com/mapfiles/kml/pal4/icon61.png';
        case 'building':
            return 'https://maps.google.com/mapfiles/kml/pal4/icon62.png';
        case 'road':
            return 'https://maps.google.com/mapfiles/kml/pal4/icon63.png';
        case 'store':
            return 'https://maps.google.com/mapfiles/kml/pal4/icon64.png';
        case 'park':
            return 'https://maps.google.com/mapfiles/kml/pal4/icon65.png';
        case 'river':
            return 'https://maps.google.com/mapfiles/kml/pal4/icon66.png';
        case 'lake':
            return 'https://maps.google.com/mapfiles/kml/pal4/icon67.png';
        default:
            return 'https://maps.google.com/mapfiles/kml/pal4/icon60.png';
    }
}

window.onload = initMap;