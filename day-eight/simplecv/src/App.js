import './App.css';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Experience from './components/Experience';
import Hello from './components/Hello';
import Contact from './components/Contact';
import Skill from './components/Skill';
import Box from './components/Box';
import './styles/skills.css';

function App() {
  return (
    <div className="App">
      <AboutMe />
      <Education />
      <Experience />
      <Hello />
      <Contact />
      <h2 className='h2-section-title'>Skills</h2>
      <Skill color="red" name="HTML" percentage="90" class="skills html"/>
      <Skill color="green" name="CSS" percentage="80" class="skills css"/>
      <Skill color="blue" name="JS" percentage="65" class="skills js"/>
      <Box color="black" title="Title 1" content="Hello from box 1"/>
      <Box color="brown" title="Title 2" content="Hello from box 2"/>
      <Box color="gray" title="Title 3" content="Hello from box 3"/>
    </div>
  );
}

export default App;
