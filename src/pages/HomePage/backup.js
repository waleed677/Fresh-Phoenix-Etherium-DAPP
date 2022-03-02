import React, { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import { StyledButton } from "./components/styles/button.styled";
import { StyledRoundButton } from "./components/styles/styledRoundButton.styled";
import { StyledLink } from "./components/styles/link.styled";
import { ResponsiveWrapper } from "./components/styles/responsivewrapper.styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as s from "./styles/globalStyles";

const theme = {
  colors: {
    body: "#000",
    textColor: "#5fcde4",
  },
};
const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Body theme={theme}>
      <s.Container
        flex={1}
        ai={"center"}
        style={{
          padding: 24,
        }}
      >
        <Router>
          <Navbar />
        </Router>
        <s.SpacerSmall />
        <s.SpacerSmall />
        <ResponsiveWrapper
          flex={1}
          style={{
            padding: 24,
          }}
          test
        >
          {/* First Column */}
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px dashed var(--primary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--primary)",
              }}
            >
              What is The 100?
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--secondary-text)",
                fontSize: 20,
              }}
            >
              The Hundreds are beautiful punk numbers NFTs minted on Etherium
              Network which is a next-generation, high fashioned Binance Smart
              Chain (BSC) blockchain-based play to earn game to earn rewards,
              mate to mint new kittens, and sell them.
            </s.TextDescription>
            <ResponsiveWrapper>
              <s.Container flex={1} jc={"center"} ai={"center"} wid={100}>
                <StyledButton
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}
                >
                  Twitter{" "}
                </StyledButton>
              </s.Container>

              <s.Container flex={1} jc={"center"} ai={"center"} wid={100}>
                <StyledButton
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}
                  style={{
                    width: "50%",
                  }}
                >
                  JOIN DISCORD SERVER{" "}
                </StyledButton>
              </s.Container>
            </ResponsiveWrapper>
          </s.Container>{" "}
          <s.SpacerLarge />
          {/* Second Column` */}
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px dashed var(--primary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {" "}
              {data.totalSupply}/ {CONFIG.MAX_SUPPLY}{" "}
            </s.TextTitle>{" "}
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {" "}
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}{" "}
              </StyledLink>{" "}
            </s.TextDescription>{" "}
            <s.SpacerSmall />{" "}
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                  }}
                >
                  The sale has ended.{" "}
                </s.TextTitle>{" "}
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                  }}
                >
                  You can still find {CONFIG.NFT_NAME}
                  on{" "}
                </s.TextDescription>{" "}
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {" "}
                  {CONFIG.MARKETPLACE}{" "}
                </StyledLink>{" "}
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                  }}
                >
                  1 {CONFIG.SYMBOL}
                  costs {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}.{" "}
                </s.TextTitle>{" "}
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                  }}
                >
                  Excluding gas fees.{" "}
                </s.TextDescription>{" "}
                <s.SpacerSmall />{" "}
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME}
                      network{" "}
                    </s.TextDescription>{" "}
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT{" "}
                    </StyledButton>{" "}
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {" "}
                          {blockchain.errorMsg}{" "}
                        </s.TextDescription>{" "}
                      </>
                    ) : null}{" "}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {" "}
                      {feedback}{" "}
                    </s.TextDescription>{" "}
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{
                          lineHeight: 0.4,
                        }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>{" "}
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {" "}
                        {mintAmount}{" "}
                      </s.TextDescription>{" "}
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>{" "}
                    </s.Container>{" "}
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {" "}
                        {claimingNft ? "BUSY" : "BUY"}{" "}
                      </StyledButton>{" "}
                    </s.Container>{" "}
                  </>
                )}{" "}
              </>
            )}{" "}
            <s.SpacerMedium />
          </s.Container>{" "}
          <s.SpacerLarge />
        </ResponsiveWrapper>{" "}
        <s.SpacerMedium />
        <s.Container
          jc={"center"}
          ai={"center"}
          style={{
            width: "70%",
          }}
        >
          <Footer />
        </s.Container>{" "}
      </s.Container>{" "}
    </s.Body>
  );
}

export default App;
