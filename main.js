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
if(status!="")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status : objects detected";
            fill("#ff0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objectname == objects[i].label)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "status : object "+ objectname +" found";
                var synth = window.speechSynthesis;
                speak_data = "object "+ objectname +" found";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
            }
            else
            {
                document.getElementById("status").innerHTML = "status : object "+ objectname +" not found";
            }
           
            
        }
    }
}

function gotResult(error, results)
{
if(error)
{
    console.log(error);
}
else
{
    console.log(results);
    objects = results;
}
}