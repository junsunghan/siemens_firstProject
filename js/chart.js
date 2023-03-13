let date = new Date(); //Date 객체 생성
let movieN = new Array(); //영화 이름 담는 전역변수
let movieC = new Array(); //해당일 관객 수 담는 전역변수

//달력에 Date객체를 통해 오늘날짜 넣기
let today_date =
  date.getFullYear() +
  "-" +
  ("0" + (1 + date.getMonth())).slice(-2) +
  "-" +
  ("0" + date.getDate()).slice(-2);

$("#cal").attr("value", today_date); //달력에 오늘 날짜 입력

//달력에 날짜 지정했을 때 박스오피스 출력하는 이벤트
$("#cal").change(function () {
  call_chart();
});

//박스오피스와 차트를 불러오는 함수
let call_chart = () => {
  let sel_date = $("#cal").val(); //선택한 날짜 불러오기

  if (sel_date < "20000101") {
    alert("2000년대 이후로 입력해주세요");
  } else if (sel_date >= today_date) {
    alert("당일보다 하루 전날 까지 출력됩니다");
  } else {
    let taget_day =
      sel_date.substring(0, 4) +
      sel_date.substring(5, 7) +
      sel_date.substring(8, 10);
    box_office(taget_day); // 제어문 통과하면 박스오피스 불러오는 함수 호출
  }
};

//박스오피스 불러오는 함수
let box_office = (taget_day) => {
  $.ajax({
    url: "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
    data: {
      key: "f5eef3421c602c6cb7ea224104795888",
      targetDt: taget_day,
    },
    success: function (result) {
      console.log(result);
      let movieList = result.boxOfficeResult.dailyBoxOfficeList; //영화 이름
      let movie_list_cnt = result.boxOfficeResult.dailyBoxOfficeList; //영화 관객수
      for (let i = 0; i < movieList.length; i++) {
        //전역변수로 설정한 movieN과 movieC에 영화이름과 관객수를 저장해놓음
        movieN.push(movieList[i].movieNm);
        movieC.push(movie_list_cnt[i].audiCnt);
      }
    },
    error: function () {
      alert("error");
    },
    complete: function () {
      box_office_chart(); //콜백함수 대신 jQuery ajax를 통해 제어
    },
  });
};

//구글차트 그리기API - 박스오피스 순위
let box_office_chart = () => {
  // Load the Visualization API and the corechart package.
  google.charts.load("current", { packages: ["corechart"] });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.

  function drawChart() {
    // Create the data table.
    let data = new google.visualization.DataTable();
    data.addColumn("string", "영화제목");
    data.addColumn("number", "관객수");
    data.addRows([
      [movieN[0], parseInt(movieC[0])],
      [movieN[1], parseInt(movieC[1])],
      [movieN[2], parseInt(movieC[2])],
      [movieN[3], parseInt(movieC[3])],
      [movieN[4], parseInt(movieC[4])],
    ]);

    // Set chart options
    let options = {
      title: "박스오피스",
      width: 500,
      height: 400,
    };

    // Instantiate and draw our chart, passing in some options.
    let chart = new google.visualization.BarChart(
      document.getElementById("chart_dv")
    );
    chart.draw(data, options);

    // 차트를 다 그리면 영화명과 관객수를 담은 배열을 초기화 해준다.
    movieN = [];
    movieC = [];
  }
};


//f5eef3421c602c6cb7ea224104795888