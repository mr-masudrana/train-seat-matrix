const trainSelect = document.getElementById("trainSelect");
const coachSelect = document.getElementById("coachSelect");
const seatMatrixDiv = document.getElementById("seatMatrix");

let trains = [], coaches = [], seatData = {};

async function loadData() {
  trains = await (await fetch("data/trains.json")).json();
  coaches = await (await fetch("data/coaches.json")).json();
  seatData = await (await fetch("data/seat_matrix.json")).json();

  populateDropdown(trainSelect, trains);
  populateDropdown(coachSelect, coaches);

  trainSelect.addEventListener("change", showSeats);
  coachSelect.addEventListener("change", showSeats);
}

function populateDropdown(select, data) {
  select.innerHTML = `<option value="">নির্বাচন করুন</option>`;
  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

function showSeats() {
  const trainId = trainSelect.value;
  const coachId = coachSelect.value;
  seatMatrixDiv.innerHTML = "";

  if (trainId && coachId && seatData[trainId] && seatData[trainId][coachId]) {
    const matrix = seatData[trainId][coachId];

    matrix.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("seat-row");

      row.forEach(seat => {
        const seatBox = document.createElement("div");
        seatBox.classList.add("seat");
        seatBox.textContent = seat;
        rowDiv.appendChild(seatBox);
      });

      seatMatrixDiv.appendChild(rowDiv);
    });
  } else {
    seatMatrixDiv.innerHTML = "<p>এই ট্রেন ও কোচের জন্য কোন আসন বিন্যাস পাওয়া যায়নি।</p>";
  }
}

loadData();
