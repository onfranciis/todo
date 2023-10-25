import "./Card.scss";

interface ICardProps {
  Data: { Title: string; Body: string };
}

const Card = ({ Data }: ICardProps) => {
  return (
    <div className="Card">
      <p className="title">{Data.Title}</p>
      <p className="body">{Data.Body} </p>
    </div>
  );
};

Card.defaultProps = {
  Data: {
    Title: "Untitled",
    Body: "Nothing was added!",
  },
};

export default Card;
