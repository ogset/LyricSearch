import React, { Component, Fragment } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const API_KEY = process.env.REACT_APP_LYRICS_KEY;

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    music_gente: {}
  };
  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" +
          this.props.match.params.id +
          "&apikey=" +
          API_KEY
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        return axios
          .get(
            "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=" +
              this.props.match.params.id +
              "&apikey=" +
              API_KEY
          )
          .then(res => {
            this.setState({ track: res.data.message.body.track });
          });
      })

      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    console.log("Track", track);
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>:{track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Explicit Wrods</strong>:
              {track.explicit === 0 ? "No " : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:
              <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
            </li>
          </ul>
        </Fragment>
      );
    }
  }
}

export default Lyrics;
