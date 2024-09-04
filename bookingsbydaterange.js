async function getBookingsByDateRange() {
    const startDate = prompt('Enter start date (YYYY-MM-DD):');
    const endDate = prompt('Enter end date (YYYY-MM-DD):');
    if (startDate && endDate) {
        try {
            const response = await axios.get(`http://localhost:5193/api/BookingReports/GetBookingsByDateRange?startDate=${startDate}&endDate=${endDate}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            displayBookings(response.data);
        } catch (error) {
            alert('Failed to fetch bookings by date range.');
        }
    }
}

async function getBookingsByFacility() {
    const facility = prompt('Enter facility description:');
    if (facility) {
        try {
            const response = await axios.get(`http://localhost:5193/api/BookingReports/GetBookingsByFacility?facilityDescription=${facility}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            displayBookings(response.data);
        } catch (error) {
            alert('Failed to fetch bookings by facility.');
        }
    }
}

async function getBookingsByStatus() {
    const status = prompt('Enter booking status:');
    if (status) {
        try {
            const response = await axios.get(`http://localhost:5193/api/BookingReports/GetBookingsByStatus?status=${status}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            displayBookings(response.data);
        } catch (error) {
            alert('Failed to fetch bookings by status.');
        }
    }
}

async function getBookingsSummary() {
    try {
        const response = await axios.get('http://localhost:5193/api/BookingReports/GetBookingsSummary', {
            headers: { Authorization: `Bearer ${token}` }
        });
        displaySummary(response.data);
    } catch (error) {
        alert('Failed to fetch bookings summary.');
    }
}

function displayBookings(bookings) {
    const tbody = document.querySelector('#bookingsTable tbody');
    tbody.innerHTML = '';
    bookings.forEach(booking => {
        tbody.innerHTML += `
            <tr>
                <td>${booking.bookingId}</td>
                <td>${booking.facilityDescription}</td>
                <td>${new Date(booking.bookingDateFrom).toLocaleString()}</td>
                <td>${new Date(booking.bookingDateTo).toLocaleString()}</td>
                <td>${booking.bookedBy}</td>
                <td>${booking.bookingStatus}</td>
                <td>
                    <button onclick="updateBooking(${booking.bookingId})">Update</button>
                    <button onclick="deleteBooking(${booking.bookingId})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function displaySummary(summary) {
    const tbody = document.querySelector('#bookingsTable tbody');
    tbody.innerHTML = '';
    summary.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td colspan="2">${item.facility}</td>
                <td colspan="5">
                    Total: ${item.totalBookings}, 
                    Pending: ${item.pendingBookings}, 
                    Confirmed: ${item.confirmedBookings}, 
                    Cancelled: ${item.cancelledBookings}
                </td>
            </tr>
        `;
    });
} 