addEventListener("DOMContentLoaded", function() {
  var hash;
  setInterval(function() {
    var curHash = location.hash.substring(1).toLowerCase();
    if (hash !== curHash) {
      
    }
    hash = curHash;
  }, 100);
});