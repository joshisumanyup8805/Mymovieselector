const seatPrices = {
  regular: 200, // Price for regular seats
  vip: 500 // Price for VIP seats
};
const rows = ['A', 'B', 'C', 'D', 'E'];
const seatGrid = {
  A: 'regular',
  B: 'regular',
  C: 'vip',
  D: 'vip',
  E: 'regular'
};
const selectedSeatsList = document.getElementById('selectedSeatsList');
const totalPriceElement = document.getElementById('totalPrice');
const confirmButton = document.getElementById('confirmButton');
let selectedSeats = [];

// Generate seats for each row dynamically
rows.forEach(row => {
  const rowElement = document.getElementById(`row${row}`);
  for (let i = 0; i < 10; i++) {
      const seat = document.createElement('div');
      seat.classList.add('seat');
      seat.classList.add(seatGrid[row]);
      seat.innerText = `${row}${i + 1}`;
      seat.dataset.price = seatGrid[row] === 'vip' ? seatPrices.vip : seatPrices.regular;

      seat.addEventListener('click', () => toggleSeat(seat));
      rowElement.appendChild(seat);
  }
});

// Toggle seat selection
function toggleSeat(seat) {
  if (!seat.classList.contains('taken')) {
      seat.classList.toggle('selected');
      updateSelectedSeats();
  }
}

// Update selected seats and total price
function updateSelectedSeats() {
  selectedSeats = [...document.querySelectorAll('.seat.selected')].map(seat => ({
      seatNumber: seat.innerText,
      price: parseInt(seat.dataset.price)
  }));
  
  selectedSeatsList.innerHTML = ''; // Clear the current list
  let totalPrice = 0;
  selectedSeats.forEach(seat => {
      const li = document.createElement('li');
      li.innerText = `${seat.seatNumber} (₹${seat.price})`;
      selectedSeatsList.appendChild(li);
      totalPrice += seat.price;
  });
  totalPriceElement.innerText = totalPrice;
}

// Confirm selection
confirmButton.addEventListener('click', () => {
  if (selectedSeats.length > 0) {
      const seatNumbers = selectedSeats.map(seat => seat.seatNumber).join(', ');
      alert(`You have confirmed the following seats: ${seatNumbers}`);
  } else {
      alert('No seats selected.');
  }
});

// Example to mark some seats as taken
const takenSeats = ['A1', 'B5', 'C3', 'D6']; // Mark some seats as taken
takenSeats.forEach(seatNumber => {
  const seat = document.querySelector(`.seat:contains(${seatNumber})`);
  if (seat) {
      seat.classList.add('taken');
  }
});
