import React, { useEffect, useState } from 'react'
import playersData from '../players.json';

interface Player {
    id: number;
    name: string;
    position: string;
    skills: {
        attack: number,
        defense: number,
        block: number,
    }
}

const TablePlayers = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        setPlayers(playersData);
    })

    return (
        <div className="table-reponsive">
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Posição</th>
                        <th>Ataque</th>
                        <th>Defesa</th>
                        <th>Bloqueio</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr className={player.position === "Levantador" ? 'table-primary' : ''} key={player.id}>
                            <td>{player.id}</td>
                            <td>{player.name}</td>
                            <td>{player.position}</td>
                            <td>{player.skills.attack}</td>
                            <td>{player.skills.defense}</td>
                            <td>{player.skills.block}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablePlayers