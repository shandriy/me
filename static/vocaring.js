addEventListener("DOMContentLoaded", function() {
  var xhr = new XMLHttpRequest();
  var out = ""
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status.toString()[0] == "2") {
      var websites = xhr.responseText.replace(/(\\|\n|\s|\[|\]|")/g, "").split(",");
      var fullerene = websites.indexOf("https://enty.nekoweb.org");
      out = "<a href='" +
        websites[fullerene - 1] +
        "'>Last</a> - VOCARING - <a href='" +
        websites[fullerene + 1] +
        "'>Next</a><br>" +
        "<sub><a href='https://webring.adilene.net/index.php'>Index</a> - " +
        "<a href='https://webring.adilene.net/members.php'>Members</a></sub>";
      var vocaring = document.getElementById("vocaring");
      vocaring.innerHTML = out;
    }
  }
  xhr.open("GET", "https://webring.adilene.net/webring.json", true);
  xhr.send();
})