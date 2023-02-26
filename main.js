status = "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(480, 380);
video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
objectname = document.getElementById("input1").value;          
}

function modelLoaded()
{
    console.log("model loaded");
    status = true;
}

function draw()
{
image(video, 0, 0, 480, 380);
}