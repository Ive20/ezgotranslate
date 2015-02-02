
function fileSelected() {
    var file = document.getElementById("real-input").files[0];

    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        }
        else {
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
        }

        document.getElementById("file-name").innerHTML = '文件名： ' + file.name;
        document.getElementById("file-size").innerHTML = '文件大小： ' + fileSize;
        document.getElementById("file-type").innerHTML = '文件类型： ' + file.type;
    }
}

function uploadFile() {
    var fd = new FormData();
    fd.append("fileToUplaod", document.getElementById("real-input").files[0]);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress(), false);
    xhr.addEventListener("load", uploadComplete(), false);
    xhr.addEventListener("error", uploadFailed(), false);
    xhr.addEventListener("abort", uploadCanceled(), false);

    xhr.open("POST", "...");
    xhr.send(fd);
}

function uploadProgress(event) {
    if (event.lengthComputable) {
        var percentComplete = Math.round(event.loaded * 100 / event.tottal);

        document.getElementById("upload-status").innerHTML = '上传状态： 已上传 ' + percentComplete.toString() + '%';
    }

    else {
        document.getElementById("upload-status").innerHTML = "未能获取到文件大小";
    }
}

function uploadComlete(event) {
    document.getElementById("upload-status").innerHTML = "上传成功！";
}

function uploadFailed(envent) {
    document.getElementById("upload-status").innerHTML = "上传失败，请稍后重试！";
}

function uploadCanceled(event) {
    document.getElementById("upload-stauts").innerHTML = "上传已被取消。";
}

document.onready = function () {
    var realInput = document.getElementById("real-input");
    var fakeInput = document.getElementById("fake-input");

    realInput.onchange = function () {
        
        var url = realInput.files[0].name;
        fakeInput.innerHTML = url;

        fileSelected();
    }


    realInput.files[0];
    var upload = document.getElementsByClassName("upload")[0];


    
}