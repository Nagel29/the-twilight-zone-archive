import './AllEpisodes.css';
import { CleanEpisode } from '../../interfaces';
import { Row } from '../Row/Row';

export const AllEpisodes = ({ episodes }:{ episodes: CleanEpisode[]}) => {
    const tableRows = episodes.map(episode => {
        return (
            <Row
                id={episode.id}
                key={episode.id}
                season={episode.season}
                episode={episode.episode}
                title={episode.title}
                airDate={episode.airDate}
                
            />
        )
    })

    return(
        <div className="container-all-episodes">
            <table className="table">
            <thead>
                <tr>
                    <th>Season #</th>
                    <th>Episode #</th>
                    <th>Title</th>
                    <th>Original Air Date</th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
            </table>
        </div>
    )
}