var modal = document.getElementById("myModal");

var img = document.getElementById("imgModal");
var modalImg = document.getElementById("modalImage");

img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
