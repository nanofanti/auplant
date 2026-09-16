import { plantSitters } from "../data/plantSitters";
import { users } from "../data/users";
import SitterCard from "../components/SitterCard";

function FindSitter() {
  return (
    <>
      <h1>Find Sitter</h1>

      {plantSitters.map((sitter) => {
        const user = users.find((user) => user.id === sitter.userId);

        return (
          <SitterCard
            key={sitter.id}
            name={user?.name ?? "Unknown user"}
            sitter={sitter}
          />
        );
      })}
    </>
  );
}

export default FindSitter;
