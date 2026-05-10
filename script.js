const applicants = [
  {
    id: 0,
    name: "Cole Von Cole",
    city: "Mother Russia",
    experience: "7 years",
    license: "Class F",
    availability: "You Wish",
    status: "Pending Review",
    phone: "(347) 695-0241",
    email: "cole@von.cole",
    notes: "Atrocious! I was promised a meal!!!!",
    image: "IMAGE/ColeVonCole.png"
  },
  {
    id: 1,
    name: "Tiger Woods",
    city: "Cypress, CA",
    experience: "10 years",
    license: "Class D",
    availability: "Weekdays and weekends",
    status: "Pending Review",
    phone: "(555) 201-4401",
    email: "Tiger@Hotmail.com",
    notes: "Only 2 DUIs in the past 10 years. Known to do drugs.",
    image: "IMAGE/TigerWoods26.png"
  },
  {
    id: 2,
    name: "John Pork",
    city: "O Block, Chiraq IL",
    experience: "56 years",
    license: "Class W",
    availability: "Full-time",
    status: "Approved",
    phone: "(555) 201-4403",
    email: "PorkJohn@cia.gov",
    notes: "REDACTED",
    image: "IMAGE/JohnPork26.jpg"
  },
  {
    id: 3,
    name: "Logan Paul",
    city: "Westlake, OH",
    experience: "13 years",
    license: "Driver License in Aokigahara Japan",
    availability: "Part-time afternoons",
    status: "Declined",
    phone: "(555) 201-4404",
    email: "Logan@ForestService.jap",
    notes: "Keeps trying to fight old staff members.",
    image: "IMAGE/LoganPaul.jpg"
  },
  {
    id: 4,
    name: "Billy Escamilla",
    city: "Green Bay, WI",
    experience: "Mobile Expert at T-Mobile",
    license: "Standard US Drivers License",
    availability: "24/7",
    status: "Pending Review",
    phone: "(555) 104 - 2072",
    email: "billyescamilla@outlook.com",
    notes: "Drives a little fast but has super cool cars!",
    image: "IMAGE/Billy.jpg"
  },
  {
    id: 5,
    name: "Tiger Woods",
    city: "Cypress, CA",
    experience: "10 years",
    license: "Class D",
    availability: "Weekdays and weekends",
    status: "Declined",
    phone: "(555) 201-4401",
    email: "Tiger@Hotmail.com",
    notes: "Only 2 DUIs in the past 10 years. Known to do drugs.",
    image: "IMAGE/TigerWoods16.jpg"
  },
  {
    id: 6,
    name: "jebidiah kerman",
    city: "New Jebidiah, Kerbin",
    experience: "15 years",
    license: "Test Pilot",
    availability: "Weekdays and weekends",
    status: "Interview Scheduled",
    phone: "(555) 201-4401",
    email: "Kaboom@KSP.gov",
    notes: "Lots of curage but also kinda stupid.",
    image: "IMAGE/jebidiahkerman.jpg"
  },
  {
    id: 7,
    name: "Tanka Jahari",
    city: "Staten Island NYC, NY",
    experience: "Lots of expierence",
    license: "None",
    availability: "4/13/2012",
    status: "Declined",
    phone: "(555) 807-1049",
    email: "Tanka@Dominos.com",
    notes: "Ordered a whole pizza but claimed that he did not.",
    image: "IMAGE/tanka.jpg"
  },
  {
    id: 8,
    name: "Paul Blart",
    city: "West Orange, New Jersey",
    experience: "Mall Cop",
    license: "None",
    availability: "Mon - Fri",
    status: "Declined",
    phone: "(555) 307-1139",
    email: "OfficerBlart@gmail.com",
    notes: "Saved the West Orange Pavilion Mall from hostage takers in 2012.",
    image: "IMAGE/Blart.jpg"
  }
];

const applicantGrid = document.getElementById("applicantGrid");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const modal = document.getElementById("applicantModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const totalApplicants = document.getElementById("totalApplicants");
const pendingApplicants = document.getElementById("pendingApplicants");
const interviewApplicants = document.getElementById("interviewApplicants");
const approvedApplicants = document.getElementById("approvedApplicants");

function getStatusClass(status) {
  switch (status) {
    case "Pending Review":
      return "status-pending";
    case "Interview Scheduled":
      return "status-interview";
    case "Approved":
      return "status-approved";
    case "Declined":
      return "status-declined";
    default:
      return "";
  }
}

function updateStats() {
  totalApplicants.textContent = applicants.length;
  pendingApplicants.textContent = applicants.filter(a => a.status === "Pending Review").length;
  interviewApplicants.textContent = applicants.filter(a => a.status === "Interview Scheduled").length;
  approvedApplicants.textContent = applicants.filter(a => a.status === "Approved").length;
}

function renderApplicants(list) {
  applicantGrid.innerHTML = "";

  if (list.length === 0) {
    applicantGrid.innerHTML = `
      <div class="empty-state">
        <h3>No applicants found</h3>
        <p>Try changing the search or filter.</p>
      </div>
    `;
    return;
  }

  list.forEach(applicant => {
    const card = document.createElement("div");
    card.className = "applicant-card";

    card.innerHTML = `
      <img class="applicant-image" src="${applicant.image}" alt="${applicant.name}" />
      <div class="applicant-body">
        <h2 class="applicant-name">${applicant.name}</h2>
        <p class="applicant-meta">${applicant.city}</p>

        <div class="info-row"><strong>Experience:</strong> ${applicant.experience}</div>
        <div class="info-row"><strong>License:</strong> ${applicant.license}</div>
        <div class="info-row"><strong>Availability:</strong> ${applicant.availability}</div>

        <span class="status-badge ${getStatusClass(applicant.status)}">${applicant.status}</span>

        <div class="card-actions">
          <button class="btn btn-primary" onclick="openModal(${applicant.id})">View Details</button>
          <button class="btn btn-secondary">Contact</button>
        </div>
      </div>
    `;

    applicantGrid.appendChild(card);
  });
}

function filterApplicants() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedStatus = statusFilter.value;

  const filtered = applicants.filter(applicant => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm) ||
      applicant.city.toLowerCase().includes(searchTerm) ||
      applicant.license.toLowerCase().includes(searchTerm);

    const matchesStatus =
      selectedStatus === "all" || applicant.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  renderApplicants(filtered);
}

function openModal(id) {
  const applicant = applicants.find(a => a.id === id);
  if (!applicant) return;

  modalBody.innerHTML = `
    <div class="modal-layout">
      <img src="${applicant.image}" alt="${applicant.name}" />
      <div class="modal-details">
        <h2>${applicant.name}</h2>
        <p><strong>City:</strong> ${applicant.city}</p>
        <p><strong>Phone:</strong> ${applicant.phone}</p>
        <p><strong>Email:</strong> ${applicant.email}</p>
        <p><strong>Experience:</strong> ${applicant.experience}</p>
        <p><strong>License:</strong> ${applicant.license}</p>
        <p><strong>Availability:</strong> ${applicant.availability}</p>
        <p><strong>Status:</strong> ${applicant.status}</p>
        <p><strong>Notes:</strong> ${applicant.notes}</p>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

searchInput.addEventListener("input", filterApplicants);
statusFilter.addEventListener("change", filterApplicants);

updateStats();
renderApplicants(applicants);

// Make function available for inline button click
window.openModal = openModal;
