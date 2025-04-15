const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine"
    },
    
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.3,
      release: 1
    }
  }).toDestination();
  
  function playNote(note) {
    const noteWithOctave = note + "4";
    synth.triggerAttackRelease(noteWithOctave, "4n");
  }
  
  document.querySelectorAll('.key.black').forEach(key => {
    key.addEventListener('mousedown', async (event) => {
      event.stopPropagation();
      await Tone.start();
      key.classList.add('pressed');
      const note = key.dataset.note;
      playNote(note);
    });
  
    key.addEventListener('mouseup', (event) => {
      event.stopPropagation();
      key.classList.remove('pressed');
    });
  
    key.addEventListener('mouseleave', (event) => {
      event.stopPropagation();
      key.classList.remove('pressed');
    });
  });
  
  document.querySelectorAll('.key.white').forEach(key => {
    key.addEventListener('mousedown', async () => {
      await Tone.start();
      key.classList.add('pressed');
      const note = key.dataset.note;
      playNote(note);
    });
  
    key.addEventListener('mouseup', () => {
      key.classList.remove('pressed');
    });
  
    key.addEventListener('mouseleave', () => {
      key.classList.remove('pressed');
    });
  });
  
  
  const kick = new Tone.MembraneSynth().toDestination();
  
  const share = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
  }).toDestination();
  
  const hihat = new Tone.MetalSynth({
    frequency: 400,
    envelope: { attack: 0.001, decay: 0.1, release: 0.1 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  }).toDestination();
  
  let started = false;
  
  function ensureAudio() {
    if (!started) {
      Tone.start();
      started = true;
    }
  }
  
  function playSound(key) {
    ensureAudio();
    switch (key.toUpperCase()) {
      case "A":
        kick.triggerAttackRelease("C1", "8n");
        break;
      case "S":
        share.triggerAttackRelease("8n");
        break;
      case "D":
        hihat.triggerAttackRelease("16n");
        break;
    }
  }
  
  document.addEventListener("keydown", (e) => {
    playSound(e.key);
  });
  
  document.querySelectorAll(".drum-pad").forEach(pad => {
    pad.addEventListener("click", () => {
      playSound(pad.dataset.key);
    });
  });
  