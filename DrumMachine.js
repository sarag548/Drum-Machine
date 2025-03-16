import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom/client";
class DrumMachine extends React.Component{
  constructor(props){
    super(props);
  }
 
  componentDidMount(){
    const powerButton = document.getElementById("powerButton");
    const bankButton = document.getElementById("bankButton");
    const displayName = document.getElementById("displayName");
    const volumeSlider = document.getElementById("volumeSlider");
    let on = true;
    let heaterKit = true;
    let keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
    let heaterKitSounds = ["Heater 1", "Heater 2", "Heater 3", "Heater 4", "Clap", "Open HH", "Kick n' Hat", "Kick", "Closed HH"];
    let smoothPianoKitSounds = ["Chord 1", "Chord 2", "Chord 3", "Shaker", "Open HH", "Closed HH", "Punchy Kick", "Side Stick", "Snare"];
    let sounds = heaterKitSounds;
    let heaterKitSrcs = ["https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3","https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3","https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3","https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3","https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"];
    let smoothPianoKitSrcs = ["https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3","https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3","https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3","https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3","https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3","https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3","https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3","https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3","https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"]
    let drumPads = [];
    let audios = [];
    
    for(let i=0; i<keys.length; i++){
      let drumPadName = keys[i]+"key";
      drumPadName = document.getElementById(sounds[i]);
      drumPads.push(drumPadName);
      let audioName = keys[i]+"audio"
      audioName = document.getElementById(keys[i]);
      audios.push(audioName);
    }
    
    for(let i=0; i<audios.length; i++){
      drumPads[i].addEventListener("click", playAudio(drumPads[i], audios[i], heaterKitSounds[i]));
    }
    
    document.addEventListener('keydown', function(event) {
  for(let i=0; i<audios.length; i++){
    if(event.key === keys[i].toLowerCase()){
      playAudio2(drumPads[i], audios[i]);
      if(on){
        if(heaterKit){
          displayName.innerText = heaterKitSounds[i];
        }
        else{
          displayName.innerText = smoothPianoKitSounds[i];
        }
      }
    }
  }
});
    
    function playAudio2(keyName, audioName){
      if(on){
        audioName.play();
        audioName.volume = volumeSlider.value/100;
        keyName.classList.add("highlight")
        setTimeout(function() {keyName.classList.remove("highlight")}, 100);
      }
    };
  
    function playAudio(keyName, audioName, soundName){
      return function(){
        if(on){
        let index = 0;
        audioName.play();
        audioName.volume = volumeSlider.value/100;
        keyName.classList.add("highlight")
        setTimeout(function() {keyName.classList.remove("highlight")}, 100);
        displayName.innerText = soundName;
      }
    };
    }
    powerButton.addEventListener("click", togglePower);
    function togglePower(){
      if(on){
        on = false;
        powerButton.classList.remove("on");
        displayName.innerText = "";
      }
      else{
        on = true;
        powerButton.classList.add("on");
      }
    }
    
    bankButton.addEventListener("click", toggleKit);
    function toggleKit(){
      if(heaterKit){
        heaterKit = false;
        sounds = smoothPianoKitSounds; bankButton.classList.add("smoothPianoKit");
        displayName.innerText = "Smooth Piano Kit";
        for(let i=0; i<keys.length; i++){
        let drumPad = document.getElementById([heaterKitSounds[i]]);
        drumPad.id = smoothPianoKitSounds[i];
        let audio = document.getElementById(keys[i]);
        audio.src = smoothPianoKitSrcs[i];
        for(let i=0; i<audios.length; i++){
      drumPads[i].addEventListener("click", playAudio(drumPads[i], audios[i], smoothPianoKitSounds[i]));
    }
      }
    }
      else{
        heaterKit = true;  
        sounds = heaterKitSounds;
        bankButton.classList.remove("smoothPianoKit");
        displayName.innerText = "Heater Kit";
        for(let i=0; i<keys.length; i++){
      let drumPad = document.getElementById([smoothPianoKitSounds[i]]);
      drumPad.id = heaterKitSounds[i];
      let audio = document.getElementById(keys[i]);
      audio.src = heaterKitSrcs[i];
       for(let i=0; i<audios.length; i++){
      drumPads[i].addEventListener("click", playAudio(drumPads[i], audios[i], heaterKitSounds[i]));
    }
      }
      }
    }
    
    volumeSlider.addEventListener("input", displayVolume);
    
    function displayVolume(){
      displayName.innerText = "Volume: " + volumeSlider.value;
    };
  }
  render(){
    return(
      <body>
        <div id="drum-machine">
          <div id="header">
            <div id="inner-header">STG</div>
            <i className="fa fa-otter fa-lg"></i>
          </div>
          <div id="drumAndDisplayContainer">
            <div id="drums">
              <div className="drum-pad" id="Heater 1">Q
                <audio className="clip" id="Q" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"></audio>
              </div>
              <div className="drum-pad" id="Heater 2">W
                 <audio className="clip" id="W" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"></audio>
              </div>
              <div className="drum-pad" id="Heater 3">E
               <audio className="clip" id="E" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"></audio>
              </div>
              <div className="drum-pad" id="Heater 4">A
                 <audio className="clip" id="A" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"></audio>
              </div>
              <div className="drum-pad" id="Clap">S
                 <audio className="clip" id="S" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"></audio>
              </div>
              <div className="drum-pad" id="Open HH">D
                 <audio className="clip" id="D" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"></audio>
              </div>
              <div className="drum-pad" id="Kick n' Hat">Z 
                <audio className="clip" id="Z" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"></audio>
              </div>
              <div className="drum-pad" id="Kick">X
                 <audio className="clip" id="X" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"></audio>
              </div>
              <div className="drum-pad" id="Closed HH">C
                 <audio className="clip" id="C" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"></audio>
              </div>
            </div>
            <div id="controlsContainer">
              <p id="power">Power</p>
              <div id="powerContainer">
                <div id="powerButton" className="on">     
                </div>
              </div>
              <div id="display">
                <p id="displayName"></p>
              </div>
              <div id="sliderContainer">
                <input type="range" id="volumeSlider" min="0" max="100" value="10"></input>
              </div>
              <p id="bank">Bank</p>
              <div id="bankContainer">
                <div id="bankButton" className="heaterKit">     
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DrumMachine />)
