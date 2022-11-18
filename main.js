objects = [];
status = "";
video = "";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0 ,0, 480, 380);
    if(status != ""){
        objectdetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status-objects-detected";
            document.getElementById("no._of_objects").innerHTML = "Number of Objects Detected are:- "+objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectdetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status-detecting-objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
