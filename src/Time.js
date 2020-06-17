import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "./config/server.json";
// import "./component/Homecss/Time.scss";

function Time() {
  const { school_name, school_locate, office_code, school_id } = JSON.parse(
    localStorage.getItem("getTime")
  );
  // 형변환 시키면서 localStorage에 있는 getItem에 저장된 데이터를 불러옴.
  const [status, setStatus] = useState("");
  const [meals, setMeals] = useState("", []);

  const TimeApi = () => {
    getApi()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.status);
          setMeals(response.data.meals);
          // response.status === 200은 api를 성공적으로 불러와서 사용함.
        }
      })
      .catch((Error) => {
        if (Error.response.status === 404) {
          // console.log(Error.response.status);
          setStatus(404);
        }
      });
  };

  const getDate = () => {
    var dateFormat = require("dateformat");
  };

  const getApi = async (year, month, date) => {
    const { data } = await axios.get(
      // api 불러온것에서 data 안에만 볼 수 있음.
      `${server}/meals?school_id=${school_id}&office_code=${office_code}&date=20200617`
    );
    console.log(data.data.meals);
    return data;
  };

  useEffect(() => {
    TimeApi();
    // render할때 실행한다.
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          getApi();
        }}
      >
        어제
      </button>

      <button
        onClick={() => {
          getDate();
        }}
      >
        오늘
      </button>

      <button
        onClick={() => {
          getApi();
        }}
      >
        내일
      </button>
      {status === 404 ? (
        <div>급식 정보가 없습니다.</div>
      ) : (
        <div className="meals">
          {meals}
          {/* {meals.split("<br/>").map((item) => {
            return (
              <>
                {item}
                <br />
              </>
            );
          })} */}
        </div>
      )}
      <p>{school_name}</p>
      <p>{school_locate}</p>
    </div>
  );
}

export default Time;
