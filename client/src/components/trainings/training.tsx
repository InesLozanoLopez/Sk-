import React from "react";
import "./training.css";
import {
  editATraining,
  runnerTrainings,
  deleteATraining,
} from "../../apiServices";
import { getDate } from "../runnerProfile/functions";
import { ITrainingProps } from "./../../interfaces";

const Training: React.FC<ITrainingProps> = ({
  training,
  runnerInfo,
  setAllTrainings,
}) => {
  const daysToRace =
    new Date(runnerInfo[0].race.dateRace).getTime() -
    new Date(training.date).getTime();
  const differenceDays = Math.floor(daysToRace / (1000 * 60 * 60 * 24));

  const today = new Date();

  function clickedFeedback(value: string) {
    if (value) {
      if (new Date(training.date) <= today) {
        editATraining(value, training._id)
          .then(runnerTrainings)
          .then((training) => setAllTrainings([...training]));
      }
    }
  }

  function distanceKm(km: number) {
    return km ? km.toFixed(2) : "";
  }

  function daysOfWeek(dateToConvert: number) {
    const day = new Date(dateToConvert);
    const week = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return week[day.getDay()];
  }

  function deleteTraining() {
    deleteATraining(training._id)
      .then(runnerTrainings)
      .then((training) => setAllTrainings([...training]));
  }

  function addClass(event) {
    const element = event.currentTarget;
    element.classList.add("flipped");

    const endOfAnimation = () => {
      element.classList.remove("flipped");
      element.removeEventListener("animationend", endOfAnimation);
    };
    element.addEventListener("animationend", endOfAnimation);
  }

  return (
    <div className={`training ${training.feedback}`} onClick={addClass}>
      <div className="delete">
        <p>{daysOfWeek(Number(training.date))}</p>{" "}
        {!training.feedback && (
          <span
            onClick={() => deleteTraining()}
            role="img"
            aria-label="delete training"
          >
            ❌
          </span>
        )}
      </div>

      <div>
        <h2>{getDate(Number(training.date))}</h2>
      </div>
      <div>{distanceKm(training.distance)} km</div>

      {new Date(training.date) <= today && (
        <div className="feedback">
          <span
            onClick={() => clickedFeedback("light")}
            role="img"
            aria-label="no-effort training"
          >
            😃
          </span>
          <span
            onClick={() => clickedFeedback("ok")}
            role="img"
            aria-label="medium-effort training"
          >
            😐
          </span>
          <span
            onClick={() => clickedFeedback("hard")}
            role="img"
            aria-label="hard training"
          >
            🥵
          </span>
        </div>
      )}

      <div>
        <small>Days until the race: {differenceDays}</small>
      </div>
    </div>
  );
};

export default Training;