## SubStretcher

######A cure for slipping subtitles


### What is it ?

SubStretcher is a simple tool written in Javascript allowing you to easily reync your subtitles. It often happens that subtitles are perfectly synchronized at the begin of a movie but slips little by little. This is because subtitles has been synchronized with a different framerate. SubStretcher fix that problem for any .srt file.

### How to use it ?

Note: The current script version only stretches subtitles, you still need a .srt where the first subtitles are synchronized. The next version should bring the possibility to add a static offset.

It is really simple:

- Go to [http://segfaulterror.github.io/SubStretcher/](http://segfaulterror.github.io/SubStretcher/)
- Select the encoding of your srt file. It you don't know what is it, try `window-1252` and keep reading. 
- Select the .srt file to fix
- The last subtitle of your .srt file appears, select the last relevant one. Usually last subtitles are authors names or the website where you download it. That's not what we want. Take the last subtitle really in the video.
- Also check that there is no encoding error when you browse between subtitles, if weird characters appear, you should start over and select the other encoding.
- Check your video, and write down the time where the select subtitle appears.
- Input that time in the corresponding text field
- Click on resync