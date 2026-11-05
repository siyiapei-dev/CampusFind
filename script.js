const searchInput = document.getElementById("searchInput");

const roomCards = document.querySelectorAll(".room-card");

searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value.toLowerCase();

    roomCards.forEach(function(card) {

        const roomDetails = card.textContent.toLowerCase();

        if (roomDetails.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// Select the popup elements
const modal = document.getElementById("roomModal");
const closeModal = document.getElementById("closeModal");

// Add View Details buttons to all room cards
document.querySelectorAll(".room-card").forEach(function(card) {

    const button = document.createElement("button");

    button.textContent = "View Details →";
    button.className = "view-details";

    card.appendChild(button);

    button.addEventListener("click", function() {

        const image = card.querySelector("img").src;
        const title = card.querySelector("h3").textContent;
        const details = card.querySelectorAll("p");

        document.getElementById("modalImage").src = image;

        document.getElementById("modalTitle").textContent = title;

        document.getElementById("modalBuilding").textContent =
            details[0].textContent;

        document.getElementById("modalFloor").textContent =
            details[1].textContent;

        document.getElementById("modalType").textContent =
            details[2].textContent;

        document.getElementById("modalDirections").textContent =
            "Directions: Please follow the campus building signs to locate this room.";

        modal.style.display = "flex";

    });

});

// Close popup
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close when clicking outside the popup
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// INTERACTIVE CAMPUS MAP

const mapBuildings = document.querySelectorAll(".map-building");

const buildingResults =
    document.getElementById("buildingResults");

mapBuildings.forEach(function(building) {

    building.addEventListener("click", function() {

        const buildingName =
            building.getAttribute("data-building");

        const allRooms =
            document.querySelectorAll(".room-card");

        let matchingRooms = [];

        allRooms.forEach(function(card) {

            const details =
                card.querySelectorAll("p");

            if (details[0] &&
                details[0].textContent.includes(buildingName)) {

                matchingRooms.push(card);

            }

        });

        buildingResults.innerHTML =
            `<h3>Rooms in ${buildingName}</h3>`;

        if (matchingRooms.length === 0) {

            buildingResults.innerHTML +=
                "<p>No rooms have been added to this building yet.</p>";

            return;
        }

        matchingRooms.forEach(function(card) {

            const roomName =
                card.querySelector("h3").textContent;

            const roomRow =
                document.createElement("div");

            roomRow.className = "map-room";

            const roomText =
                document.createElement("strong");

            roomText.textContent = roomName;

            const viewButton =
                document.createElement("button");

            viewButton.textContent = "View Details";

            viewButton.addEventListener("click", function() {

                card.querySelector(".view-details").click();

            });

            roomRow.appendChild(roomText);
            roomRow.appendChild(viewButton);

            buildingResults.appendChild(roomRow);

        });

        buildingResults.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

});

   // ADMIN DASHBOARD FUNCTIONALITY

const adminForm = document.getElementById("adminForm");
const adminRoomList = document.getElementById("adminRoomList");

function displayAdminRooms() {

    const cards = document.querySelectorAll(".room-card");

    adminRoomList.innerHTML = "";

    cards.forEach(function(card) {

        const roomName = card.querySelector("h3").textContent;

        const row = document.createElement("div");
        row.className = "admin-room";

        const name = document.createElement("strong");
        name.textContent = roomName;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-room";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-room";

        editButton.addEventListener("click", function() {

            const newName = prompt("Enter new room number:", roomName);

            if (newName && newName.trim()) {
                card.querySelector("h3").textContent = newName.trim();
                displayAdminRooms();
            }

        });

        deleteButton.addEventListener("click", function() {

            if (confirm("Are you sure you want to delete " + roomName + "?")) {
                card.remove();
                displayAdminRooms();
            }

        });

        row.appendChild(name);
        row.appendChild(editButton);
        row.appendChild(deleteButton);

        adminRoomList.appendChild(row);

    });

}

  // ADD NEW ROOM

adminForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const number = document.getElementById("roomNumber").value;
    const building = document.getElementById("roomBuilding").value;
    const type = document.getElementById("roomType").value;
    const floor = document.getElementById("roomFloor").value;
    const location = document.getElementById("roomLocation").value;

    const imageInput = document.getElementById("roomImage").value;

    const image = imageInput ||
        "https://images.unsplash.com/photo-1562774053-701939374585?w=600";

    const card = document.createElement("div");
    card.className = "room-card";

    const roomImage = document.createElement("img");
    roomImage.src = image;
    roomImage.alt = building;

    const title = document.createElement("h3");
    title.textContent = "Room " + number;

    const details = [
        "Building: " + building,
        "Floor: " + floor,
        "Type: " + type
    ];

    card.appendChild(roomImage);
    card.appendChild(title);

    details.forEach(function(detail) {
        const p = document.createElement("p");
        p.textContent = detail;
        card.appendChild(p);
    });

    const viewButton = document.createElement("button");
    viewButton.className = "view-details";
    viewButton.textContent = "View Details →";

    viewButton.addEventListener("click", function() {

        document.getElementById("modalImage").src = image;
        document.getElementById("modalTitle").textContent = title.textContent;
        document.getElementById("modalBuilding").textContent = details[0];
        document.getElementById("modalFloor").textContent = details[1];
        document.getElementById("modalType").textContent = details[2];
        document.getElementById("modalDirections").textContent =
            "Directions: " + location;

        document.getElementById("roomModal").style.display = "flex";

    });

    card.appendChild(viewButton);

    document.getElementById("roomContainer").appendChild(card);

    adminForm.reset();

    displayAdminRooms();

    alert("Room added successfully!");

});

// Initial dashboard display
displayAdminRooms();







































