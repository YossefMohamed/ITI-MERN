import homeTelImg from '../images/hometel.png';
import telImg from '../images/tel.png';
import '../styles/style.css';

function Contact() {
  return (
    <div>
      <h2 className='h2-section-title'>Contact</h2>
      <img src= {homeTelImg}></img>
      <img src= {telImg}></img>
    </div>
  );
}

export default Contact;
