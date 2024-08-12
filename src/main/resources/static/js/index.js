let map;
let markers = [];
const navEl = document.getElementById("nav-mobile-menu");
const nav = document.getElementsByTagName("nav");

navEl.addEventListener("click", () => {
    nav[1].classList.toggle("active");
});

function initMap() {
    const mapOptions = {
        center: { lat: 40.10789164639515, lng: 46.04158226806454 },
        zoom: 15,
        mapTypeId: 'hybrid',
        tilt: 45,
        gestureHandling: "cooperative",
        heading: 90,
        // zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        // fullscreenControl: false
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    async function fetchMarkersAndDisplay() {
        try {
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            } else {
                console.warn('Loading overlay element not found');
            }

            const response = await fetch('http://localhost:8082/api/v1/markers/all', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Full Response:', data);


            data.forEach(marker => {
                const type = marker.type || marker.markerType;
                if (!marker.latitude || !marker.longitude || !marker.title || !marker.description || !type) {
                    console.error('Invalid marker data:', marker);
                    return;
                }

                const mapMarker = new google.maps.Marker({
                    position: { lat: marker.latitude, lng: marker.longitude },
                    map: map,
                    title: marker.title,
                    label: marker.description,
                    icon: getIcon(type)
                });
                markers.push(mapMarker);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        } finally {
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
        }
    }

    fetchMarkersAndDisplay();
}

function getIcon(type) {
    const icons = {
        restaurant: '/images/icons/res.svg',
        building: '/images/icons/building.svg',
        road: '/images/icons/road.svg',
        store: '/images/icons/store.svg',
        park: '/images/icons/park.svg',
        river: '/images/icons/river.svg',
        lake: '/images/icons/lake.svg',
    };

    return icons[type.toLowerCase()] || '/images/icons/pin.svg';
}

window.onload = initMap;



