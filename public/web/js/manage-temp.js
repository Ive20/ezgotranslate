

document.onready = function () {
    var realInput = document.getElementById("real-input");
    var fakeInput = document.getElementById("fake-input");

    realInput.onchange = function () {
        
        var url = realInput.files[0].name;
        fakeInput.innerHTML = url;
    }


    realInput.files[0];
    var upload = document.getElementsByClassName("upload")[0];


    
}