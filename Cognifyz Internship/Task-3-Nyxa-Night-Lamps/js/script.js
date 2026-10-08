document.querySelectorAll('.stage').forEach(function(stage){
    function toggle(){
      const isOn = stage.classList.toggle('on');
      stage.setAttribute('aria-pressed', isOn ? 'true' : 'false');
      const label = stage.querySelector('.state-label');
      if(label) label.textContent = isOn ? 'on' : 'off';
    }
    stage.addEventListener('click', toggle);
    stage.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); }
    });
  });
