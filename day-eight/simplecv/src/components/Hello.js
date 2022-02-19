import profileImg from '../images/img_avatar.png';
import '../styles/style.css';

function Hello() {
  return (
    <div>
      <img src={profileImg}></img>
      <p>hello</p>
    </div>
  );
}

export default Hello;
