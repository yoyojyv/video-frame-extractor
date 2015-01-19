var exec = require('child_process').exec;


function calculateFrame(frameRate, time, frameNumber) {
  var hours, minutes, seconds, hhmmss, frames;
  
  hhmmss = time.split(':');
 
  hours = hhmmss[0];
  minutes = hhmmss[1];
  seconds = hhmmss[2];

  seconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds); 
  return parseFloat((seconds * frameRate)) + frameNumber;
}

exports.extractFrame = function(filePath, frameRate, time, frameNumber) {
  var frame = calculateFrame(frameRate, time, frameNumber);
  console.log(frame);
  var command  = 'ffmpeg -r 1 -i ./fixtures/timecode.mp4 -vf "select=gte(n\\, ' + frame  +')" -vframes 1 ' + frameNumber + '.png -y';

  child = exec(command, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
