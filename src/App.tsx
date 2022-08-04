
import { useState } from 'react';
import './App.css';
import ImageProcess from "./Components/ImageProcess"

function App() {
  const [image, setImage] = useState<any>();

  return (
    <div className="container">
      <div className="age">
        <h1 id="title">Detector face</h1>
        <input type="file" name="fileToUpload" id="fileToUpload" accept="image/*" 
          onChange={(e) => {
            ImageProcess(e)
            let img = document.getElementById("img") as HTMLImageElement
            if (img != null) {
              if (e?.target?.files != null) {
                let file = e?.target?.files[0]
                img.src = URL.createObjectURL(file)
              }
              
            }
          }}
        ></input>
        <br />
        <img id='img' />
      </div>
      <div className="affiche">
        <table>
          <th></th>
        </table>
        <p id="opAge"></p>
        <p id="opGender"></p>
        <p id="opResult"></p>
        <p id="opBeard"></p>
        <p id="opSmile"></p>
        <p id="opBoundingBox"></p>
      </div>
    </div>
  )
}
export default App;