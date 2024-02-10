
function convertToRelativeTime(dateString) {
    // Convert the date string to a Unix timestamp
    const timestamp = new Date(dateString).getTime();

    // Get the current timestamp
    const now = Date.now();

    // Calculate the time difference in milliseconds
    const diff = now - timestamp;

    // Define time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    // Format the relative time string based on the time difference
    if (diff < minute) {
        return "Just now";
    } else if (diff < hour) {
        const minutes = Math.floor(diff / minute);
        return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
    } else if (diff < day) {
        const hours = Math.floor(diff / hour);
        return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
    } else if (diff < week) {
        const days = Math.floor(diff / day);
        return days + " day" + (days > 1 ? "s" : "") + " ago";
    } else if (diff < month) {
        const weeks = Math.floor(diff / week);
        return weeks + " week" + (weeks > 1 ? "s" : "") + " ago";
    } else if (diff < year) {
        const months = Math.floor(diff / month);
        return months + " month" + (months > 1 ? "s" : "") + " ago";
    } else {
        const years = Math.floor(diff / year);
        return years + " year" + (years > 1 ? "s" : "") + " ago";
    }
}

function formatViewsCount(views) {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    let suffixIndex = 0;

    while (views >= 1000 && suffixIndex < suffixes.length - 1) {
        views /= 1000;
        suffixIndex++;
    }

    // Format the views count to have at most one decimal point
    const formattedViews = views.toFixed(suffixIndex > 0 ? 1 : 0);

    // Append the appropriate suffix
    return formattedViews + suffixes[suffixIndex];
}

$(function () {
 $(".sidebar-link").click(function () {
  $(".sidebar-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(window)
 .resize(function () {
  if ($(window).width() > 1090) {
   $(".sidebar").removeClass("collapse");
  } else {
   $(".sidebar").addClass("collapse");
  }
 })
 .resize();

const allVideos = document.querySelectorAll(".video");

allVideos.forEach((v) => {
 v.addEventListener("mouseover", () => {
  const video = v.querySelector("video");
  video.play();
 });
 v.addEventListener("mouseleave", () => {
  const video = v.querySelector("video");
  video.pause();
 });
});

$(function () {
 $(".logo, .logo-expand, .discover").on("click", function (e) {
  $(".main-container").removeClass("show");
  $(".main-container").scrollTop(0);
 });
 $(".trending, .video").on("click", function (e) {
  $(".main-container").addClass("show");
  $(".main-container").scrollTop(0);
  $(".sidebar-link").removeClass("is-active");
  $(".trending").addClass("is-active");
 });

 $(".video").click(function () {
  var source = $(this).find("source").attr("src");
  var title = $(this).find(".video-name").text();
  var person = $(this).find(".video-by").text();
  var img = $(this).find(".author-img").attr("src");
  $(".video-stream video").stop();
  $(".video-stream source").attr("src", source);
  $(".video-stream video").load();
  $(".video-p-title").text(title);
  $(".video-p-name").text(person);
  $(".video-detail .author-img").attr("src", img);
 });
});

    // URL of the API
    const apiUrl = "https://driveplyr.appspages.online/api/videos.php?limit=40";

    // Function to fetch and display videos
    async function fetchAndDisplayVideos() {
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                const videosContainer = document.getElementById("videos");

                // Iterate through the fetched data and create video elements
                data.forEach(video => {
                    const videoElement = document.createElement("div");
                    videoElement.classList.add("video", "anim");
                  if(!video.poster_url){video.poster_url = "https://cdn.statically.io/og/theme=dark/"+video.title+".png"}

                    videoElement.innerHTML = `

                    <div class="video anim" style="--delay: .7s">
   <div class="video-time">6 min</div>
   <div class="video-wrapper">
    <a href="./watch.html?id=${video.id}" target=""><video muted="" poster="${video.poster_url}" loading="lazy">
     <source src="${video.url}" type="video/mp4">
    </video>
    <div class="author-img__wrapper video-author">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
      <path d="M20 6L9 17l-5-5"></path>
     </svg>
     <img class="author-img" src="${"https://cdn.statically.io/og/theme=dark/"+video.id+".png"}">
    </div>
   </div>
   <div class="video-by">${video.name}</div>
   <div class="video-name">${video.title}</div></a>
   <div class="video-view">${video.views} views<span class="seperate video-seperate"></span>${convertToRelativeTime(video.date)}</div>
  </div>

                  `;

                    videosContainer.appendChild(videoElement);
                });
            } else {
                console.error("Failed to fetch data from the API");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    // Call the function to fetch and display videos
    fetchAndDisplayVideos();


function onScrollToBottom() {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      fetchAndDisplayVideos();
  }
}

// Attach the event listener to the scroll event
window.addEventListener("scroll", onScrollToBottom);