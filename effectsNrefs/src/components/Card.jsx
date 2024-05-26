function Card({ image, name }) {
  return (
    <div>
      <img src={image} alt={name} />
    </div>
  );
}

export default Card;
