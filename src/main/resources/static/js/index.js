let map;
let markers = [];
let foundMarkers = [];
let currentIndex = 0;
let isSearching = false;


const navEl = document.getElementById("nav-mobile-menu");
const nav = document.querySelector("nav");
const loadingOverlay = document.getElementById("loadingOverlay");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
let lastOpenedInfoWindow = null;

navEl.addEventListener("click", () => nav.classList.toggle("active"));
searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("input", throttle(handleSearch, 300));
prevButton.addEventListener("click", () => navigateMarkers(-1));
nextButton.addEventListener("click", () => navigateMarkers(1));

/**
 * marker fetchi və xəritə
 */
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

    try {
        await fetchMarkersAndDisplay();
        map.addListener('idle', () => {
            if (!isSearching) manageMarkerVisibility();
        });
    } catch (error) {
        console.error("Xəta:", error);
        alert("xəritənin yüklənməsində xəta var. Zəhmət olmasa bizimlə əlaqə saxlayın və yaxud bir az sonra yenidən dənəyin");
    }
}

/**
 * api fetch
 */
async function fetchMarkersAndDisplay() {
    toggleLoading(true);

    try {
        const response = await fetch('https://qerbiazerbaycanim.com/api/v1/markers/all', { headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        data.forEach(markerData => addMarkerToMap(markerData));
        manageMarkerVisibility();
    } catch (error) {
        console.error("Error fetching markers:", error);
        alert("Unable to load markers. Please try again.");
    } finally {
        toggleLoading(false);
    }
}

/**
 * xəritəyə markerlərin əlavə olunması
 */
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

    const infoWindow = new google.maps.InfoWindow({
        content: `<div class="custom-info-window"><strong>${markerData.title}</strong><p>${markerData.description}</p></div>`
    });

    mapMarker.addListener("click", () => {
        if (lastOpenedInfoWindow) lastOpenedInfoWindow.close();
        infoWindow.open(map, mapMarker);
        lastOpenedInfoWindow = infoWindow;
    });

    markers.push(mapMarker);
}

/**
 * bounda əsasən markerlərin görünməyi
 */
function manageMarkerVisibility() {
    const bounds = map.getBounds();
    const currentZoom = map.getZoom();

    markers.forEach(marker => {
        const markerPosition = marker.getPosition();
        const markerType = getMarkerType(marker);
        let shouldBeVisible = false;

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

/**
 * axtarış filteri
 */
function handleSearch() {
    const searchText = searchInput.value.toLowerCase().trim();
    isSearching = !!searchText;

    if (!searchText) {
        resetMarkers();
        return;
    }

    markers.forEach(marker => marker.setVisible(false));
    foundMarkers = markers.filter(marker =>
        marker.getTitle().toLowerCase().includes(searchText)
    );

    if (foundMarkers.length > 0) {
        foundMarkers.forEach(marker => marker.setVisible(true));
        currentIndex = 0;
        focusOnMarker(foundMarkers[currentIndex]);
    }
    // else {
    //     alert("tapılmadı.");
    // }

    updateNavigationButtons();
}

/**
 * inputun təmizlənməsi əsasında markerlərin bərpası
 */
function resetMarkers() {
    isSearching = false;
    searchInput.value = "";
    foundMarkers = [];
    hideNavigationButtons();
    manageMarkerVisibility();
}

/**
 * markerə fokus
 */
function focusOnMarker(marker) {
    if (marker && marker.getPosition) {
        map.setCenter(marker.getPosition());
        map.setZoom(15);
    }
}

/**
 * nəticər arasında bağlantı
 */
function navigateMarkers(step) {
    if (foundMarkers.length > 1) {
        currentIndex = (currentIndex + step + foundMarkers.length) % foundMarkers.length;
        markers.forEach(marker => marker.setVisible(false));
        const markerToFocus = foundMarkers[currentIndex];
        markerToFocus.setVisible(true);
        focusOnMarker(markerToFocus);
    }
}

/**
 * görünməyin dəyişməyi
 */
function updateNavigationButtons() {
    const visible = foundMarkers.length > 1 ? "block" : "none";
    prevButton.style.display = visible;
    nextButton.style.display = visible;
}

/**
 * əvvəl sonra buttonların görünüşü
 */
function hideNavigationButtons() {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
}

/**
 * yüklənmə zamanı display
 */
function toggleLoading(show) {
    if (loadingOverlay) loadingOverlay.style.display = show ? 'flex' : 'none';
}

/**
 * markerlərin iconları
 */
function getIcon(type) {
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

    return markerIcons[type.toLowerCase()] || markerIcons.default;
}

/**
 * növünü əldə etmək
 */
function getMarkerType(marker) {
    const icon = marker.getIcon();
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

    return Object.keys(markerIcons).find(type => markerIcons[type] === icon) || 'other';
}


function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}


window.onload = initMap;
