import React, { useState } from 'react';

// Interface para representar a estrutura de um jogador
interface Player {
  id: number;
  name: string;
  position: string;
  skills: {
    attack: number;
    defense: number;
    block: number;
  };
}

// Componente para um jogador
const PlayerRow: React.FC<{ player: Player }> = ({ player }) => (
  <tr className={player.position === "Levantador" ? "table-light" : ""}    >
    <td>{player.name}</td>
    <td>{player.position}</td>
    <td>
        {/* {player.skills.defense} */}
    </td>
    <td>
        {player.skills.attack}
    </td>
    <td>
        {player.skills.block}
    </td>
  </tr>
);

// Componente para organizar a partida
const OrganizeMatch: React.FC<{ players: Player[] }> = ({ players }) => {
  // Estados para armazenar os jogadores selecionados para cada time e as médias de habilidades
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);
  const [team1Average, setTeam1Average] = useState<{ defense: number; attack: number; block: number }>({
    defense: 0,
    attack: 0,
    block: 0
  });
  const [team2Average, setTeam2Average] = useState<{ defense: number; attack: number; block: number }>({
    defense: 0,
    attack: 0,
    block: 0
  });
  const [team1Total, setTeam1Total] = useState<number>(0);
  const [team2Total, setTeam2Total] = useState<number>(0);

  // Função para organizar a partida
  const organizeMatch = () => {
    // Filtrar jogadores levantadores
    const levantadores = players.filter(player => player.position === 'Levantador');

    // Dividir os levantadores em dois grupos de forma aleatória
    const shuffledLevantadores = [...levantadores].sort(() => Math.random() - 0.5);
    const halfLengthLevantadores = Math.ceil(shuffledLevantadores.length / 2);
    const team1Levantadores = shuffledLevantadores.slice(0, halfLengthLevantadores);
    const team2Levantadores = shuffledLevantadores.slice(halfLengthLevantadores);

    // Dividir os jogadores restantes em dois times
    const otherPlayers = players.filter(player => player.position !== 'Levantador');
    const shuffledOtherPlayers = [...otherPlayers].sort(() => Math.random() - 0.5);
    const halfLengthOtherPlayers = Math.ceil(shuffledOtherPlayers.length / 2);
    const team1OtherPlayers = shuffledOtherPlayers.slice(0, halfLengthOtherPlayers);
    const team2OtherPlayers = shuffledOtherPlayers.slice(halfLengthOtherPlayers);

    // Calcular as médias de habilidades para cada time
    const team1Skills = calculateAverageSkills([...team1Levantadores, ...team1OtherPlayers]);
    const team2Skills = calculateAverageSkills([...team2Levantadores, ...team2OtherPlayers]);

    // Calcular o total das médias de habilidades para cada time
    const team1TotalSkills = team1Skills.defense + team1Skills.attack + team1Skills.block;
    const team2TotalSkills = team2Skills.defense + team2Skills.attack + team2Skills.block;

    // Definir os times e as médias de habilidades
    setTeam1([...team1Levantadores, ...team1OtherPlayers]);
    setTeam2([...team2Levantadores, ...team2OtherPlayers]);
    setTeam1Average(team1Skills);
    setTeam2Average(team2Skills);
    setTeam1Total(team1TotalSkills);
    setTeam2Total(team2TotalSkills);
  };

  // Função para calcular média das habilidades
  const calculateAverageSkills = (players: Player[]): { defense: number; attack: number; block: number } => {
    const totalPlayers = players.length;
    const totalSkills = players.reduce(
      (acc, player) => {
        return {
          defense: acc.defense + player.skills.defense,
          attack: acc.attack + player.skills.attack,
          block: acc.block + player.skills.block
        };
      },
      { defense: 0, attack: 0, block: 0 }
    );

    return {
      defense: totalSkills.defense / totalPlayers,
      attack: totalSkills.attack / totalPlayers,
      block: totalSkills.block / totalPlayers
    };
  };

  // JSX para renderizar o componente
  return (
    <div>
      <h2 className='py-2'>Organizar Partida</h2>
      <button className='btn btn-sm btn-primary' onClick={organizeMatch}>Gerar Times</button>
      <div className='mt-4'>
        <h3>Time 1</h3>
        {/* Tabela para listar jogadores do time 1 */}
        <div className="table-responsive">
        <table className='table table-dark table-hover'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Posição</th>
              <th>Defesa</th>
              <th>Ataque</th>
              <th>Bloqueio</th>
            </tr>
          </thead>
          <tbody>
            {team1.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Média</td>
              <td>{team1Average.defense.toFixed(2)}</td>
              <td>{team1Average.attack.toFixed(2)}</td>
              <td>{team1Average.block.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={2}>Total</td>
              <td colSpan={3}>{team1Total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        </div>
      </div>
      <div>
        <h3>Time 2</h3>
        {/* Tabela para listar jogadores do time 2 */}
        <div className="table-responsive">
        <table className='table table-dark table-hover'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Posição</th>
              <th>Defesa</th>
              <th>Ataque</th>
              <th>Bloqueio</th>
            </tr>
          </thead>
          <tbody>
            {team2.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Média</td>
              <td>{team2Average.defense.toFixed(2)}</td>
              <td>{team2Average.attack.toFixed(2)}</td>
              <td>{team2Average.block.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={2}>Total</td>
              <td colSpan={3}>{team2Total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizeMatch;