let map;
let markers = [];

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
            const response = await fetch('/api/v1/markers/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            data.forEach(marker => {
                if (!marker.latitude || !marker.longitude || !marker.title || !marker.description || !marker.type) {
                    console.error('Invalid marker data:', marker);
                    return;
                }

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
    const icons = {
        restaurant: '/images/icons/res.svg',
        building: '/images/icons/building.svg',
        road: '/images/icons/road.svg',
        store: '/images/icons/store.svg',
        park: '/images/icons/park.svg',
        river: '/images/icons/river.svg',
        lake: '/images/icons/lake.svg',
    };

    return icons[type] || '/images/icons/pin.svg';
}

// function removeMarkers() {
//     markers.forEach(marker => marker.setMap(null));
//     markers = [];
// }

window.onload = initMap;




// function initMap() {
//     const mapOptions = {
//         center: { lat: 40.10789164639515, lng: 46.04158226806454 },
//         zoom: 14,
//         mapTypeId: 'terrain',
//         tilt: 45,
//         gestureHandling: "cooperative",
//         heading: 90
//     };
//
//     map = new google.maps.Map(document.getElementById("map"), mapOptions);
//
//     async function fetchMarkersAndDisplay() {
//         try {
//             const response = await fetch('/api/v1/markers/all');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//
//             data.forEach(marker => {
//                 const mapMarker = new google.maps.Marker({
//                     position: { lat: marker.latitude, lng: marker.longitude },
//                     map: map,
//                     title: marker.title,
//                     label: marker.description,
//                     icon: getIcon(marker.type)
//                 });
//                 markers.push(mapMarker);
//             });
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }
//
//     fetchMarkersAndDisplay();
// }
//
// function getIcon(type) {
//     switch (type) {
//         case 'restaurant':
//             return '/images/icons/res.svg';
//         case 'building':
//             return '/images/icons/building.svg';
//         case 'road':
//             return '/images/icons/road.svg';
//         case 'store':
//             return '/images/icons/store.svg';
//         case 'park':
//             return '/images/icons/park.svg';
//         case 'river':
//             return '/images/icons/river.svg';
//         case 'lake':
//             return '/images/icons/lake.svg';
//         default:
//             return '/images/icons/pin.svg';
//     }
// }
//
// window.onload = initMap;