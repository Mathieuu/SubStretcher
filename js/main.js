var parsedSubs = new Array();
    var nameFile = "";
    var indexCurrentlyDisplayedSub = 0;

     $("#inputTime").mask("99:99:99,999");

    function readSingleFile(evt) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (f) {
          var r = new FileReader();
          r.onload = function(e) {

            if(f.size > 5000000){
              alert("This file is too big");

              $('#btnNext').hide();
              $('#btnPrevious').hide();
              $('#labelPreviewNumber').hide();
              $('#subPreviewText').hide();
              $('#labelTime').hide();
              $('#inputTime').hide();
              $('#labelNewFileEncoding').hide();
              $('#comboNewFileEncoding').hide();
              $('#btnSubmit').hide();

              return;
            }

            var contents = e.target.result;
            var splittedContent = contents.split((contents.search("\n\r\n") != -1) ? "\n\r\n" : "\n\n");
            nameFile = f.name;

            //Build the array
            _.each(splittedContent, function(str){
              createSrtData(parsedSubs,str);
            });

            indexCurrentlyDisplayedSub = parsedSubs.length-1;

            $('#labelPreviewNumber').text("Last synced subtitle: " + parsedSubs[indexCurrentlyDisplayedSub].number);
            $('#subPreviewText').text(parsedSubs[indexCurrentlyDisplayedSub].text);


            if(indexCurrentlyDisplayedSub < parsedSubs.length-1){
              $('#btnNext').show();
            } else {
              $('#btnNext').hide();
            }
            if(indexCurrentlyDisplayedSub > 0){
               $('#btnPrevious').show();
            } else {
              $('#btnPrevious').hide();
            }

            $('#labelPreviewNumber').show();
            $('#subPreviewText').show();
            $('#labelTime').show();
            $('#inputTime').show();
            $('#labelNewFileEncoding').show();
            $('#comboNewFileEncoding').show();
            $('#btnSubmit').show();
          }
          r.readAsText(f, $("#comboOldFileEncoding").val());
        } else {
          alert("Failed to load file");
        }
      }

      function processFile(evt){

        //Remove the last subtitles
        var numLastSub =  parsedSubs[indexCurrentlyDisplayedSub].number;
        var timeLastSub = parseTimeStringToInteger($("#inputTime").val());

        parsedSubs = _.filter(parsedSubs, function(sub){ return sub.number <= numLastSub; });

        //Adjust time
        var lastCurrentSubtitleTime = parsedSubs[parsedSubs.length-1].startTime;
        _.each(parsedSubs, function(sub){
          sub.startTime = getNewTime(sub.startTime, lastCurrentSubtitleTime, timeLastSub);
          sub.endTime = getNewTime(sub.endTime, lastCurrentSubtitleTime, timeLastSub);
        });

        //Build final string
        var finalText = "";

        _.each(parsedSubs, function(sub){
          finalText += sub.number + "\n";
          finalText += parseTimeIntegerToString(sub.startTime) + " --> " + parseTimeIntegerToString(sub.endTime);

          if(sub.specificStyling){
            finalText += "  " + sub.specificStyling;
          }

          finalText += "\n" + sub.text + "\n\n";
        });

        var blob = new Blob([finalText], {type: "text/plain;charset=utf-8"});
        saveAs(blob, nameFile);
      }

      function nextSub(e){
          if(indexCurrentlyDisplayedSub < parsedSubs.length-1){
              indexCurrentlyDisplayedSub++;
          }

          if(indexCurrentlyDisplayedSub < parsedSubs.length-1){
            $('#btnNext').show();
          } else {
            $('#btnNext').hide();
          }
          if(indexCurrentlyDisplayedSub > 0){
             $('#btnPrevious').show();
          } else {
            $('#btnPrevious').hide();
          }

          $('#labelPreviewNumber').text("Last synced subtitle: " + parsedSubs[indexCurrentlyDisplayedSub].number);
          $('#subPreviewText').text(parsedSubs[indexCurrentlyDisplayedSub].text);
      }

      function previousSub(e){
          if(indexCurrentlyDisplayedSub > 0){
            indexCurrentlyDisplayedSub--;
          }

          if(indexCurrentlyDisplayedSub < parsedSubs.length-1){
            $('#btnNext').show();
          } else {
            $('#btnNext').hide();
          }
          if(indexCurrentlyDisplayedSub > 0){
             $('#btnPrevious').show();
          } else {
            $('#btnPrevious').hide();
          }

          $('#labelPreviewNumber').text("Last synced subtitle: " + parsedSubs[indexCurrentlyDisplayedSub].number);
          $('#subPreviewText').text(parsedSubs[indexCurrentlyDisplayedSub].text);
      }

      function oldFileEncodingChanged(e){

        $('#fileinput').filestyle('clear');

        $('#btnNext').hide();
        $('#btnPrevious').hide();
        $('#labelPreviewNumber').hide();
        $('#subPreviewText').hide();
        $('#labelTime').hide();
        $('#inputTime').hide();
        $('#labelNewFileEncoding').hide();
        $('#comboNewFileEncoding').hide();
        $('#btnSubmit').hide();
      }

      document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
      document.getElementById('btnSubmit').addEventListener('click', processFile, false);
      document.getElementById('btnPrevious').addEventListener('click', previousSub, false);
      document.getElementById('btnNext').addEventListener('click', nextSub, false);
      document.getElementById('comboOldFileEncoding').addEventListener('change', oldFileEncodingChanged, false);
