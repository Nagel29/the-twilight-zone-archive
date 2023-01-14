import { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { fetchEpisodes } from '../../apiCalls';
import { cleanEpisodes } from '../../utilities/utilities';
import { CleanEpisode } from '../../interfaces';
import { AllEpisodes } from '../AllEpisodes/AllEpisodes';
import { WatchList } from '../WatchList/WatchList';
import { Details } from '../Details/Details';
import { sampleData } from '../../sampleData';
import { Routes, Route, NavLink, Link } from 'react-router-dom';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [episodes, setEpisodes] = useState<CleanEpisode[]>([])
  const [detailEpisode, setDetailEpisode] = useState<CleanEpisode>()
  const [clicked, setClicked] = useState<string>('All Episodes')

  useEffect(() => {
    fetchEpisodes()
      .then(data => {
        setEpisodes(cleanEpisodes(data))
        setIsLoading(false)
      })
      .catch((response) => {
        console.log(response.status)
      })
  }, [])

  const handleWatchList = (id: number | undefined) => {
    const updatedEpisodes = episodes.map(episode => {
      if (episode.id === id) {
        return {
          ...episode,
          watchList: !episode.watchList,
        }
      }
      return episode
    })

    setEpisodes([...updatedEpisodes])
  }

  const handleRowClick = (id: number) => {
    const singleEpisode = episodes.find(episode => {
      return episode.id === id;
    })
    setDetailEpisode(singleEpisode)
  }

  const handleDetailsUpdate = (id: number) => {
    setDetailEpisode(episodes.find(episode => episode.id === id))
  }

  const handleReflectionChange = (event: any, id: number | undefined) => {
    const updatedEpisodes = episodes.map(episode => {
      if (episode.id === id) {
        return {
          ...episode,
          reflection: event.target.value,
        }
      }
      return episode
    })

    setEpisodes([...updatedEpisodes])
  }

  return (
    <>
      <header>
        <h1>You’ve just crossed over into…</h1>
        <h2>The Twilight Zone Archives</h2>
        <nav className="container-button">
          <NavLink to="/"><button className={clicked === "All Episodes" ? "button-nav clicked" : "button-nav"} onClick={() => setClicked('All Episodes')}>All Episodes</button></NavLink>
          <NavLink to="/watch-list"><button className={clicked === "My Watch List" ? "button-nav clicked" : "button-nav"} onClick={() => setClicked('My Watch List')}>My Watch List</button></NavLink>
        </nav>
      </header>
      <main>
        <div className="container-left">
          <Routes>
            <Route path="/" element={
              <AllEpisodes
                episodes={episodes}
                handleWatchList={handleWatchList}
                handleRowClick={handleRowClick}
                isLoading={isLoading}
              />} />
            <Route path="watch-list" element={
              <WatchList
                episodes={episodes}
                handleWatchList={handleWatchList}
                handleRowClick={handleRowClick}
              />} />
          </Routes>
        </div>
        <Details
          detailEpisode={detailEpisode}
          episodes={episodes}
          handleDetailsUpdate={handleDetailsUpdate}
          handleReflectionChange={handleReflectionChange}
          handleWatchList={handleWatchList}
        />
      </main>
    </>
  )
}

export default App;
