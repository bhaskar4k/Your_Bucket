// Input note while typing color change
document.addEventListener('DOMContentLoaded', function () {
    var myButton = document.getElementById('enter_note');

    myButton.addEventListener('input', function () {
        change_color_of_enter_note_area();
    });
});

function change_color_of_enter_note_area() {
    document.getElementById("enter_note").style.color = "#6900fc";
    setTimeout(function () {
        document.getElementById("enter_note").style.color = "rgb(3, 100, 255)";
    }, 500);
}


// Input link while typing color change
document.addEventListener('DOMContentLoaded', function () {
    var myButton = document.getElementById('enter_link');

    myButton.addEventListener('input', function () {
        change_color_of_enter_link_area();
    });
});

function change_color_of_enter_link_area() {
    document.getElementById("enter_link").style.color = "#6900fc";
    setTimeout(function () {
        document.getElementById("enter_link").style.color = "rgb(3, 100, 255)";
    }, 500);
}


// Input date while typing color change
document.addEventListener('DOMContentLoaded', function () {
    var myButton = document.getElementById('enter_time');

    myButton.addEventListener('input', function () {
        change_color_of_enter_time_area();
    });
});

function change_color_of_enter_time_area() {
    document.getElementById("enter_time").style.color = "#6900fc";
    setTimeout(function () {
        document.getElementById("enter_time").style.color = "rgb(3, 100, 255)";
    }, 500);
}


// Open close the input fields and bucket list
document.addEventListener('DOMContentLoaded', function () {
    var myButton = document.getElementById('get_one_more_btn');

    myButton.addEventListener('click', function () {
        open_close_the_input_fields();
    });
});

function open_close_the_input_fields() {
    if (document.getElementById("add_note").style.height === "175px") {
        document.getElementById("add_note").style.height = "0px";
        document.getElementById("add_link_and_time").style.height = "0px";
        document.getElementById("add_in_bucket").style.right = "-300px";
        document.getElementById("all_input_area").style.marginBottom = "0px";
        document.getElementById("clear_all_button").style.marginRight = "-35px";
        setTimeout(function () {
            document.getElementById("bucket_list_container").style.opacity = "1";
        }, 500);
        document.getElementById("bucket_list_container").style.display = "block";
    } else {
        document.getElementById("add_note").style.height = "175px";
        document.getElementById("add_link_and_time").style.height = "130px";
        document.getElementById("add_in_bucket").style.right = "10px";
        document.getElementById("all_input_area").style.marginBottom = "80px";
        document.getElementById("clear_all_button").style.marginRight = "-100px";
        setTimeout(function () {
            document.getElementById("bucket_list_container").style.display = "none";
        }, 500);
        document.getElementById("bucket_list_container").style.opacity = "0";
    }
}


// Insert a new item into bucket
document.addEventListener('DOMContentLoaded', function () {
    var myButton = document.getElementById('add_in_bucket');

    myButton.addEventListener('click', function () {
        add_in_bucket();
    });
});

function toggleBorderColor() {
    var inputElement = document.getElementById("enter_note");
    var currentColor = inputElement.style.borderColor;
    inputElement.style.borderColor = (currentColor === "red") ? "white" : "red";
}

function add_in_bucket() {
    let your_bucket_list = JSON.parse(localStorage.getItem('your_bucket_list'));
    if (!your_bucket_list) your_bucket_list = [];

    var inputText = document.getElementById("enter_note").value;
    var inputLink = document.getElementById("enter_link").value;
    var inputTime = document.getElementById("enter_time").value;
    var formattedText = inputText.replace(/\n/g, "<br>", " ");

    if (inputText === "" || inputText === null || inputText === undefined) {
        var inputElement = document.getElementById("enter_note");

        inputElement.style.border = "3px solid red";
        var interval = setInterval(toggleBorderColor, 200);

        setTimeout(function () {
            clearInterval(interval);
            inputElement.style.border = "3px solid white";
        }, 2000);

        return;
    }

    let newItem = {
        index: your_bucket_list.length,
        description: formattedText,
        link: inputLink,
        time: inputTime
    };

    your_bucket_list.push(newItem);
    localStorage.removeItem('your_bucket_list');
    localStorage.setItem('your_bucket_list', JSON.stringify(your_bucket_list));
    location.reload();
}


// Display your bucket list
document.addEventListener('DOMContentLoaded', function () {
    show_your_bucket_list();
});

function show_your_bucket_list() {
    const objectList = document.getElementById('bucket_list_container');
    let your_bucket_list = JSON.parse(localStorage.getItem('your_bucket_list'));
    your_bucket_list.reverse();
    if (your_bucket_list === null) return;
    console.log(your_bucket_list)

    your_bucket_list.forEach((object, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'bucket';
        if (index > 0) listItem.style.marginTop = '20px';

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'description'
        descriptionDiv.innerHTML = `<p class="description_info">What TO DO</p><p class="description_detail">${object.description}</p>`;
        listItem.appendChild(descriptionDiv);

        const linkAndTimeContainer = document.createElement('div');
        linkAndTimeContainer.className = 'link_and_time_container';

        if (object.link != null && object.link != "" && object.link != " " && object.link != undefined) {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'link';
            linkDiv.innerHTML = `<a class="link_info" href="${object.link}" target="_blank">Link</a>`;
            linkAndTimeContainer.appendChild(linkDiv);
        }


        if (object.time != null && object.time != "" && object.time != " " && object.time != undefined) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'time';
            timeDiv.innerHTML = `<p class="time_info">Time&nbsp;:&nbsp;</p><p class="time_detail">${object.time}</p>`;
            linkAndTimeContainer.appendChild(timeDiv);
        }

        listItem.appendChild(linkAndTimeContainer);

        const deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.className = 'deleteBtn'
        deleteButtonDiv.innerHTML = `<p class="del_btn" id="delete_${index}">Delete Task</p>`;
        listItem.appendChild(deleteButtonDiv);

        objectList.appendChild(listItem);
    });
}

// Delete whole bucket controller
document.addEventListener('DOMContentLoaded', function () {
    var myButton = document.getElementById('clear_all_button');

    myButton.addEventListener('click', function () {
        delete_whole_bucket();
    });
});

function delete_whole_bucket() {
    localStorage.removeItem("your_bucket_list");
    location.reload();
}


// Delete a bucket controller
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bucket_list_container').addEventListener('click', function (event) {
        if (event.target.tagName === 'P' && event.target.id.startsWith('delete_')) {
            const index = parseInt(event.target.id.split('_')[1], 10);
            delete_a_bucket(index);
        }
    });
});

function delete_a_bucket(index) {
    let your_bucket_list = JSON.parse(localStorage.getItem('your_bucket_list'));
    let n = your_bucket_list.length;
    let deleted_index = (n - index - 1);

    let new_bucket_list = [];
    for (let i = 0; i < n; i++) {
        if (i === deleted_index) continue;
        new_bucket_list.push(your_bucket_list[i]);
    }

    localStorage.removeItem('your_bucket_list');
    localStorage.setItem('your_bucket_list', JSON.stringify(new_bucket_list));
    location.reload();
}