# youtube-subs-generator
Subs generator by voice recognition in Web Speech API at YouTube

## install
Open the src folder or the unzipped release file in Dev mode in the Chrome Extensions window.

## usage
On YouTube, you will see a start / stop button for voice recognition control.<br>
Allow microphone input, select stereo mixer as input and play video.

## limitation
Voice recognition for stereo mixes.<br>
This is a limitation of the Web Speech API.<br>
The Web Speech API has no way to connect to the Web Audio API.

## other lang support
Modify "en-US" in src/content.js.<br>
example: ja-JP, en-GB, zh-CN, ko-KR
