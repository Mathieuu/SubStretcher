function fromString(language, stringData) {
    var segments = stringData.split((stringData.search("\n\r\n") != -1) ? "\n\r\n" : "\n\n" );
    return reduce(segments, createSrtData, language, []);
}

function createSrtData(memo, string) {
    var lines = string.split("\n");

    if (lines.length < 3) {
        return memo;
    }

    var number = parseInt(lines[0], 10);
    var times = lines[1].split(" --> ");
    var startTime = parseTimeStringToInteger(times[0]);

    var endTimePlusStyle = times[1].split("  ");
    var endTime = parseTimeStringToInteger(endTimePlusStyle[0]);
    var specificStyling = endTimePlusStyle[1];
    var text = lines.slice(2).join("\n");

    memo.push({number: number, startTime: startTime, endTime: endTime, text: text, specificStyling:specificStyling});

    return memo;
}

function parseTimeStringToInteger(timeString) {
    var chunks = timeString.split(":");
    var secondChunks = chunks[2].split(",");
    var hours = parseInt(chunks[0], 10);
    var minutes = parseInt(chunks[1], 10);
    var seconds = parseInt(secondChunks[0], 10);
    var milliSeconds = parseInt(secondChunks[1], 10);

    return 60*60*1000 * hours +
        60*1000 * minutes +
        1000 * seconds +
        milliSeconds;
}

function parseTimeIntegerToString(timeInteger) {

    var hours = Math.floor(timeInteger/(60 * 60 * 1000));
    var minutes = Math.floor(timeInteger/(60 * 1000)) - hours*60;
    var seconds = Math.floor(timeInteger/(1000)) - hours*60*60 - minutes*60;
    var milliSeconds = Math.floor(timeInteger) - hours*60*60*1000 - minutes*60*1000 - seconds*1000;

    return pad(hours.toString(), 2) + ":" + pad(minutes.toString(), 2) + ":" + pad(seconds.toString(), 2) + "," + pad(milliSeconds.toString(), 3);
}

function getNewTime(oldSubTime, oldLastSubTime, newLastSubTime){

    var shift = newLastSubTime - oldLastSubTime;

    //var newSubTime = oldSubTime + oldSubTime*(shift/oldLastSubTime);
    var newSubTime = oldSubTime * newLastSubTime/oldLastSubTime;

    return Math.round(newSubTime);
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
