import '../styles/style.css';
import '../styles/skills.css';

function Skills() {
  return (
    <div>
      <h2 className='h2-section-title'>Skills</h2>

      <p>HTML</p>
      <div class="container">
        <div class="skills html">90%</div>
      </div>

      <p>CSS</p>
      <div class="container">
        <div class="skills css">80%</div>
      </div>

      <p>JavaScript</p>
      <div class="container">
        <div class="skills js">65%</div>
      </div>

      <p>PHP</p>
      <div class="container">
        <div class="skills php">60%</div>
      </div>
    </div>
  );
}

export default Skills;
