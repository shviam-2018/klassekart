import './style/pult.css'

//tar inn en prop "name " som
function Pult({ name = '' }) {
  return (
    <div className="pult">
      <p>{name || 'Navn'}</p>
    </div>
  );
}

export default Pult;