function apod() {
  const url = "https://api.nasa.gov/planetary/apod?api_key=";
  const apiKey = "8t7THCu7a2wefsxzq6inqITjshMWUd4gwzkXrmVi";
  const dateInput = document.querySelector("#apod-date");
  const dateTitle = document.querySelector(".apod-date-title");
  const mediaSection = document.querySelector(".apod-media-container");
  const title = document.querySelector(".apod-title");
  const copyright = document.querySelector(".apod-copyright");
  const description = document.querySelector(".apod-description");

  const currentDate = new Date().toISOString().slice(0, 10);

  const imageSection = `<a class="hd-img" href="" target="-blank">
                          <img class="image-of-the-day" src="" alt="image-by-nasa">
                        </a>`;

  const videoSection = `<div class="video-div"> 
                          <iframe class="video-link" src="" frameborder="0" allow="fullscreen"></iframe>
                        </div>`;

  let newDate = "&date=" + dateInput.value + "&";

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function convertDate(date_str) {
    temp_date = date_str.split("-");
    result =
      temp_date[2] +
      " " +
      months[Number(temp_date[1]) - 1] +
      " " +
      temp_date[0];

    if (result.startsWith(0)) {
      result = result.slice(1);
      return result;
    } else {
      return result;
    }
  }

  function fetchData() {
    try {
      fetch(url + apiKey + newDate)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          displayData(json);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function displayData(data) {
    title.innerHTML = data.title;

    if (data.hasOwnProperty("copyright")) {
      copyright.innerHTML = "Image Credit & Copyright: " + data.copyright;
    } else {
      copyright.innerHTML = "";
    }

    dateInput.value = data.date;
    dateTitle.innerHTML = convertDate(data.date);
    dateInput.max = currentDate;
    dateInput.min = "1995-06-16";

    if (data.media_type == "video") {
      mediaSection.innerHTML = videoSection;
      document.querySelector(".video-link").src = data.url;
    } else {
      mediaSection.innerHTML = imageSection;
      document.querySelector(".hd-img").href = data.hdurl;
      document.querySelector(".image-of-the-day").src = data.url;
    }
    description.innerHTML = data.explanation;
  }
  fetchData();
}

const dateInput = document.querySelector("#apod-date");
dateInput.addEventListener("change", (e) => {
  e.preventDefault();
  apod();
});

window.onload = apod();
