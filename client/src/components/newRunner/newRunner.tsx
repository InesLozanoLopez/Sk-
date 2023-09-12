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
import { IFormValues } from "../../interfaces";

const ANewRunner: React.FC = () => {
  const navigate = useNavigate();
  let profileAtDb = true;

  const formik = useFormik<IFormValues>({
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
      runnerName: Yup.string().required("Name is required"),
      dateRace: Yup.date().required("Race date is required"),
      distanceRace: Yup.string().required("Race distance is required"),
      timeObj: Yup.string().required("Time objective distance is required"),
      longDistance: Yup.number().required("Longest distance is required"),
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

  function createNewProfile(values: IFormValues, race: { dateRace: string; distanceRace: number; timeObj: string; minsPerKm: number; }, currentValues: { longDistance: number; }, trainingAvailability: { daysOff: string[]; holidays: Date[]; }) {
    if (profileAtDb) {
      profileAtDb = false;
      newRunner({
        name: values.runnerName,
        race,
        currentValues,
        trainingAvailability,
      }).then(() => {
        createTraining();
      });
    }
  }

  //CREATE TRAININGS

  let ableToRun: number = Number(formik.values.longDistance);

  const holidaysFiltered: Date[] = daysAvailable({
    dateRace: formik.values.dateRace,
    daysOff: formik.values.daysOff,
    holidaysFrom: formik.values.holidaysFrom,
    holidaysTo: formik.values.holidaysTo,
  });
  const daysToTraining: number = holidaysFiltered.length;
  const kmToIncrease: number = Number(
    increaseKm({
      distanceRace: formik.values.distanceRace,
      ableToRun,
      daysToTraining,
    })
  );

  function createTraining() {
    if (holidaysFiltered.length === 0) {
      alert("No training days available");
      return;
    }
    const trainingDate: Date[] = holidaysFiltered;

    const kmsToRunPerDay: number = Number(
      kmsPerDay({
        ableToRun,
        kmToIncrease,
        distanceRace: formik.values.distanceRace,
      })
    );

    while (trainingDate.length > 0) {
      const dateToRun = trainingDate.shift();
      if (dateToRun) {
        runnerCreateTrainings({
          date: new Date(dateToRun.toISOString().split("T")[0]),
          distance: kmsToRunPerDay,
          kmToIncrease,
        }).then(() => (ableToRun = kmsToRunPerDay));
      }
      navigate("/runner");
    }
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
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        />
      </div>
    </form>
  );
};

export default ANewRunner;
