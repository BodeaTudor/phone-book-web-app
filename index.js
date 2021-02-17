window.PhoneBook = {
    API_BASE_URL: "http://localhost:8084/phone-book",

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
            console.log(response);
            location.reload();
        })
    },

    bindEvents: function () {
        $("#new-person-form").submit(function (event) {
            event.preventDefault();

            PhoneBook.createItem();
        });
    }
};

PhoneBook.bindEvents();