import './fundo.css';

const Fundo = ({isOpen, fechar}) => {
  if (!isOpen) return null;

  return (
    <><div className="fundo" onClick={fechar}  style={{display: isOpen ? 'block' : 'none'}}></div> </>
  );
};

export default Fundo;
