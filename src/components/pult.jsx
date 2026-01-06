import './style/pult.css'

function Pult({ name = '' }) {
  return (
    <div className="pult">
      <p>{name || 'Navn'}</p>
    </div>
  );
}

export default Pult;