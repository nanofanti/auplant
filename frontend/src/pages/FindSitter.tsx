import { plantSitters } from "../data/plantSitters";
import { users } from "../data/users";

function FindSitter() {
  return (
    <>
      <h1>Find Sitter</h1>

      {plantSitters.map((sitter) => {
        const user = users.find((user) => user.id === sitter.userId);

        return (
          <div key={sitter.id}>
            <div>{user?.name}</div>
            <div>{sitter.city}</div>
            <div>
              {sitter.experience}
              {sitter.experience === 1
                ? " year of experience"
                : " years of experience"}
            </div>
            <div>{sitter.pricePerDay}€</div>
            <div>{sitter.available ? "Available" : "Not Available"}</div>
          </div>
        );
      })}
    </>
  );
}

export default FindSitter;
