### SubStretcher

SubStretcher is a simple tool written in Javascript allowing you to easily reync your subtitles. Sometimes subtitles are perfectly synchronized at the begin of a movie but slips little by little. This is due to a difference of framerate between the original video used to synchronized subtitles and your video. SubStretcher fixes that problem for any .srt file. There is a bunch of other software helping to resync subtitles but none of them is as simple and fast as SubStretcher. You should really consider it if you plan to resync the 25 Simpson seasons in Uzbek ;)

The current script version only stretches subtitles, you still need a .srt where the first subtitle is synchronized. The next version should bring the possibility to add a static offset.
<p align="center">
<br/>
<img src="http://www.mathieusavy.com/images/substretcher.jpg" style="border:1px solid #021a40"/>
<br/>
</p>

### How to use it ?

It is really simple:

- Go to [http://segfaulterror.github.io/SubStretcher/](http://segfaulterror.github.io/SubStretcher/)
- Select the encoding of your srt file. If you don't know what it is, try `window-1252` and keep reading.
- Select the .srt file to fix
- The last subtitle of your .srt file appears, browse to find the last real subtitle. Often last subtitles are authors names or the website where you download it. That's not what we want. Take the last subtitle translating something from the video. Also check that there is no encoding error when you browse between subtitles, if weird characters appear, you should start over and select another encoding.
- Check your video, and write down the time where the selected subtitle appears.
- Input that time in the corresponding text field
- Click on resync to download the fixed subtitle file

Enjoy !
