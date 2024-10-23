let map;
let markers = [];
const navEl = document.getElementById("nav-mobile-menu");
const nav = document.getElementsByTagName("nav");
let currentIndex = 0;
let foundMarkers = [];


navEl.addEventListener("click", () => {
    nav[1].classList.toggle("active");
});

function initMap() {
    const mapOptions = {
        center: { lat: 39.15991494905332, lng: 46.26663066688381 },
        zoom: 10,
        // zoom: 15,
        mapTypeId: 'hybrid',
        tilt: 45,
        gestureHandling: "cooperative",
        heading: 90,
        // zoomControl: false,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "administrative.country",
                elementType: "labels",
                stylers: [
                    { visibility: "on" }
                ]
            }
        ]
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

            const response = await fetch('https://qerbiazerbaycanim.com/api/v1/markers/all', {
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

                const description = typeof marker.description === 'string' ? marker.description : JSON.stringify(marker.description);


                const mapMarker = new google.maps.Marker({
                    position: { lat: marker.latitude, lng: marker.longitude },
                    map: map,
                    // title: marker.title,
                    title: typeof marker.title === 'string' ? marker.title : JSON.stringify(marker.title),
                    // label: marker.description,
                    label: {
                        // text: marker.title,
                        text: typeof marker.title === 'string' ? marker.title : 'Invalid Title',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '500',
                        className: 'marker-label'
                    },
                    icon: getIcon(type)
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><strong>${marker.title}</strong><p>${description}</p></div>`
                });

                // marker.description

                mapMarker.addListener('click', () => {
                    infoWindow.open(map, mapMarker);
                });

                const currentZoom = map.getZoom();
                if ((currentZoom === 10 || currentZoom === 11) && type.toLowerCase() !== 'region') {
                    mapMarker.setVisible(false);
                } else {
                    mapMarker.setVisible(true);
                }

                markers.push(mapMarker);
            });
            map.addListener('zoom_changed', () => {
                const currentZoom = map.getZoom();
                markers.forEach(marker => {
                    const markerType = marker.getIcon() === getIcon('region') ? 'region' : 'other';

                    if ((currentZoom === 10 || currentZoom === 11 || currentZoom < 12) && markerType !== 'region') {
                        marker.setVisible(false);
                    } else {
                        marker.setVisible(true);
                    }
                });
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
        village: '/images/icons/v.svg',
        region: '/images/icons/region.svg',
        city: '/images/icons/ci.svg'
    };

    return icons[type.toLowerCase()] || '/images/icons/pin.svg';
}
//
// document.getElementById("search-button").addEventListener("click", () => {
//     const searchText = document.getElementById("search-input").value.toLowerCase();
//     let found = false;
//
//     markers.forEach(marker => {
//         if (marker.title.toLowerCase().includes(searchText)) {
//             map.setCenter(marker.getPosition());
//             map.setZoom(15);
//
//             // const searchInfoWindow = new google.maps.InfoWindow({
//             //     content: `<div><strong>${marker.title}</strong><p>daha çox məlumat üçün <br> klikləyin...</p></div>`
//             // });
//             //
//             // searchInfoWindow.open(map, marker);
//             found = true;
//
//
//             google.maps.event.addListener(marker, 'click', () => {
//                 searchInfoWindow.close();
//             });
//         }
//     });
//
//     if (!found) {
//         alert("Lokasiya tapılmadı");
//     }
// });


document.getElementById("search-button").addEventListener("click", () => {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    foundMarkers = markers.filter(marker => marker.title.toLowerCase().includes(searchText));

    if (foundMarkers.length > 0) {
        currentIndex = 0;
        focusOnMarker(foundMarkers[currentIndex]);
        updateNavigationButtons();
    } else {
        alert("Lokasiya tapılmadı");
        hideNavigationButtons();
    }
});

document.getElementById("next-button").addEventListener("click", () => {
    if (foundMarkers.length > 1) {
        currentIndex = (currentIndex + 1) % foundMarkers.length;
        focusOnMarker(foundMarkers[currentIndex]);
        updateNavigationButtons();
    }
});

document.getElementById("prev-button").addEventListener("click", () => {
    if (foundMarkers.length > 1) {
        currentIndex = (currentIndex - 1 + foundMarkers.length) % foundMarkers.length;
        focusOnMarker(foundMarkers[currentIndex]);
        updateNavigationButtons();
    }
});

function focusOnMarker(marker) {
    map.setCenter(marker.getPosition());
    map.setZoom(15);
}

function updateNavigationButtons() {
    if (foundMarkers.length > 1) {
        document.getElementById("prev-button").style.display = "block";
        document.getElementById("next-button").style.display = "block";
    } else {
        hideNavigationButtons();
    }
}

function hideNavigationButtons() {
    document.getElementById("prev-button").style.display = "none";
    document.getElementById("next-button").style.display = "none";
}

document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.getElementById("search-button").click();
    }
});
window.onload = initMap;



