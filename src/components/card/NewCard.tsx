import "./Card.scss";

interface INewCardProps {
  setDisplay: (data: boolean) => void;
}

const NewCard = ({ setDisplay }: INewCardProps) => {
  return (
    <div
      className="NewCard"
      title="Add new note"
      onClick={() => setDisplay(true)}
    >
      <p> + </p>
    </div>
  );
};

export default NewCard;
