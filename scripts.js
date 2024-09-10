document.addEventListener('DOMContentLoaded', () => {
    // Sample data array
    let leaveRequests = [
        { id: 1, name: "Mark Jacobs", startDate: "31 Mar, 2023 09:00 AM", endDate: "31 Mar, 2023 18:00 PM", days: 1.0, leaveType: "Annual Leave", image:"./assets/img/mark.svg" },
        { id: 2, name: "Charlie Kristen", startDate: "10 Apr, 2023 09:00 AM", endDate: "11 Apr, 2023 18:00 PM", days: 2.0, leaveType: "Annual Leave",image:"./assets/img/charlie.svg" },
        { id: 3, name: "Nur Fariha binti Maslan", startDate: "21 Apr, 2023 09:00 AM", endDate: "24 Apr, 2023 18:00 PM", days: 2.0, leaveType: "Hospital Leave", image:"./assets/img/fariha.svg" }
    ];

    // Function to render table with leave requests
    function renderTable() {
        const tableBody = document.querySelector('.table--body');
        if (!tableBody) {
            console.error('Table body not found');
            return;
        }
        tableBody.innerHTML = ''; // Clear existing rows

        leaveRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox"/></td>
                <td class="name-cell">
                    <span class="status-dot"></span>
                    <img alt="Profile picture of ${request.name}" class="profile-pic"  src=${request.image} alt=${request.image} />
                    ${request.name}
                </td>
                <td>${request.startDate}<br/>${request.endDate}</td>
                <td>${request.days}</td>
                <td>${request.leaveType}</td>
                <td class="actions">
                    <button class="reject" data-id="${request.id}">REJECT</button>
                    <button class="approve" data-id="${request.id}">APPROVE</button>
                    <button class="arrow"><i class="fas fa-chevron-right"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to handle approval/rejection actions
    function handleAction(action, id) {
        const index = leaveRequests.findIndex(request => request.id === id);
        if (index !== -1) {
            const request = leaveRequests[index];
            alert(`${action}: ${request.name}`);
            leaveRequests.splice(index, 1); // Remove the request from the array
            renderTable(); // Re-render the table
        }
    }

    // Initial render of the table
    renderTable();

    // Handle approve and reject button clicks using event delegation
    const tableBody = document.querySelector('.table--body');
    if (tableBody) {
        tableBody.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('approve') || target.classList.contains('reject')) {
                const action = target.classList.contains('approve') ? 'Approved' : 'Rejected';
                const id = parseInt(target.getAttribute('data-id'));
                handleAction(action, id);
            }
        });
    }

    // Handle view toggle
    const listViewButton = document.querySelector('.list--view');
    const monthViewButton = document.querySelector('.month--view');
    const listViewContent = document.getElementById('listViewContent');
    const monthViewContent = document.getElementById('monthViewContent');

    let isListView = true;

    function toggleView() {
        if (isListView) {
            listViewButton.classList.remove('active');
            monthViewButton.classList.add('active');
            listViewContent.style.display = 'none';
            monthViewContent.style.display = 'block';
        } else {
            listViewButton.classList.add('active');
            monthViewButton.classList.remove('active');
            listViewContent.style.display = 'block';
            monthViewContent.style.display = 'none';
        }
        isListView = !isListView;
    }

    if (listViewButton && monthViewButton) {
        // Initialize with List View active
        listViewButton.classList.add('active');
        monthViewButton.classList.remove('active');
        listViewContent.style.display = 'block';
        monthViewContent.style.display = 'none';

        listViewButton.addEventListener('click', toggleView);
        monthViewButton.addEventListener('click', toggleView);
    }

    // Initialize Pikaday for date picker
    new Pikaday({
        field: document.getElementById('leave-date'),
        format: 'YYYY-MM-DD',
        onSelect: function(date) {
            console.log(date.toISOString().split('T')[0]);
        }
    });

    // Additional functionality for the date picker navigation
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    if (prevMonthButton && nextMonthButton) {
        prevMonthButton.addEventListener('click', () => {
            const picker = Pikaday.getPikadayInstance(); // Get the Pikaday instance
            if (picker) {
                picker.gotoMonth(picker.getDate().getMonth() - 1);
            }
        });

        nextMonthButton.addEventListener('click', () => {
            const picker = Pikaday.getPikadayInstance(); // Get the Pikaday instance
            if (picker) {
                picker.gotoMonth(picker.getDate().getMonth() + 1);
            }
        });
    }

    new Pikaday({
        field: document.getElementById('leave-date2'),
        format: 'YYYY-MM-DD',
        onSelect: function(date) {
            console.log(date.toISOString().split('T')[0]);
        }
    });

    // Additional functionality for the date picker navigation
    const prevMonthButton2 = document.getElementById('prevMonth');
    const nextMonthButton2 = document.getElementById('nextMonth');

    if (prevMonthButton2 && nextMonthButton2) {
        prevMonthButton2.addEventListener('click', () => {
            const picker = Pikaday.getPikadayInstance(); // Get the Pikaday instance
            if (picker) {
                picker.gotoMonth(picker.getDate().getMonth() - 1);
            }
        });

        nextMonthButton2.addEventListener('click', () => {
            const picker = Pikaday.getPikadayInstance(); // Get the Pikaday instance
            if (picker) {
                picker.gotoMonth(picker.getDate().getMonth() + 1);
            }
        });
    }

    // Toggle the card display when the notification icon is clicked
    const notificationIcon = document.querySelector('img[alt="notification--logo"]');
    const card = document.querySelector('.card');

    if (notificationIcon && card) {
        // Initially show the card (remove any hidden class)
        card.classList.remove('hidden');
        
        // Add a click event listener to the notification icon
        notificationIcon.addEventListener('click', () => {
            // Toggle the 'hidden' class to hide/show the card
            card.classList.toggle('hidden');
        });
    }

    // Event delegation for dynamic arrow buttons
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('arrow')) {
            console.log('Arrow button clicked');
        }
    });

    // Event delegation for checkboxes
    tableBody.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            console.log('Checkbox state changed');
        }
    });

    // Change background color of clicked <p> tags
    const daysTab = document.querySelector('.days--tab');
    if (daysTab) {
        daysTab.addEventListener('click', function(event) {
            const target = event.target;
            if (target.tagName === 'P') {
                // Remove 'selected' class from all <p> elements
                daysTab.querySelectorAll('p').forEach(p => p.classList.remove('selected'));
                // Add 'selected' class to the clicked <p> element
                target.classList.add('selected');
            }
        });
    }

    console.log('Leave management script loaded');
});
