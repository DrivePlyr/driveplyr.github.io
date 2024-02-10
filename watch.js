const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

        // Function to fetch JSON data from the URL and update the HTML
        function fetchAndDisplayData() {
            // Define the URL to fetch JSON data
            var url = "https://driveplyr.appspages.online/json/"+id;

            // Make an HTTP request to fetch the JSON data
            fetch(url)
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  
                    //document.getElementById("my_video_1").poster = data.poster_url;
                    //document.getElementById("my_video_1").src = data.url;
                  document.getElementById("videotitle").innerHTML = data.title;
                  document.title = data.title;
                  document.getElementById("videodescription").innerHTML = data.description;
                  //document.getElementById("my_video_1").src = data.url;
                 
  document.getElementById('channelname').innerHTML = data.name; 
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
let loadvideo=()=>{
  document.getElementById('videoframe').src = "https://driveplyr.appspages.online/player.html?id="+id+"&player=plyr";
}
        // Call the fetchAndDisplayData function to fetch and display the data
        fetchAndDisplayData();
loadvideo();

// Fetch the JSON data
fetch('https://driveplyr.appspages.online/api/videos.php?limit=40')
    .then(response => response.json())
    .then(data => {
        const chatvideos = document.getElementById('chatvideos');

        // Loop through the video data and create HTML elements for each video
      console.log(data);
        data.forEach(video => {
          if(!video.poster_url){video.poster_url = "https://cdn.statically.io/og/theme=dark/"+video.title+".png"}
            const videoHtml = `
                <div class="chat-vid__wrapper">
                   <a  href="../watch.html?id=${video.id}"> <img class="chat-vid__img" loading="lazy" src="${video.poster_url}">
                    <div class="chat-vid__content">
                        <div class="chat-vid__name">${video.title}</div></a>
                        <div class="chat-vid__by">${video.name}</div>
                        <div class="chat-vid__info">${video.views} views • ${video.date}</div>
                    </div>
                </div>
            `;
            chatvideos.insertAdjacentHTML('beforeend', videoHtml);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });