window.PhoneBook = {
    API_BASE_URL: "http://localhost:8084/phone-book",

    editId: -1,

    createItem: function () {
        var firstName = $("#first-name-field").val();
        var lastName = $("#last-name-field").val();
        var phoneNumber = $("#phone-number-field").val();

        var item = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        };

        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(item)
        }).done(function (response) {
            PhoneBook.getItems();
            location.reload();
        })
    },

    getItems: function () {
        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "GET",
        }).done(function (response) {
            PhoneBook.displayItems(JSON.parse(response));
        })
    },

    displayItems: function (items) {
        var tableBodyHtml = "";

        items.forEach(item => tableBodyHtml += PhoneBook.getItemRow(item));

        $('#agenda-items-table tbody').html(tableBodyHtml);
    },

    getItemRow: function (item) {
        return `<tr>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.phoneNumber}</td>
                <td><a href="#" class="delete-person-from-agenda fa fa-trash" data-id="${item.id}"></a>
                    <a href="#" class="edit-number-from-agenda fa fa-pencil" data-id="${item.id}" data-phone-number="${item.phoneNumber}"></a> </td>
            </tr>`
    },

    updateItem: function (itemId, phoneNumber) {
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + itemId,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                phoneNumber: phoneNumber
            })
        }).done(function (response) {
            PhoneBook.getItems();
            location.reload();
        })
    },

    deleteItem: function (itemId) {
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + itemId,
            method: "DELETE",
        }).done(function (response) {
            PhoneBook.getItems();
        })
    },

    bindEvents: function () {
        $("#new-person-form").submit(function (event) {
            event.preventDefault();

            if (PhoneBook.editId < 0) {
                PhoneBook.createItem();
            } else {
                var phoneNumber = $("#phone-number-field").val();
                PhoneBook.updateItem(PhoneBook.editId, phoneNumber);
            }
        });
        $("#agenda-items-table").delegate(".delete-person-from-agenda", "click", function (event) {
            event.preventDefault();

            var itemId = $(this).data("id");

            PhoneBook.deleteItem(itemId);
        });

        $("#agenda-items-table").delegate(".edit-number-from-agenda", "click", function (event) {
            event.preventDefault();

            var itemId = $(this).data("id");
            PhoneBook.editId = itemId;
        });
    }
};

PhoneBook.getItems();
PhoneBook.bindEvents();