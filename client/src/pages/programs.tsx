import { useEffect, useState } from "react";
import "./programs.css";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((progs) => setPrograms(progs));
  }, []);

  return (
    <>
      <section>
        {programs.length === 0 ? (
          <p>Chargement des programmes...</p>
        ) : (
          <>
            {programs.map((program) => (
              <article key={program.id}>
                <img src={program.poster} alt={program.title} />
                <h3>{program.title}</h3>
                <p>
                  {program.country} {program.year}
                </p>
                <p>{program.synopsis}</p>
              </article>
            ))}
          </>
        )}
      </section>
    </>
  );
}

export default Programs;
