
// real-input.onchange = 
function fileSelected() {
    var file = document.getElementById("real-input").files[0];

    if (file) {
        var fileSize = 0;  // fileSize = the sizw of file
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

// upload.onclick =
function uploadFile() {
    file = document.getElementById("real-input").files[0];
    
    // if didn't choose any file or choose wrong type file
    if (file == undefined) {
        alert("请选择正确的文件，再确认上传！");
        return ;
    }

    var fd = new FormData();
    fd.append("translate", file);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);

    xhr.open("POST", "/translate/uploadtranslate");
    xhr.send(fd);
}

// addEventListener for progress
function uploadProgress(event) {
    if (event.lengthComputable) {
        // percentComplete use to mark the percente of uploading file
        var percentComplete = Math.round(event.loaded * 100 / event.total);
        // change style
        document.getElementById("upload-status").innerHTML = '上传状态： 已上传 ' + percentComplete.toString() + '%';
    }
    else {
        document.getElementById("upload-status").innerHTML = "未能获取到文件大小";
    }
}

// addEventListener for load
function uploadComplete(event) {
    // get responseText
    var responJSON = JSON.parse(this.responseText);

    // highlight upload result
    document.getElementById("upload-status").style.color = 'red';

    if (responJSON.errcode == 0) {
        document.getElementById("upload-status").innerHTML = "上传状态： 上传成功！";
    }
    else {
        document.getElementById("upload-status").innerHTML = "上传状态： 上传失败！";
    }
}

// addEventListener for error
function uploadFailed(envent) {
    document.getElementById("upload-status").innerHTML = "上传状态：上传失败，请稍后重试！";
}

// addEventListener for abort
function uploadCanceled(event) {
    document.getElementById("upload-status").innerHTML = "上传状态：上传已被取消。";
}

/*********************************************************
   Upload file start from here
 *********************************************************/
document.onready = function () {
    var realInput = document.getElementById("real-input");
    var fakeInput = document.getElementById("fake-input");

    realInput.onchange = function () {
        
        var url = realInput.files[0].name;
        fakeInput.innerHTML = url;

        fileSelected();
    }

    var upload = document.getElementsByClassName("upload")[0];
    upload.onclick = function () {
        uploadFile();
    }
}