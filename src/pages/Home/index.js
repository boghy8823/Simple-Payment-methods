/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import server from "../../apis/server";
import {
  PageWrapper,
  Container,
  Button,
  TimerContainer,
  Title,
  SessionDuration,
  ControlsWrapper,
  StyledInput,
} from "./Home.styled";
import useFieldChange from "../../hooks/useFieldChange";
import storage from "../../helpers/storage";
import { formatDuration } from "../../helpers/timerHelper";
import { saveSession } from "../../actions";

const Home = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [sessionName, setSessionName] = useFieldChange("");
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionEndTime, setSessionEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // TODO: extract the interval timer in a hook
  useEffect(() => {
    if (timerStarted) {
      const interval = setInterval(() => {
        setElapsedTime(elapsedTime + 1);
        storage.setItem(
          "session",
          JSON.stringify({ sessionName, elapsedTime })
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [elapsedTime, timerStarted, sessionName]);

  useEffect(() => {
    const storedSession = storage.getItem("session");

    if (storedSession) {
      setElapsedTime(storedSession.elapsedTime);
      setSessionName(storedSession.sessionName);
    }
  }, [setSessionName]);

  const onSave = async () => {
    setLoading(true);
    try {
      const sessionDetails = {
        start: sessionStartTime,
        end: sessionEndTime,
        duration: elapsedTime,
        name: sessionName,
      };

      await server.post("/session", sessionDetails);

      dispatch(saveSession(sessionDetails));

      setTimerStarted(false);
      setElapsedTime(0);
      setSessionName("");
      storage.removeItem("session");
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const onStart = () => {
    setTimerStarted(true);
    setSessionStartTime(new Date());
  };

  const onStop = () => {
    setSessionEndTime(new Date());
    setTimerStarted(false);
  };

  return (
    <PageWrapper>
      <Container>
        <TimerContainer>
          <Title gutterTop="30" gutterBottom="30">
            Online Casino
          </Title>
          <SessionDuration gutterTop="20" gutterBottom="30">
            {formatDuration(elapsedTime)}
          </SessionDuration>
          <StyledInput
            id="name"
            name="name"
            label="Session Name"
            onChange={(e) => setSessionName(e.target.value)}
            value={sessionName}
            placeholder="What are you working on?"
          />

          <ControlsWrapper>
            <Button onClick={onStart} disabled={loading}>
              Start
            </Button>
            <Button onClick={onStop} disabled={loading}>
              Stop
            </Button>
            <Button
              onClick={onSave}
              disabled={!sessionName || loading || elapsedTime === 0}
            >
              Save
            </Button>
          </ControlsWrapper>
        </TimerContainer>

        {error && <p>There has been an error</p>}
      </Container>
    </PageWrapper>
  );
};

Home.propTypes = {};

export default Home;
