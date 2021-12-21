import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const Card = (props) => {
  console.log("card props:", props);
  return (
    <div className="card">
      <img src={props.img} alt="nft" />
      <div className="card-text">
        <h4>{"Art Title"}</h4>
        <p>{"description"}</p>
      </div>
    </div>
  );
};

function App(props) {
  // for choosing three cards to display from the returned data
  let [stack, setStack] = useState([0, 1, 2]);
  // for setting state to nft data html response
  let [nfts, setNFTs] = useState([]);

  // for test purposes
  // my poly addy **NO METADATA**
  let myAddress = "0x8f99771b39487925426e2962eb01432c5261e4cb";
  // an addy w/ metadata
  let idealCase = "0x12dab07f4adf81da9f9a8f0d546831a6d59707e4";

  useEffect(() => {
    axios
      .get(
        `https://api.nftport.xyz/v0/accounts/${props.address}?chain=polygon&page_size=50&continuation=nisi dolor exercitation&include=metadata`,
        {
          headers: {
            Authorization: "07eed184-123d-4858-bf39-304e5f5aea2c",
          },
        }
      )
      .then((res) => {
        console.log("res:", res);
        setNFTs(res.data.nfts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // will need logic to parse through only needed data?
  // test data for img
  let sample = [
    "https://pbs.twimg.com/profile_images/1343805007351619584/X5szP3MH_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1343805007351619584/X5szP3MH_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1343805007351619584/X5szP3MH_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1343805007351619584/X5szP3MH_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1343805007351619584/X5szP3MH_400x400.jpg",
    "https://pbs.twimg.com/profile_images/1343805007351619584/X5szP3MH_400x400.jpg",
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="card-holder">
          {/* left button */}
          {stack[0] > 0 ? (
            <button
              className="dir-btn"
              onClick={() => {
                setStack([stack[0] - 1, stack[1] - 1, stack[2] - 1]);
              }}
            >
              {"<"}
            </button>
          ) : null}
          <Card
            img={sample[stack[0]]}
            // metadata={nfts[stack[0]]}
            // metadata={nfts[stack[0]].metadata}
          />
          <Card
            img={sample[stack[1]]}
            // metadata={nfts[stack[1]].metadata}
          />
          <Card
            img={sample[stack[2]]}
            // metadata={nfts[stack[2]].metadata}
          />
          {/* remove VVV following if test successful */}
          {/* right button */}
          {stack[2] <= sample.length - 2 ? (
            <button
              className="dir-btn"
              onClick={() => {
                setStack([stack[0] + 1, stack[1] + 1, stack[2] + 1]);
                console.log("stack[0]:", stack[0]);
              }}
            >
              {">"}
            </button>
          ) : null}
        </div>
      </header>
      <footer>
        <span className="footer-text">
          art by <strong id="artist-name">artist</strong> powered by{" "}
          <strong id="huddln-link">
            <a href="https://www.huddln.io/?_branch_match_id=926700040419477593&utm_medium=share&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXzyhNScnJ00ssKNDLyczL1g9JrXRzS%2FPJC8hJAgB1QFXeIwAAAA%3D%3D">
              huddln
            </a>
          </strong>
        </span>
      </footer>
    </div>
  );
}

export default App;
