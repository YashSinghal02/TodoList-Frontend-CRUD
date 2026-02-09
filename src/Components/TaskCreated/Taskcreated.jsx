import React from "react";
// import { tasks } from './TaskAdd.js'
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import "./Taskcreated.css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Taskcreated({ cards, onDeleteTask }) {
  return (
    <div className="show-cards">
      {cards.map((x) => {
        //  Conditions
        let deadline = dayjs(x.deadline);
        let created = dayjs(x.createdAt);
        // startOf("day") because the dayjs  update the time  
        const today = dayjs().startOf("day");
        const totalDays = deadline.diff(created, "day");
        // database
        console.log(totalDays);
        // Dayjs
        const daysLeft = deadline.diff(today, "day");
        console.log(daysLeft);
        // Status
let status = "Active";
let borderColor = "#52b788";   // green
let backgroundColorr = "#52b788";
let isEditDisabled = false;

if (daysLeft <= 0) {
  status = "Overdue";
  borderColor = "#ff4f4f";
  backgroundColorr = "#ff4f4f";
  isEditDisabled = true;

} else if (daysLeft <= 1) {
  // today + tomorrow
  status = "Due Soon";
  borderColor = "#ff4f4f";
  backgroundColorr = "#ff4f4f";

} else if (daysLeft <= 4) {
  // next 3 days (2,3,4)
  status = "Urgent";
  borderColor = "#fac743";
  backgroundColorr = "#fac743";
}

let nowTime = dayjs();             // current time
let deadlineTime = dayjs(x.deadline); // task due time

let diffMinutes = deadlineTime.diff(nowTime, "minute");
console.log("diffMinutes",diffMinutes);
let hours = Math.floor(diffMinutes / 60);
let minutes = diffMinutes % 60;

// console.log(`Time left: ${hours}h ${minutes}m`);


if (diffMinutes > 0 && daysLeft <= 1) {
  // Task is due today or tomorrow, and still pending
  var timeLeft=`${hours}h ${minutes}m`;
  console.log(`Time left: ${timeLeft}`);
} else if (diffMinutes <= 0) {
  // Task is already overdue
  console.log("Overdue");
} else {
  // Task is due later than tomorrow
  console.log("More than a day left");
}



// const future = dayjs();
// const hourMinute = now.format('HH:mm');
// console.log(hourMinute);



        return (
          <div
            className="task-item"
            key={x._id}
            style={{ borderLeft: `6px solid ${borderColor}` }}
          >
            <div className="item-txt">
              <h3>{x.title}</h3>
              <p>{x.description}</p>

              <div className="date">
                <div className="start-date">
                  {" "}
                  <strong>Start:</strong>{" "}
                  {dayjs(x.createdAt).format("DD-MM-YYYY")}
                </div>

                <div className="end-date">
                  <strong>Due:</strong> {dayjs(x.deadline).format("DD-MM-YYYY")}
                </div>

                <div className="days-left"  style={{backgroundColor:`${backgroundColorr}`}}>
                  <strong> {status} {daysLeft} days left {timeLeft}</strong>
                </div>
              </div>

            </div>
            <div className="item-icon">
              {!isEditDisabled &&
                <Link to={`/edittask/${x._id}`}>
                <i className="edit-pen">
                  <FaPen />
                </i>
              </Link>
              }
              <i onClick={() => onDeleteTask && onDeleteTask(x._id)}>
                <FaTrash />
              </i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Taskcreated;
