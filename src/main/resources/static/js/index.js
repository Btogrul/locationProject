let map;
let markers = [];
let foundMarkers = [];
let currentIndex = 0;

const navEl = document.getElementById("nav-mobile-menu");
const nav = document.querySelector("nav");
const loadingOverlay = document.getElementById("loadingOverlay");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
let lastOpenedInfoWindow = null;

navEl.addEventListener("click", () => {
    nav.classList.toggle("active");
});

async function initMap() {
    const mapOptions = {
        center: { lat: 39.39048, lng: 46.15494 },
        zoom: 10,
        mapTypeId: 'hybrid',
        tilt: 45,
        gestureHandling: "cooperative",
        heading: 90,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
        styles: [
            { featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }] },
            { featureType: "administrative.country", elementType: "labels", stylers: [{ visibility: "on" }] }
        ]
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    await fetchMarkersAndDisplay();

    map.addListener('idle', manageMarkerVisibility);
}

async function fetchMarkersAndDisplay() {
    toggleLoading(true);

    try {
        const response = await fetch('http://localhost:8082/api/v1/markers/all', { headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        data.forEach(markerData => addMarkerToMap(markerData));
        markers.forEach(marker => {
            let markerType = getMarkerType(marker);

            if (markerType === 'city' || markerType === 'region') {
                marker.setVisible(true);
            }
        });
    } catch (error) {
        console.error('Error fetching markers:', error);
        alert(`Error: ${error.message}`);
    } finally {
        toggleLoading(false);
    }
}

function addMarkerToMap(markerData) {
    const mapMarker = new google.maps.Marker({
        position: { lat: markerData.latitude, lng: markerData.longitude },
        map: map,
        title: markerData.title,
        label: {
            text: markerData.title || 'Invalid Title',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500',
            className: 'marker-label'
        },
        icon: getIcon(markerData.type || markerData.markerType),
        visible: false
    });

    // mapMarker.addListener('click', () => {
    //     new google.maps.InfoWindow({
    //         content: `<div><strong>${markerData.title}</strong><p>${markerData.description}</p></div>`
    //     }).open(map, mapMarker);
    // });
    const infoWindowContent = `<div class="custom-info-window"><strong>${markerData.title}</strong><p>${markerData.description}</p></div>`;
    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    mapMarker.addListener('click', () => {
        if (lastOpenedInfoWindow) {
            lastOpenedInfoWindow.close();
        }

        infoWindow.open(map, mapMarker);

        lastOpenedInfoWindow = infoWindow;
    });
    markers.push(mapMarker);
}

function manageMarkerVisibility() {
    const bounds = map.getBounds();
    const currentZoom = map.getZoom();

    markers.forEach(marker => {
        const markerPosition = marker.getPosition();
        let shouldBeVisible = false;
        const markerType = getMarkerType(marker);

        if (currentZoom >= 15) {
            shouldBeVisible = bounds.contains(markerPosition);
        } else if (currentZoom >= 12 && currentZoom < 18 && markerType === 'building') {
            shouldBeVisible = bounds.contains(markerPosition);
        } else if (currentZoom < 12 && (markerType === 'city' || markerType === 'region')) {
            shouldBeVisible = bounds.contains(markerPosition);
        }

        marker.setVisible(shouldBeVisible);
    });
}

function getMarkerType(marker) {
    const icon = marker.getIcon();
    return Object.keys(markerIcons).find(type => markerIcons[type] === icon) || 'other';
}

const markerIcons = {
    restaurant: '/images/icons/res.svg',
    building: '/images/icons/building.svg',
    road: '/images/icons/road.svg',
    store: '/images/icons/store.svg',
    park: '/images/icons/park.svg',
    river: '/images/icons/river.svg',
    lake: '/images/icons/lake.svg',
    village: '/images/icons/v.svg',
    region: '/images/icons/region.svg',
    city: '/images/icons/city.svg',
    default: '/images/icons/pin.svg'
};

function getIcon(type) {
    return markerIcons[type.toLowerCase()] || markerIcons.default;
}

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") handleSearch();
});

function handleSearch() {
    const searchText = searchInput.value.toLowerCase();
    foundMarkers = markers.filter(marker => marker.title.toLowerCase().includes(searchText));

    if (foundMarkers.length > 0) {
        currentIndex = 0;
        focusOnMarker(foundMarkers[currentIndex]);
        updateNavigationButtons();
    } else {
        alert("Location not found");
        hideNavigationButtons();
    }
}

prevButton.addEventListener("click", navigateMarkers(-1));
nextButton.addEventListener("click", navigateMarkers(1));

function navigateMarkers(step) {
    return () => {
        if (foundMarkers.length > 1) {
            currentIndex = (currentIndex + step + foundMarkers.length) % foundMarkers.length;
            focusOnMarker(foundMarkers[currentIndex]);
            updateNavigationButtons();
        }
    };
}

function focusOnMarker(marker) {
    map.setCenter(marker.getPosition());
    map.setZoom(15);
}

function updateNavigationButtons() {
    const visible = foundMarkers.length > 1 ? "block" : "none";
    prevButton.style.display = visible;
    nextButton.style.display = visible;
}

function hideNavigationButtons() {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
}

function toggleLoading(show) {
    if (loadingOverlay) loadingOverlay.style.display = show ? 'flex' : 'none';
}

window.onload = initMap;