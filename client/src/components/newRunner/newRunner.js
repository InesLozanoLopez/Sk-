import React from "react";
import "./newRunner.css";
import { newRunner, runnerCreateTrainings } from "../../apiServices";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  timeObjInMins,
  holidays,
  increaseKm,
  kmsPerDay,
  daysAvailable,
} from "./functions";

function ANewRunner() {
  const navigate = useNavigate();
  let profileAtDb = true;

  const formik = useFormik({
    initialValues: {
      runnerName: "",
      dateRace: "",
      distanceRace: 0,
      timeObj: "00:00:00",
      longDistance: 0,
      daysOff: [],
      holidaysFrom: "",
      holidaysTo: "",
    },
    validationSchema: Yup.object({
      runnerName: Yup.string().required,
      dateRace: Yup.string().required,
      distanceRace: Yup.string().required,
      timeObj: Yup.string().required,
      longDistance: Yup.number().required,
    }),
    onSubmit: (values) => {
      const minsPerKm = timeObjInMins(values.timeObj) / values.distanceRace;
      const dateRange = {
        holidaysFrom: values.holidaysFrom,
        holidaysTo: values.holidaysTo,
      };

      const race = {
        dateRace: formik.values.dateRace,
        distanceRace: formik.values.distanceRace,
        timeObj: formik.values.timeObj,
        minsPerKm: minsPerKm,
      };
      const currentValues = {
        longDistance: formik.values.longDistance,
      };
      const trainingAvailability = {
        daysOff: formik.values.daysOff,
        holidays: holidays(dateRange),
      };
      createNewProfile(values, race, currentValues, trainingAvailability);
    },
  });

  const daysOffPerWeek = [
    { id: "1", label: "Monday" },
    { id: "2", label: "Tuesday" },
    { id: "3", label: "Wednesday" },
    { id: "4", label: "Thursday" },
    { id: "5", label: "Friday" },
    { id: "6", label: "Saturday" },
    { id: "7", label: "Sunday" },
  ];

  //CREATE A PROFILE

  function createNewProfile(values, race, currentValues, trainingAvailability) {
    if (profileAtDb) {
      profileAtDb = false;
      newRunner({
        runnerName: values.runnerName,
        race,
        currentValues,
        trainingAvailability,
      }).then(() => {
        createTraining();
      });
    }
  }

  //CREATE TRAININGSs

  let ableToRun = Number(formik.values.longDistance);

  const holidaysFiltered = daysAvailable({
    dateRace: formik.values.dateRace,
    daysOff: formik.values.daysOff,
    dateRange: {
      holidaysFrom: formik.values.holidaysFrom,
      holidaysTo: formik.values.holidaysTo,
    }
  });
  const daysToTraining = holidaysFiltered.length;
  const kmToIncrease = Number(
    increaseKm(formik.values.distanceRace, ableToRun, daysToTraining)
  );

  function createTraining() {
    const trainingsDaysFilteredHolidays = holidaysFiltered;
    if (trainingsDaysFilteredHolidays === 0) {
      alert("No training days available");
    }
    const trainingDate = trainingsDaysFilteredHolidays;

    while (trainingDate.length > 0) {
      let kmsToRunPerDay = Number(
        kmsPerDay({
          ableToRun,
          kmToIncrease,
          distanceRace: formik.values.distanceRace,
        })
      );

      runnerCreateTrainings(
        trainingDate.shift().toISOString().split("T")[0],
        kmsToRunPerDay,
        kmToIncrease,
        formik.values.runnerName
      ).then((ableToRun = kmsToRunPerDay));
    }
    navigate("/runner");
  }

  return (
    <form>
      <div className="form">
        <h2>Name</h2>
        <input
          type="text"
          aria-label="Your name"
          id="runnerName"
          name="runnerName"
          placeholder="Your name..."
          pattern="[A-Za-z]+"
          value={formik.values.runnerName}
          onChange={formik.handleChange}
        />

        <h2>Race and Objectives</h2>
        <small>When is is the race taking place?</small>
        <input
          type="date"
          id="dateRace"
          name="dateRace"
          aria-label="When your race is"
          value={formik.values.dateRace}
          onChange={formik.handleChange}
        />
        <small>How long is this race? (distance in km)</small>
        <input
          type="text"
          id="distanceRace"
          name="distanceRace"
          aria-label="how long your race is"
          value={formik.values.distanceRace}
          pattern="[0-9]"
          onChange={formik.handleChange}
        />
        <small>In how many hours you would like to complete the run</small>
        <input
          type="time"
          id="timeObj"
          name="timeObj"
          aria-label="what if you time objective"
          value={formik.values.timeObj}
          onChange={formik.handleChange}
        />

        <h2>Your current numbers</h2>
        <small>
          How long was your most recent longest run? (distance in km)
        </small>
        <input
          type="text"
          id="longDistance"
          name="longDistance"
          aria-label="Your most recent longest run"
          value={formik.values.longDistance}
          pattern="[0-9]"
          onChange={formik.handleChange}
        />

        <h2>Planning your trainings</h2>
        <small>Which days of the week you do NOT want to training?</small>
        <select
          id="daysOff"
          name="daysOff"
          multiple
          aria-label="which days of the week you do not want to training"
          value={formik.values.daysOff}
          onChange={formik.handleChange}
        >
          {daysOffPerWeek.map((day) => (
            <option id="daysOffPerWeek" key={day.id} value={day.id}>
              {day.label}
            </option>
          ))}
        </select>

        <small>Have you planned any holidays before the race?</small>
        <small>From (first day you cannot training):</small>
        <input
          type="date"
          id="holidaysFrom"
          name="holidaysFrom"
          aria-label="from when you would be on holidays"
          value={formik.values.holidaysFrom}
          onChange={formik.handleChange}
        />
        <small>To (including):</small>
        <input
          type="date"
          id="holidaysTo"
          aria-label="until when you would be on holidays"
          value={formik.values.holidaysTo}
          onChange={formik.handleChange}
        />
        <input
          className="newRunnerButton"
          type="submit"
          name="submit"
          value="Create training"
          onClick={formik.handleSubmit}
        />
      </div>
    </form>
  );
}

export default ANewRunner;
